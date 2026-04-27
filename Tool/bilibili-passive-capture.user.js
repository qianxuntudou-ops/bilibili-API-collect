// ==UserScript==
// @name         Bilibili API Passive Capture
// @namespace    https://example.local/
// @version      1.4.0-local-security
// @description  Passively captures Bilibili API requests/responses with local security/session diagnostics.
// @match        *://*.bilibili.com/*
// @match        *://bilibili.com/*
// @match        *://*.b23.tv/*
// @match        *://b23.tv/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  "use strict";

  const CAPTURE_EVENT = "__BILI_API_CAPTURE__";
  const CLEAR_PAGE_CACHE_EVENT = "__BILI_API_CAPTURE_CLEAR_PAGE_CACHE__";
  const STORAGE_KEY = "__BILI_API_CAPTURE_STORE__";
  const DEDUPE_STORE_KEY = "__BILI_API_CAPTURE_DEDUPE__";
  const PANEL_ID = "__bili_api_capture_panel__";
  const MAX_RECORDS = 5000;
  const pageWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;
  let userscriptStoreCache = null;

  function readStore(forceRefresh) {
    if (!forceRefresh && userscriptStoreCache) return userscriptStoreCache;
    try {
      const records = GM_getValue(STORAGE_KEY, null);
      if (Array.isArray(records)) {
        userscriptStoreCache = records;
        return userscriptStoreCache;
      }
    } catch (_e) {
      // Fall back to origin localStorage below.
    }
    try {
      userscriptStoreCache = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (userscriptStoreCache.length > 0) {
        try { GM_setValue(STORAGE_KEY, userscriptStoreCache); } catch (_e) {}
      }
    } catch (_e) {
      userscriptStoreCache = [];
    }
    return userscriptStoreCache;
  }

  function writeGlobalStore(records) {
    userscriptStoreCache = records;
    try { GM_setValue(STORAGE_KEY, records); } catch (_e) {}
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); } catch (_e) {}
  }

  function appendGlobalRecord(detail) {
    const key = detail && (detail._dedupe_key || (detail.label + "|" + detail.url));
    if (!key) return;
    const records = readStore(true).slice();
    const seen = new Set();
    for (let i = records.length - 1; i >= 0; i--) {
      const oldKey = records[i]._dedupe_key || (records[i].label + "|" + records[i].url);
      if (oldKey === key) return;
      seen.add(oldKey);
    }
    records.push(detail);
    while (records.length > MAX_RECORDS) records.shift();
    writeGlobalStore(records);
    syncToPage(records);
  }

  function syncToPage(records) {
    try {
      pageWindow.dispatchEvent(new CustomEvent("__BILI_API_CAPTURE_SYNC_RES__", { detail: records }));
    } catch (_e) {}
  }

  function clearGlobalStore() {
    userscriptStoreCache = [];
    try { GM_deleteValue(STORAGE_KEY); } catch (_e) {}
    try { GM_deleteValue(DEDUPE_STORE_KEY); } catch (_e) {}
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(DEDUPE_STORE_KEY);
    } catch (_e) {}
    try { pageWindow.dispatchEvent(new CustomEvent(CLEAR_PAGE_CACHE_EVENT)); } catch (_e) {}
  }

  function dedupeRecords(records) {
    const seen = new Map();
    for (let i = records.length - 1; i >= 0; i--) {
      const key = records[i]._dedupe_key || (records[i].label + "|" + records[i].url);
      if (!seen.has(key)) seen.set(key, records[i]);
    }
    return [...seen.values()].sort((a, b) => a.time.localeCompare(b.time));
  }

  function aggregateEndpoints(records) {
    const map = new Map();
    records.forEach((record) => {
      if (!record || record.category === "inline") return;
      const method = record.request && record.request.method ? record.request.method : "GET";
      const key = method + " " + record.label;
      let item = map.get(key);
      if (!item) {
        item = {
          key,
          method,
          pathname: record.label,
          category: record.category,
          count: 0,
          queryKeys: new Set(),
          bodyKeys: new Set(),
          responseKeys: new Set(),
          dataKeys: new Set(),
          statuses: new Set(),
          latestTime: record.time,
          latestUrl: record.url,
          requestSamples: [],
          responseSummarySamples: [],
          responseSchema: record.schema || null
        };
        map.set(key, item);
      }
      item.count++;
      item.latestTime = record.time;
      item.latestUrl = record.url;
      Object.keys((record.request && record.request.query) || {}).forEach((k) => item.queryKeys.add(k));
      Object.keys((record.request && record.request.body && record.request.body.parsed) || {}).forEach((k) => item.bodyKeys.add(k));
      if (record.response && record.response.status !== undefined) item.statuses.add(record.response.status);
      if (item.requestSamples.length < 3) item.requestSamples.push(record.request);
      if (item.responseSummarySamples.length < 3) item.responseSummarySamples.push(record.summary);
      if (!item.responseSchema && record.schema) item.responseSchema = record.schema;
      var payload = record.payload;
      if (payload && typeof payload === "object" && !Array.isArray(payload)) {
        Object.keys(payload).forEach(function(k) { item.responseKeys.add(k); });
        if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
          Object.keys(payload.data).forEach(function(k) { item.dataKeys.add(k); });
        }
      }
    });
    return [...map.values()].map((item) => ({
      key: item.key,
      method: item.method,
      pathname: item.pathname,
      category: item.category,
      count: item.count,
      queryKeys: [...item.queryKeys],
      bodyKeys: [...item.bodyKeys],
      responseKeys: [...item.responseKeys],
      dataKeys: [...item.dataKeys],
      statuses: [...item.statuses],
      latestTime: item.latestTime,
      latestUrl: item.latestUrl,
      requestSamples: item.requestSamples,
      responseSummarySamples: item.responseSummarySamples,
      responseSchema: item.responseSchema
    })).sort((a, b) => a.pathname.localeCompare(b.pathname) || a.method.localeCompare(b.method));
  }

  function downloadJson(data, filenamePrefix) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filenamePrefix}-${Date.now()}.json`;
    document.documentElement.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function createUserscriptApi() {
    return {
      list() { return readStore(); },
      latest() { const r = readStore(); return r[r.length - 1] || null; },
      clear() {
        clearGlobalStore();
        console.log("[BILI_API_CAPTURE] cleared");
      },
      download(deduplicate) {
        let records = readStore();
        if (deduplicate) records = dedupeRecords(records);
        downloadJson(records, "bili-api-capture");
      },
      endpoints(deduplicate) {
        const records = deduplicate === false ? readStore() : dedupeRecords(readStore());
        return aggregateEndpoints(records);
      },
      downloadEndpoints() {
        downloadJson(this.endpoints(true), "bili-api-endpoints");
      },
      summary() {
        return readStore().map((item) => ({
          time: item.time, label: item.label, category: item.category,
          method: item.request && item.request.method,
          status: item.response && item.response.status,
          page: item.page, url: item.url, request: item.request, response: item.response, summary: item.summary,
        }));
      },
      count() { return readStore().length; },
      categories() {
        const map = {};
        readStore().forEach((r) => { const c = r.category || "unknown"; map[c] = (map[c] || 0) + 1; });
        return map;
      },
      rescan() {
        pageWindow.dispatchEvent(new CustomEvent("__BILI_API_CAPTURE_RESCAN__"));
      },
    };
  }

  function ensureUserscriptPanel() {
    if (document.getElementById(PANEL_ID)) return;
    if (!document.body) {
      setTimeout(ensureUserscriptPanel, 100);
      return;
    }

    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    Object.assign(panel.style, {
      position: "fixed", right: "16px", bottom: "16px", zIndex: "2147483647",
      display: "flex", flexDirection: "column", gap: "6px",
      padding: "10px", borderRadius: "12px",
      background: "rgba(24,24,28,0.92)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      backdropFilter: "blur(8px)", fontFamily: "system-ui,sans-serif",
      color: "#fff", minWidth: "200px", maxWidth: "320px",
      fontSize: "12px", lineHeight: "1.4"
    });

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";

    const title = document.createElement("div");
    title.textContent = "BiliAPI Capture";
    title.style.fontWeight = "700";
    title.style.fontSize = "13px";

    const toggle = document.createElement("span");
    toggle.textContent = "\u25B2";
    toggle.style.cursor = "pointer";
    toggle.style.fontSize = "10px";
    toggle.style.color = "rgba(255,255,255,0.6)";
    header.appendChild(title);
    header.appendChild(toggle);

    const body = document.createElement("div");
    body.id = PANEL_ID + "_body";
    const countEl = document.createElement("div");
    countEl.id = PANEL_ID + "_count";
    countEl.style.color = "rgba(255,255,255,0.8)";
    const catsEl = document.createElement("div");
    catsEl.id = PANEL_ID + "_cats";
    catsEl.style.fontSize = "10px";
    catsEl.style.color = "rgba(255,255,255,0.55)";
    catsEl.style.maxHeight = "60px";
    catsEl.style.overflow = "hidden";
    catsEl.style.wordBreak = "break-all";
    const statusEl = document.createElement("div");
    statusEl.id = PANEL_ID + "_status";
    statusEl.style.fontSize = "11px";
    statusEl.style.color = "rgba(255,255,255,0.72)";

    const actions = document.createElement("div");
    actions.style.display = "grid";
    actions.style.gridTemplateColumns = "1fr 1fr";
    actions.style.gap = "6px";
    function makeButton(text, onClick, accent) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = text;
      Object.assign(btn.style, {
        border: "0", borderRadius: "8px", padding: "6px 8px",
        cursor: "pointer", fontSize: "11px", fontWeight: "600",
        color: "#fff", background: accent || "#00a1d6"
      });
      btn.addEventListener("click", onClick);
      return btn;
    }
    actions.appendChild(makeButton("\u5BFC\u51FA JSON", () => { window.BiliApiCapture.download(); }, "#00a1d6"));
    actions.appendChild(makeButton("\u5BFC\u51FA(\u53BB\u91CD)", () => { window.BiliApiCapture.download(true); }, "#6c5ce7"));
    actions.appendChild(makeButton("\u67E5\u770B\u6458\u8981", () => { console.table(window.BiliApiCapture.summary()); }, "#4f7cff"));
    actions.appendChild(makeButton("\u5BFC\u51FA\u63A5\u53E3", () => { window.BiliApiCapture.downloadEndpoints(); }, "#7952b3"));
    actions.appendChild(makeButton("\u91CD\u65B0\u626B\u63CF", () => {
      if (window.BiliApiCapture && window.BiliApiCapture.rescan) window.BiliApiCapture.rescan();
      updateUserscriptPanel();
    }, "#22b573"));
    const clearBtn = makeButton("\u6E05\u7A7A\u7F13\u5B58", () => {
      window.BiliApiCapture.clear();
      updateUserscriptPanel();
    }, "#ff6b6b");
    clearBtn.style.gridColumn = "1 / span 2";
    actions.appendChild(clearBtn);

    body.appendChild(countEl);
    body.appendChild(catsEl);
    body.appendChild(statusEl);
    body.appendChild(actions);
    panel.appendChild(header);
    panel.appendChild(body);

    let collapsed = false;
    toggle.addEventListener("click", () => {
      collapsed = !collapsed;
      body.style.display = collapsed ? "none" : "";
      toggle.textContent = collapsed ? "\u25BC" : "\u25B2";
    });

    document.body.appendChild(panel);
    updateUserscriptPanel();
  }

  function updateUserscriptPanel() {
    const countNode = document.getElementById(PANEL_ID + "_count");
    const catsNode = document.getElementById(PANEL_ID + "_cats");
    const statusNode = document.getElementById(PANEL_ID + "_status");
    if (!countNode || !catsNode || !statusNode) return;
    const records = readStore();
    const catMap = {};
    const labelSet = new Set();
    records.forEach((r) => {
      const c = r.category || "unknown";
      catMap[c] = (catMap[c] || 0) + 1;
      labelSet.add(r.label);
    });
    countNode.textContent = "\u5DF2\u6355\u83B7 " + records.length + " \u6761 / " + labelSet.size + " \u4E2A\u63A5\u53E3";
    catsNode.textContent = Object.entries(catMap).sort((a, b) => b[1] - a[1]).map(([c, n]) => c + ":" + n).join("  ");
    const latest = records[records.length - 1];
    statusNode.textContent = latest
      ? "\u6700\u65B0: " + (latest.category || "") + "/" + (latest.label || "").split("/").pop() + " | " + new Date(latest.time).toLocaleTimeString()
      : "\u9762\u677F\u5DF2\u542F\u52A8\u3002\u5982\u679C\u8BA1\u6570\u4E0D\u589E\u52A0\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u7684 [BILI_API_CAPTURE] \u65E5\u5FD7";
  }

  function bootUserscriptSide() {
    try {
      if (typeof GM_addValueChangeListener === "function") {
        GM_addValueChangeListener(STORAGE_KEY, (_name, _oldValue, newValue, remote) => {
          if (!Array.isArray(newValue)) {
            userscriptStoreCache = null;
            try { pageWindow.dispatchEvent(new CustomEvent(CLEAR_PAGE_CACHE_EVENT)); } catch (_e) {}
          } else {
            userscriptStoreCache = newValue;
          }
          if (remote) updateUserscriptPanel();
        });
      }
    } catch (_e) {}

    pageWindow.addEventListener("__BILI_API_CAPTURE_SYNC_REQ__", () => {
      syncToPage(readStore());
    });

    pageWindow.addEventListener(CAPTURE_EVENT, (event) => {
      const detail = event.detail;
      if (!detail || typeof detail !== "object") return;
      appendGlobalRecord(detail);
      console.log("[BILI_API_CAPTURE]", detail.category + "/" + detail.label, detail.summary);
      updateUserscriptPanel();
    });

    const api = createUserscriptApi();
    window.BiliApiCapture = api;
    window.__biliApiCapture = api;
    pageWindow.BiliApiCapture = api;
    pageWindow.__biliApiCapture = api;
    globalThis.BiliApiCapture = api;
    globalThis.__biliApiCapture = api;
    window.__BILI_API_CAPTURE_READY__ = true;
    pageWindow.__BILI_API_CAPTURE_READY__ = true;
    console.log("[BILI_API_CAPTURE] userscript side ready");
    ensureUserscriptPanel();
    setInterval(() => {
      userscriptStoreCache = null;
      ensureUserscriptPanel();
      updateUserscriptPanel();
    }, 1000);
  }

  function injectPageHook() {
    const source = String.raw`
(function () {
  const CAPTURE_EVENT = ${JSON.stringify(CAPTURE_EVENT)};
  const CLEAR_PAGE_CACHE_EVENT = ${JSON.stringify(CLEAR_PAGE_CACHE_EVENT)};
  const STORAGE_KEY = ${JSON.stringify(STORAGE_KEY)};
  const DEDUPE_STORE_KEY = ${JSON.stringify(DEDUPE_STORE_KEY)};
  const MAX_RECORDS = 5000;
  const MAX_DEDUPE_KEYS = 1000;
  const PANEL_ID = "__bili_api_capture_panel__";
  const MAX_BODY_PREVIEW_CHARS = 50000;
  const MAX_PAYLOAD_CHARS = 50000;
  const MAX_HEADER_VALUE_CHARS = 5000;
  const CAPTURE_RAW_SENSITIVE = true;
  const CAPTURE_SECURITY_TRAFFIC = true;

  // ===== MATCHING CONFIG =====
  const API_PREFIXES = [
    "/x/","/pgc/","/room/","/live_user/","/xlive/","/audio/","/paywallet/",
    "/pugv/","/pvideo","/twirp/","/link_draw/","/link_setting/","/session_svr/",
    "/svr_sync/","/web_im/","/medialist/","/bapis/","/studio/","/x2/","/msg/",
    "/gift/","/user_plus/","/banned_service/","/main/","/correspond/","/home/userInfo",
    "/site/getCoin","/member/api/getInfo","/login/exit"
  ];

  const SKIP_EXTENSIONS = new Set([
    ".js",".css",".png",".jpg",".jpeg",".gif",".svg",".ico",".woff",".woff2",
    ".ttf",".eot",".mp4",".mp3",".flv",".m4s",".webp",".webm",".ogg",".wav",
    ".otf",".map",".jsonld",".xml",".pdf",".zip",".wasm"
  ]);

  const SKIP_PATH_PREFIXES = [
    "/x/report/","/x/resource/laser2",
    "/x/web-frontend/getappversion","/x/web-interface/zone","/x/report/click/now"
  ];

  const CATEGORY_RULES = [
    {p:"/x/web-interface/view",c:"video"},
    {p:"/x/web-interface/wbi/view",c:"video"},
    {p:"/x/web-interface/archive/",c:"video"},
    {p:"/x/web-interface/ranking",c:"ranking"},
    {p:"/x/web-interface/popular",c:"ranking"},
    {p:"/x/web-interface/dynamic/",c:"ranking"},
    {p:"/x/web-interface/newlist",c:"ranking"},
    {p:"/x/web-interface/elec/",c:"charge"},
    {p:"/x/web-interface/search/",c:"search"},
    {p:"/x/web-interface/coin/",c:"video"},
    {p:"/x/web-interface/history/",c:"history"},
    {p:"/x/web-interface/relation",c:"user"},
    {p:"/x/web-interface/nav",c:"login"},
    {p:"/x/web-interface/online",c:"misc"},
    {p:"/x/web-interface/appeal/",c:"video"},
    {p:"/x/web-interface/view/conclusion/",c:"video"},
    {p:"/x/web-interface/broadcast/",c:"misc"},
    {p:"/x/web-interface/stat",c:"video"},
    {p:"/x/web/elec/",c:"charge"},
    {p:"/x/web/data/",c:"creative"},
    {p:"/x/web/index/",c:"creative"},
    {p:"/x/player/",c:"player"},
    {p:"/x/space/",c:"user"},
    {p:"/x/relation/",c:"user"},
    {p:"/x/ugcpay",c:"charge"},
    {p:"/x/upower/",c:"charge"},
    {p:"/x/v2/reply",c:"comment"},
    {p:"/x/v2/dm/",c:"danmaku"},
    {p:"/x/v1/dm/",c:"danmaku"},
    {p:"/x/dm/",c:"danmaku"},
    {p:"/x/polymer/web-dynamic/",c:"dynamic"},
    {p:"/x/polymer/web-space/",c:"video"},
    {p:"/x/polymer/space/",c:"video"},
    {p:"/x/dynamic/",c:"dynamic"},
    {p:"/x/msgfeed/",c:"message"},
    {p:"/x/v3/fav/",c:"fav"},
    {p:"/x/v2/fav/",c:"fav"},
    {p:"/x/emote/",c:"emoji"},
    {p:"/x/garb/",c:"garb"},
    {p:"/x/vip",c:"vip"},
    {p:"/x/vip_point/",c:"vip"},
    {p:"/x/note/",c:"note"},
    {p:"/x/credit/",c:"blackroom"},
    {p:"/x/v2/history/",c:"history"},
    {p:"/x/answer/",c:"exam"},
    {p:"/x/activity/",c:"activity"},
    {p:"/x/web-show/",c:"widget"},
    {p:"/x/web-frontend/",c:"misc"},
    {p:"/x/passport-login/",c:"login"},
    {p:"/x/member/",c:"member"},
    {p:"/x/stein/",c:"video"},
    {p:"/x/tag/",c:"video"},
    {p:"/x/vu/",c:"creative"},
    {p:"/x/article/",c:"article"},
    {p:"/x/resource/",c:"misc"},
    {p:"/x/frontend/",c:"misc"},
    {p:"/x/gaia-vgate/",c:"misc"},
    {p:"/correspond/",c:"login"},
    {p:"/x/share/",c:"misc"},
    {p:"/x/click-interface/",c:"report"},
    {p:"/x/custom/",c:"service"},
    {p:"/x/broadcast/",c:"misc"},
    {p:"/x/v1/contract",c:"user"},
    {p:"/x/v2/account/",c:"user"},
    {p:"/x/v2/view/",c:"video"},
    {p:"/x/v2/feed/",c:"video"},
    {p:"/x/copyright-music-publicity/",c:"audio"},
    {p:"/x/series/",c:"video"},
    {p:"/pgc/",c:"bangumi"},
    {p:"/room/",c:"live"},
    {p:"/live_user/",c:"live"},
    {p:"/xlive/",c:"live"},
    {p:"/msg/",c:"live"},
    {p:"/gift/",c:"live"},
    {p:"/audio/",c:"audio"},
    {p:"/paywallet/",c:"wallet"},
    {p:"/pugv/",c:"cheese"},
    {p:"/pvideo",c:"video"},
    {p:"/twirp/",c:"manga"},
    {p:"/link_draw/",c:"album"},
    {p:"/link_setting/",c:"message"},
    {p:"/session_svr/",c:"message"},
    {p:"/svr_sync/",c:"message"},
    {p:"/web_im/",c:"message"},
    {p:"/medialist/",c:"fav"},
    {p:"/bapis/",c:"misc"},
    {p:"/studio/",c:"creative"},
    {p:"/x2/",c:"creative"},
    {p:"/user_plus/",c:"album"},
    {p:"/banned_service/",c:"live"},
    {p:"/main/",c:"search"},
    {p:"/home/",c:"login"},
    {p:"/site/",c:"login"},
    {p:"/member/",c:"login"},
    {p:"/login/",c:"login"}
  ];

  // ===== STATE =====
  let lastRecordKey = "";
  let lastRouteKey = location.href;
  let storeCache = null;
  let dedupeCache = null;

  // ===== UTILITIES =====
  function normalizeUrl(url) {
    if (!url) return "";
    if (url.startsWith("//")) return location.protocol + url;
    try { return new URL(url, location.href).toString(); }
    catch (_e) { return ""; }
  }

  function matchApi(url) {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) return null;
    let pathname = "";
    try { pathname = new URL(normalizedUrl).pathname; }
    catch (_e) { return null; }

    const lower = pathname.toLowerCase();
    const dotIdx = lower.lastIndexOf(".");
    if (dotIdx !== -1) {
      const ext = lower.substring(dotIdx);
      if (SKIP_EXTENSIONS.has(ext)) return null;
    }

    for (const sp of SKIP_PATH_PREFIXES) {
      if (pathname.startsWith(sp)) return null;
    }

    let matched = false;
    for (const prefix of API_PREFIXES) {
      if (pathname.startsWith(prefix)) { matched = true; break; }
    }
    if (!matched) return null;

    const category = getCategory(pathname);
    return { pathname, normalizedUrl, category };
  }

  function getCategory(pathname) {
    for (const rule of CATEGORY_RULES) {
      if (pathname.startsWith(rule.p)) return rule.c;
    }
    const segs = pathname.split("/").filter(Boolean);
    return segs.length >= 2 ? segs[1] : "misc";
  }

  function safeJsonParse(text) {
    try { return JSON.parse(text); }
    catch (_e) { return null; }
  }

  function hashText(text) {
    const str = String(text || "");
    let hash = 5381;
    for (let i = 0; i < str.length; i++) hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    return (hash >>> 0).toString(36);
  }

  function isSensitiveKey(key) {
    if (CAPTURE_RAW_SENSITIVE) return false;
    return /cookie|authorization|token|csrf|sess|bili_jct|buvid|sid/i.test(String(key || ""));
  }

  function isVolatileParam(key) {
    return /^(wts|w_rid|_|ts|csrf|csrf_token|bili_jct|buvid|buvid3|buvid4|sid|spm_id_from)$/i.test(String(key || ""));
  }

  function safeValue(value, key) {
    if (isSensitiveKey(key)) return "[redacted]";
    if (value === null || value === undefined) return value;
    if (Array.isArray(value)) return value.slice(0, 20).map((item) => safeValue(item, key));
    if (typeof value === "object") {
      const out = {};
      Object.keys(value).slice(0, 80).forEach((k) => { out[k] = safeValue(value[k], k); });
      return out;
    }
    if (typeof value === "string") return value.length > 500 ? value.substring(0, 500) + "..." : value;
    return value;
  }

  function parseQuery(url) {
    const out = {};
    try {
      const params = new URL(url).searchParams;
      params.forEach((value, key) => {
        out[key] = isSensitiveKey(key) ? "[redacted]" : value;
      });
    } catch (_e) {}
    return out;
  }

  function parseBodyText(text) {
    const str = String(text || "");
    if (!str) return null;
    const json = safeJsonParse(str);
    if (json !== null) return safeValue(json);
    try {
      const params = new URLSearchParams(str);
      const out = {};
      let count = 0;
      params.forEach((value, key) => { count++; out[key] = isSensitiveKey(key) ? "[redacted]" : value; });
      if (count > 0 && str.includes("=")) return out;
    } catch (_e) {}
    return null;
  }

  function inferSchema(value, depth) {
    if (depth === undefined) depth = 0;
    if (value === null) return "null";
    if (Array.isArray(value)) {
      const sample = value.length ? inferSchema(value[0], depth + 1) : "unknown";
      return { type: "array", length: value.length, item: sample };
    }
    const type = typeof value;
    if (type !== "object") return type;
    if (depth >= 4) return { type: "object", keys: Object.keys(value).slice(0, 30) };
    const props = {};
    Object.keys(value).slice(0, 60).forEach((key) => { props[key] = inferSchema(value[key], depth + 1); });
    return { type: "object", props };
  }

  function redactKeyValueText(text) {
    let str = String(text || "");
    if (CAPTURE_RAW_SENSITIVE) return str;
    try {
      const params = new URLSearchParams(str);
      let changed = false;
      for (const key of [...params.keys()]) {
        if (isSensitiveKey(key)) { params.set(key, "[redacted]"); changed = true; }
      }
      if (changed) return params.toString();
    } catch (_e) {}
    return str.replace(/((?:csrf|csrf_token|bili_jct|access_key|token|sessdata|sid)=)[^&\\s]+/ig, "$1[redacted]");
  }

  function normalizeHeaders(headers) {
    const out = {};
    if (!headers) return out;
    function add(k, v) {
      const key = String(k || "").toLowerCase();
      if (!key) return;
      let value = isSensitiveKey(key) ? "[redacted]" : String(v);
      if (value.length > MAX_HEADER_VALUE_CHARS) value = value.substring(0, MAX_HEADER_VALUE_CHARS) + "...";
      out[key] = value;
    }
    try {
      if (headers instanceof Headers) headers.forEach((v, k) => add(k, v));
      else if (Array.isArray(headers)) headers.forEach((pair) => pair && add(pair[0], pair[1]));
      else if (typeof headers === "object") Object.keys(headers).forEach((k) => add(k, headers[k]));
    } catch (_e) {}
    return out;
  }

  function summarizeBody(body) {
    if (body === undefined || body === null) return null;
    let text = null;
    let type = Object.prototype.toString.call(body).slice(8, -1);
    try {
      if (typeof body === "string") text = body;
      else if (body instanceof URLSearchParams) { text = body.toString(); type = "URLSearchParams"; }
      else if (body instanceof FormData) {
        const fields = {};
        body.forEach((value, key) => {
          fields[key] = value instanceof File ? "[file:" + value.name + "," + value.size + "]" : String(value);
        });
        text = JSON.stringify(fields);
        type = "FormData";
      } else if (body instanceof Blob) {
        return { type, size: body.size, hash: "blob:" + body.size };
      } else if (body instanceof ArrayBuffer) {
        return { type, size: body.byteLength, hash: "arraybuffer:" + body.byteLength };
      } else if (typeof body === "object") {
        text = JSON.stringify(body);
      }
    } catch (_e) {}
    if (text === null) return { type, unsupported: true };
    const redacted = redactKeyValueText(text);
    return {
      type,
      length: redacted.length,
      hash: hashText(redacted),
      parsed: parseBodyText(redacted),
      preview: redacted.length > MAX_BODY_PREVIEW_CHARS ? redacted.substring(0, MAX_BODY_PREVIEW_CHARS) + "..." : redacted
    };
  }

  async function readRequestBodyPreview(request) {
    try {
      if (!request || !request.clone || /^(GET|HEAD)$/i.test(request.method || "")) return null;
      const text = await request.clone().text();
      return summarizeBody(text);
    } catch (_e) {
      return { type: "Request", unavailable: true };
    }
  }

  async function buildFetchRequestMeta(args) {
    const input = args[0];
    const init = args[1] || {};
    const isRequest = typeof Request !== "undefined" && input instanceof Request;
    const requestUrl = typeof input === "string" ? input : (input && input.url) || "";
    const method = String((init && init.method) || (isRequest && input.method) || "GET").toUpperCase();
    const headers = Object.assign(
      {},
      isRequest ? normalizeHeaders(input.headers) : {},
      normalizeHeaders(init && init.headers)
    );
    const body = init && Object.prototype.hasOwnProperty.call(init, "body")
      ? summarizeBody(init.body)
      : await readRequestBodyPreview(isRequest ? input : null);
    return { method, query: parseQuery(normalizeUrl(requestUrl)), headers, body };
  }

  function parseRawHeaders(raw) {
    const out = {};
    const CR = String.fromCharCode(13);
    const LF = String.fromCharCode(10);
    String(raw || "").trim().replace(new RegExp(CR, "g"), "").split(LF).forEach((line) => {
      const idx = line.indexOf(":");
      if (idx <= 0) return;
      out[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
    return normalizeHeaders(out);
  }

  function buildFetchResponseMeta(response) {
    return {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: normalizeHeaders(response.headers),
      contentType: response.headers && response.headers.get ? response.headers.get("content-type") : ""
    };
  }

  function buildRawTextPayload(text, contentType) {
    const raw = String(text || "");
    return {
      _raw_text_preview: raw.length > MAX_BODY_PREVIEW_CHARS ? raw.substring(0, MAX_BODY_PREVIEW_CHARS) + "..." : raw,
      _text_length: raw.length,
      _text_hash: hashText(raw),
      _content_type: contentType || ""
    };
  }

  function pick(obj, keys) {
    if (!obj || typeof obj !== "object") return null;
    const out = {};
    for (const k of keys) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
    }
    return out;
  }

  function truncate(obj, maxChars) {
    const str = JSON.stringify(obj);
    if (!str || str.length <= maxChars) return obj;
    return { _truncated: true, _length: str.length, _preview: str.substring(0, maxChars) };
  }

  // ===== STORE =====
  function readStore() {
    if (storeCache) return storeCache;
    try { storeCache = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch (_e) { storeCache = []; }
    return storeCache;
  }

  function writeStore(detail) {
    const records = readStore().slice();
    records.push(detail);
    while (records.length > MAX_RECORDS) records.shift();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      storeCache = records;
    } catch (_e) {
      records.splice(0, Math.ceil(records.length / 2));
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); storeCache = records; }
      catch (_e2) {
        records.splice(0, records.length - 20);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); storeCache = records; } catch (_e3) {}
      }
    }
  }

  function clearStore() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DEDUPE_STORE_KEY);
    storeCache = [];
    dedupeCache = [];
  }

  // ===== DEDUP =====
  function readDedupeKeys() {
    if (dedupeCache) return dedupeCache;
    try {
      dedupeCache = JSON.parse(localStorage.getItem(DEDUPE_STORE_KEY) || "[]");
    } catch (_e) {
      dedupeCache = [];
    }
    return dedupeCache;
  }

  function writeDedupeKey(key) {
    const keys = readDedupeKeys().slice();
    keys.push(key);
    while (keys.length > MAX_DEDUPE_KEYS) keys.shift();
    dedupeCache = keys;
    try {
      localStorage.setItem(DEDUPE_STORE_KEY, JSON.stringify(keys));
    } catch (_e) {}
  }

  function buildDedupeKey(pathname, url, request) {
    try {
      const u = new URL(url);
      const params = new URLSearchParams(u.search);
      [...params.keys()].forEach((key) => { if (isVolatileParam(key)) params.delete(key); });
      const keys = [...params.keys()].sort();
      const paramStr = keys.map((k) => k + "=" + params.get(k)).join("&");
      const method = request && request.method ? request.method : "GET";
      const bodyHash = request && request.body && request.body.hash ? "|body:" + request.body.hash : "";
      return method + "|" + pathname + "|" + paramStr + bodyHash;
    } catch (_e) {
      return pathname;
    }
  }

  function isDuplicate(key) {
    if (key === lastRecordKey) return true;
    const stored = readDedupeKeys();
    for (let i = stored.length - 1; i >= Math.max(0, stored.length - 200); i--) {
      if (stored[i] === key) return true;
    }
    return false;
  }

  function isSecurityPath(pathname) {
    return CAPTURE_SECURITY_TRAFFIC && (
      pathname.startsWith("/x/click-interface/web/heartbeat") ||
      pathname.startsWith("/x/click-interface/click/now") ||
      pathname.startsWith("/x/click-interface/click/web/h5") ||
      pathname.startsWith("/x/frontend/finger/") ||
      pathname.startsWith("/x/web-frontend/getbuvid") ||
      pathname.startsWith("/x/gaia-vgate/") ||
      pathname.startsWith("/x/passport-login/web/cookie/") ||
      pathname.startsWith("/x/internal/gaia-gateway/") ||
      pathname.startsWith("/correspond/")
    );
  }

  function dedupeRecords(records) {
    const seen = new Map();
    for (let i = records.length - 1; i >= 0; i--) {
      const key = records[i]._dedupe_key || (records[i].label + "|" + records[i].url);
      if (!seen.has(key)) seen.set(key, records[i]);
    }
    return [...seen.values()].sort((a, b) => a.time.localeCompare(b.time));
  }

  // ===== SUMMARIZE =====
  function summarizeGeneric(payload, url) {
    if (!payload || typeof payload !== "object") return { raw_type: typeof payload };
    if (payload._raw_text_preview !== undefined) {
      return {
        raw_type: "text",
        contentType: payload._content_type,
        length: payload._text_length,
        preview: payload._raw_text_preview
      };
    }
    const result = { code: payload.code, message: payload.message };
    const data = payload.data;
    if (data === null || data === undefined) { result.data = null; return result; }
    if (Array.isArray(data)) {
      result.data_type = "array";
      result.data_length = data.length;
      if (data.length > 0) result.data_sample = data.slice(0, 2);
      return result;
    }
    if (typeof data === "object") {
      result.data_type = "object";
      result.data_keys = Object.keys(data).slice(0, 30);
      return result;
    }
    result.data = data;
    return result;
  }

  function summarizeVideoInfo(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    return {
      aid: data.aid, bvid: data.bvid, cid: data.cid,
      mid: data.owner && data.owner.mid, title: data.title,
      is_upower_exclusive: data.is_upower_exclusive,
      is_upower_preview: data.is_upower_preview,
      is_upower_play: data.is_upower_play,
      rights: pick(data.rights, ["elec", "ugc_pay", "ugc_pay_preview", "download"])
    };
  }

  function summarizePlayerV2(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    const elec = data.elec_high_level || null;
    return {
      aid: data.aid, cid: data.cid,
      is_upower_exclusive: data.is_upower_exclusive,
      is_upower_play: data.is_upower_play,
      is_ugc_pay_preview: data.is_ugc_pay_preview,
      preview_toast: data.preview_toast,
      is_upower_preview: data.is_upower_preview,
      privilege_type: elec && elec.privilege_type,
      sub_title: elec && elec.sub_title
    };
  }

  function summarizePlayurl(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    const durl = Array.isArray(data.durl) ? data.durl : [];
    const dash = data.dash || null;
    return {
      quality: data.quality, format: data.format, timelength: data.timelength,
      durl_count: durl.length, accept_quality: data.accept_quality,
      dash_video_count: dash && Array.isArray(dash.video) ? dash.video.length : 0,
      dash_audio_count: dash && Array.isArray(dash.audio) ? dash.audio.length : 0
    };
  }

  function summarizeNav(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    return {
      isLogin: data.isLogin, mid: data.mid, uname: data.uname,
      vipStatus: data.vipStatus, vipType: data.vipType,
      level: data.level_info && data.level_info.current_level,
      coins: data.money, wallet: pick(data.wallet, ["mid", "bcoin_balance"])
    };
  }

  function summarizeElecShow(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    const hl = data.show_info && data.show_info.high_level ? data.show_info.high_level : null;
    return {
      count: data.count, total_count: data.total_count, av_count: data.av_count,
      cnt_priv_type: data.cnt_priv_type,
      show: data.show_info && data.show_info.show,
      state: data.show_info && data.show_info.state,
      privilege_type: hl && hl.privilege_type, title: hl && hl.title,
      sub_title: hl && hl.sub_title, open: hl && hl.open
    };
  }

  function summarizeSpaceTopArc(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    return {
      aid: data.aid, bvid: data.bvid, title: data.title,
      mid: data.owner && data.owner.mid,
      is_charging_arc: data.is_charging_arc, elec_arc_type: data.elec_arc_type,
      elec_arc_badge: data.elec_arc_badge,
      charging_pay: pick(data.charging_pay, ["level"])
    };
  }

  function summarizeSpaceArcSearch(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    const list = data.list && data.list.vlist ? data.list.vlist : [];
    return {
      count: list.length,
      items: list.slice(0, 10).map((item) => ({
        aid: item.aid, bvid: item.bvid, title: item.title,
        is_charging_arc: item.is_charging_arc, elec_arc_type: item.elec_arc_type
      }))
    };
  }

  function summarizeAccInfo(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    return {
      mid: data.mid, name: data.name, sign: data.sign,
      level: data.level, sex: data.sex, face: data.face,
      fans: data.fans, attention: data.attention,
      official: pick(data.official, ["title", "type"]),
      vip: pick(data.vip, ["type", "status"])
    };
  }

  function summarizeReply(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    const replies = data.replies || [];
    return {
      page: pick(data.page, ["count", "num", "size"]),
      hots_length: (data.hots || []).length,
      replies_length: replies.length,
      top: data.upper && data.upper.top ? pick(data.upper.top, ["rpid", "content"]) : null,
      replies_sample: replies.slice(0, 3).map((r) => ({
        rpid: r.rpid, mid: r.mid, message: (r.content && r.content.message || "").substring(0, 80),
        like: r.like, rcount: r.rcount
      }))
    };
  }

  function summarizeDynamicFeed(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    const items = data.items || [];
    return {
      has_more: data.has_more, offset: data.offset,
      items_length: items.length,
      items_sample: items.slice(0, 3).map((item) => ({
        id_str: item.id_str,
        type: item.type,
        basic: pick(item.basic, ["comment_id_str", "rid_str"]),
        modules: item.modules && item.modules.module_author
          ? pick(item.modules.module_author, ["mid", "name", "pub_ts"])
          : null
      }))
    };
  }

  function summarizeRoomInfo(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    return {
      room_id: data.room_id, uid: data.uid, title: data.title,
      live_status: data.live_status, area_name: data.area_name,
      online: data.online, short_id: data.short_id,
      tags: data.tags, cover: data.user_cover
    };
  }

  function summarizeFavList(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    const medias = data.medias || [];
    return {
      info: pick(data.info, ["id", "title", "media_count"]),
      has_more: data.has_more, medias_length: medias.length,
      medias_sample: medias.slice(0, 3).map((m) => ({
        id: m.id, title: m.title, bvid: m.bvid, upper: m.upper && m.upper.name
      }))
    };
  }

  function summarizeSeason(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    return {
      season_id: data.season_id, title: data.title,
      total: data.total, ep_count: (data.episodes || []).length,
      rating: data.rating && data.rating.score,
      publish: pick(data.publish, ["pub_time", "pub_time_show"]),
      episodes_sample: (data.episodes || []).slice(0, 5).map((ep) => ({
        id: ep.id, title: ep.title, long_title: ep.long_title, bvid: ep.bvid
      }))
    };
  }

  function summarizeLivePlayInfo(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    return {
      room_id: data.room_id, uid: data.uid,
      live_status: data.live_status,
      playurl_info: data.playurl_info ? { g_qn_desc: (data.playurl_info.g_qn_desc || []).length } : null
    };
  }

  function summarizeCard(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    const card = data.card || {};
    return {
      mid: card.mid, name: card.name, sign: card.sign,
      level: card.level, fans: card.fans, attention: card.attention,
      archive_count: card.archive_count, article_count: card.article_count,
      face: card.face, official: pick(card.official, ["title", "type"])
    };
  }

  function summarizeMessageUnread(payload) {
    const data = payload && payload.data ? payload.data : null;
    if (!data) return summarizeGeneric(payload);
    return {
      at: data.at, chat: data.chat, like: data.like,
      reply: data.reply, sys_msg: data.sys_msg, up: data.up
    };
  }

  const CHARGE_SUMMARIZERS = {
    ugcpay_rank_month_up(payload) {
      const data = payload && payload.data ? payload.data : null;
      if (!data) return summarizeGeneric(payload);
      return {
        count: data.count, total_count: data.total_count || data.total,
        top_users: Array.isArray(data.list)
          ? data.list.slice(0, 5).map((item) => ({ rank: item.rank, pay_mid: item.pay_mid, uname: item.uname }))
          : []
      };
    },
    upower_item_detail(payload) {
      const data = payload && payload.data ? payload.data : null;
      if (!data) return summarizeGeneric(payload);
      return {
        privilege_type: data.privilege_type, upower_level: data.upower_level,
        elec_reply_state: data.elec_reply_state, only_contain_medal: data.only_contain_medal,
        up_nickname: data.user_card && data.user_card.nickname,
        upower_rank_total: data.upower_rank && data.upower_rank.total
      };
    },
    upower_charge_follow_info(payload) {
      const data = payload && payload.data ? payload.data : null;
      if (!data) return summarizeGeneric(payload);
      return {
        days: data.days, remain_days: data.remain_days,
        privilege_type: data.privilege_type, only_contain_medal: data.only_contain_medal,
        up_nickname: data.up_card && data.up_card.nickname
      };
    },
    upower_member_rank(payload) {
      const data = payload && payload.data ? payload.data : null;
      if (!data) return summarizeGeneric(payload);
      return {
        privilege_type: data.privilege_type, member_total: data.member_total,
        is_charge: data.is_charge, up_nickname: data.up_info && data.up_info.nickname, tabs: data.tabs
      };
    },
    guard_get_charge_record(payload) {
      const data = payload && payload.data ? payload.data : null;
      if (!data) return summarizeGeneric(payload);
      return {
        page: data.page, total_num: data.total_num, total_page: data.total_page,
        list_count: Array.isArray(data.list) ? data.list.length : 0
      };
    },
    elec_remark_list(payload) {
      const data = payload && payload.data ? payload.data : null;
      if (!data) return summarizeGeneric(payload);
      return {
        total: data.pager && data.pager.total, current: data.pager && data.pager.current,
        size: data.pager && data.pager.size, list_count: Array.isArray(data.list) ? data.list.length : 0
      };
    },
    elec_remark_detail(payload) {
      const data = payload && payload.data ? payload.data : null;
      if (!data) return summarizeGeneric(payload);
      return { id: data.id, aid: data.aid, bvid: data.bvid, mid: data.mid, reply_mid: data.reply_mid, state: data.state };
    },
  };

  const SUMMARIZER_MAP = {};
  function reg(paths, fn) { paths.forEach((p) => { SUMMARIZER_MAP[p] = fn; }); }

  reg(["/x/web-interface/wbi/view", "/x/web-interface/view", "/x/web-interface/view/detail", "/x/web-interface/wbi/view/detail"], summarizeVideoInfo);
  reg(["/x/player/wbi/v2", "/x/player/v2"], summarizePlayerV2);
  reg(["/x/player/wbi/playurl", "/x/player/playurl", "/x/player/wbi/playurl/v2"], summarizePlayurl);
  reg(["/x/web-interface/nav", "/x/web-interface/nav/stat"], summarizeNav);
  reg(["/x/web-interface/elec/show"], summarizeElecShow);
  reg(["/x/space/top/arc"], summarizeSpaceTopArc);
  reg(["/x/space/arc/search", "/x/space/wbi/arc/search"], summarizeSpaceArcSearch);
  reg(["/x/space/wbi/acc/info", "/x/space/acc/info"], summarizeAccInfo);
  reg(["/x/web-interface/card"], summarizeCard);
  reg(["/x/v2/reply", "/x/v2/reply/wbi/main", "/x/v2/reply/reply", "/x/v2/reply/hot"], summarizeReply);
  reg(["/x/polymer/web-dynamic/v1/feed/all", "/x/polymer/web-dynamic/v1/feed/space", "/x/polymer/web-dynamic/v1/feed/detail"], summarizeDynamicFeed);
  reg(["/room/v1/Room/get_info", "/room/v1/Room/room_init", "/xlive/web-room/v1/index/getRoomBaseInfo"], summarizeRoomInfo);
  reg(["/xlive/web-room/v2/index/getRoomPlayInfo"], summarizeLivePlayInfo);
  reg(["/x/v3/fav/resource/list"], summarizeFavList);
  reg(["/pgc/view/web/season"], summarizeSeason);
  reg(["/x/msgfeed/unread"], summarizeMessageUnread);

  reg(["/x/ugcpay-rank/elec/month/up"], (p) => CHARGE_SUMMARIZERS.ugcpay_rank_month_up(p));
  reg(["/x/upower/item/detail"], (p) => CHARGE_SUMMARIZERS.upower_item_detail(p));
  reg(["/x/upower/charge/follow/info"], (p) => CHARGE_SUMMARIZERS.upower_charge_follow_info(p));
  reg(["/x/upower/up/member/rank/v2"], (p) => CHARGE_SUMMARIZERS.upower_member_rank(p));
  reg(["/xlive/revenue/v1/guard/getChargeRecord"], (p) => CHARGE_SUMMARIZERS.guard_get_charge_record(p));
  reg(["/x/web/elec/remark/list"], (p) => CHARGE_SUMMARIZERS.elec_remark_list(p));
  reg(["/x/web/elec/remark/detail"], (p) => CHARGE_SUMMARIZERS.elec_remark_detail(p));
  reg(["/x/web/elec/remark/reply", "/x/ugcpay/trade/elec/message"], (p) => {
    return { code: p.code, message: p.message, data: p.data };
  });

  function summarize(pathname, payload, url) {
    const fn = SUMMARIZER_MAP[pathname];
    if (fn) return fn(payload);
    return summarizeGeneric(payload, url);
  }

  // ===== INLINE STATE SUMMARIZE =====
  function summarizeInitialState(initialState) {
    const videoData = initialState && (initialState.videoData || initialState.videoInfo || initialState.videoDetail);
    const owner = videoData && (videoData.owner || videoData.upData || {});
    const elecFullInfo = initialState && initialState.elecFullInfo && initialState.elecFullInfo.show_info;
    const highLevel = elecFullInfo && elecFullInfo.high_level;
    return {
      bvid: videoData && videoData.bvid, aid: videoData && videoData.aid,
      cid: videoData && (videoData.cid || (videoData.pages && videoData.pages[0] && videoData.pages[0].cid)),
      mid: owner && owner.mid, title: videoData && videoData.title,
      is_upower_exclusive: videoData && videoData.is_upower_exclusive,
      is_upower_preview: videoData && videoData.is_upower_preview,
      is_upower_play: videoData && videoData.is_upower_play,
      elec_state: elecFullInfo && elecFullInfo.state,
      privilege_type: highLevel && highLevel.privilege_type
    };
  }

  function summarizeInitialPlayinfo(playinfo) {
    const data = playinfo && playinfo.data ? playinfo.data : playinfo;
    if (!data) return null;
    const durl = Array.isArray(data.durl) ? data.durl : [];
    const dash = data.dash || null;
    return {
      quality: data.quality, format: data.format, timelength: data.timelength,
      durl_count: durl.length,
      dash_video_count: dash && Array.isArray(dash.video) ? dash.video.length : 0,
      dash_audio_count: dash && Array.isArray(dash.audio) ? dash.audio.length : 0
    };
  }

  // ===== EMIT =====
  function emit(detail) {
    window.dispatchEvent(new CustomEvent(CAPTURE_EVENT, { detail }));
  }

  window.addEventListener("__BILI_API_CAPTURE_RESCAN__", () => {
    captureInlineState("manual-event");
    updatePanel();
  });

  window.addEventListener(CLEAR_PAGE_CACHE_EVENT, () => {
    clearStore();
  });

  window.addEventListener("__BILI_API_CAPTURE_SYNC_RES__", (event) => {
    const records = event.detail;
    if (Array.isArray(records)) {
      storeCache = records;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); } catch (_e) {}
      updatePanel();
    }
  });

  function captureCurrentDocumentIfSecurity() {
    try {
      const matched = matchApi(location.href);
      if (!matched || !isSecurityPath(matched.pathname)) return;
      const html = document.documentElement ? document.documentElement.outerHTML : "";
      const payload = buildRawTextPayload(html, document.contentType || "text/html");
      const refreshNode = document.getElementById("1-name");
      if (refreshNode) payload.refresh_csrf = (refreshNode.textContent || "").trim();
      record(
        matched.normalizedUrl,
        payload,
        matched.pathname,
        matched.category,
        { method: "DOCUMENT", query: parseQuery(location.href), headers: {}, body: null },
        { status: 200, statusText: "document", ok: true, headers: {}, contentType: document.contentType || "text/html" }
      );
    } catch (_e) {}
  }

  // ===== RECORD =====
  function recordVirtual(label, payload, summary, sourceTag) {
    const detail = {
      time: new Date().toISOString(),
      page: location.href,
      url: "inline://" + sourceTag,
      label,
      category: "inline",
      summary,
      schema: inferSchema(payload),
      payload: truncate(payload, MAX_PAYLOAD_CHARS),
      _dedupe_key: label + "|" + (summary && (summary.bvid || summary.aid || summary.cid) || "")
    };

    if (isDuplicate(detail._dedupe_key)) return;
    lastRecordKey = detail._dedupe_key;
    writeDedupeKey(detail._dedupe_key);
    writeStore(detail);
    updatePanel();
    emit(detail);
  }

  function record(url, payload, pathname, category, request, response) {
    request = request || { method: "GET", headers: {}, body: null };
    if (!request.query) request.query = parseQuery(url);
    const bypassDedupe = isSecurityPath(pathname);
    const dk = buildDedupeKey(pathname, url, request) +
      (bypassDedupe ? "|t:" + Date.now() + ":" + Math.random().toString(36).slice(2, 8) : "");
    if (!bypassDedupe && isDuplicate(dk)) return;
    lastRecordKey = dk;

    const detail = {
      time: new Date().toISOString(),
      page: location.href,
      url,
      label: pathname,
      category,
      request,
      response: response || null,
      summary: summarize(pathname, payload, url),
      schema: inferSchema(payload),
      payload: truncate(payload, MAX_PAYLOAD_CHARS),
      _dedupe_key: dk
    };

    writeDedupeKey(dk);
    writeStore(detail);
    updatePanel();
    emit(detail);
  }

  // ===== INLINE STATE =====
  function readScriptAssignment(name) {
    const scripts = document.scripts || [];
    const patterns = [
      new RegExp("window\\\\." + name + "\\\\s*=\\\\s*([\\\\s\\\\S]*?)(?:;<\\\\/script>|;<|$)"),
      new RegExp(name + "\\\\s*=\\\\s*([\\\\s\\\\S]*?)(?:;<\\\\/script>|;<|$)")
    ];
    for (const script of scripts) {
      const text = script.textContent || "";
      if (!text || !text.includes(name)) continue;
      for (const pattern of patterns) {
        const match = text.match(pattern);
        if (!match || !match[1]) continue;
        try { return JSON.parse(match[1]); } catch (_e) {}
      }
    }
    return null;
  }

  function captureInlineState(reason) {
    let initialState = null;
    let playinfo = null;
    try { initialState = window.__INITIAL_STATE__ || null; } catch (_e) {}
    try { playinfo = window.__playinfo__ || window.__PLAYINFO__ || null; } catch (_e) {}
    if (!initialState) initialState = readScriptAssignment("__INITIAL_STATE__");
    if (!playinfo) playinfo = readScriptAssignment("__playinfo__") || readScriptAssignment("__PLAYINFO__");
    if (initialState) recordVirtual("initial_state", initialState, summarizeInitialState(initialState), "initial_state:" + reason);
    if (playinfo) recordVirtual("initial_playinfo", playinfo, summarizeInitialPlayinfo(playinfo), "initial_playinfo:" + reason);

    try {
      const biliConfig = window.__BILI_CONFIG__ || null;
      if (biliConfig) recordVirtual("bili_config", biliConfig, { keys: Object.keys(biliConfig).slice(0, 20) }, "bili_config:" + reason);
    } catch (_e) {}
  }

  function scheduleInlineScans(reason) {
    [0, 300, 1200, 3000].forEach((delay) => {
      setTimeout(() => { captureInlineState(reason + ":" + delay); }, delay);
    });
  }

  // ===== ROUTE =====
  function watchRouteChanges() {
    function onRouteMaybeChanged(source) {
      if (location.href === lastRouteKey) return;
      lastRouteKey = location.href;
      scheduleInlineScans(source);
      setTimeout(() => ensurePanel(), 0);
    }
    const rawPushState = history.pushState;
    const rawReplaceState = history.replaceState;
    history.pushState = function (...args) { const r = rawPushState.apply(this, args); onRouteMaybeChanged("pushState"); return r; };
    history.replaceState = function (...args) { const r = rawReplaceState.apply(this, args); onRouteMaybeChanged("replaceState"); return r; };
    window.addEventListener("popstate", () => { onRouteMaybeChanged("popstate"); });
  }

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) storeCache = null;
    if (event.key === DEDUPE_STORE_KEY) dedupeCache = null;
  });

  // ===== PANEL =====
  function ensurePanel() {
    // The visible panel is rendered by the userscript side because it reads
    // Tampermonkey GM storage shared across Bilibili subdomains.
    return;
    if (document.getElementById(PANEL_ID)) { updatePanel(); return; }
    if (!document.body) {
      const obs = new MutationObserver(() => {
        if (document.body) { obs.disconnect(); ensurePanel(); }
      });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      return;
    }

    const panel = document.createElement("div");
    panel.id = PANEL_ID;
    Object.assign(panel.style, {
      position: "fixed", right: "16px", bottom: "16px", zIndex: "2147483647",
      display: "flex", flexDirection: "column", gap: "6px",
      padding: "10px", borderRadius: "12px",
      background: "rgba(24,24,28,0.92)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
      backdropFilter: "blur(8px)", fontFamily: "system-ui,sans-serif",
      color: "#fff", minWidth: "200px", maxWidth: "320px",
      fontSize: "12px", lineHeight: "1.4",
      transition: "all 0.2s ease"
    });

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";

    const title = document.createElement("div");
    title.textContent = "BiliAPI Capture";
    title.style.fontWeight = "700";
    title.style.fontSize = "13px";

    const toggle = document.createElement("span");
    toggle.textContent = "\u25B2";
    toggle.style.cursor = "pointer";
    toggle.style.fontSize = "10px";
    toggle.style.color = "rgba(255,255,255,0.6)";

    header.appendChild(title);
    header.appendChild(toggle);

    const body = document.createElement("div");
    body.id = PANEL_ID + "_body";

    const countEl = document.createElement("div");
    countEl.id = PANEL_ID + "_count";
    countEl.style.color = "rgba(255,255,255,0.8)";

    const catsEl = document.createElement("div");
    catsEl.id = PANEL_ID + "_cats";
    catsEl.style.fontSize = "10px";
    catsEl.style.color = "rgba(255,255,255,0.55)";
    catsEl.style.maxHeight = "60px";
    catsEl.style.overflow = "hidden";
    catsEl.style.wordBreak = "break-all";

    const statusEl = document.createElement("div");
    statusEl.id = PANEL_ID + "_status";
    statusEl.style.fontSize = "11px";
    statusEl.style.color = "rgba(255,255,255,0.72)";

    const actions = document.createElement("div");
    actions.style.display = "grid";
    actions.style.gridTemplateColumns = "1fr 1fr";
    actions.style.gap = "6px";

    function makeButton(text, onClick, accent) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = text;
      Object.assign(btn.style, {
        border: "0", borderRadius: "8px", padding: "6px 8px",
        cursor: "pointer", fontSize: "11px", fontWeight: "600",
        color: "#fff", background: accent || "#00a1d6"
      });
      btn.addEventListener("click", onClick);
      return btn;
    }

    actions.appendChild(makeButton("\u5BFC\u51FA JSON", () => { window.BiliApiCapture.download(); }, "#00a1d6"));
    actions.appendChild(makeButton("\u5BFC\u51FA(\u53BB\u91CD)", () => { window.BiliApiCapture.download(true); }, "#6c5ce7"));
    actions.appendChild(makeButton("\u67E5\u770B\u6458\u8981", () => { console.table(window.BiliApiCapture.summary()); }, "#4f7cff"));
    actions.appendChild(makeButton("\u5BFC\u51FA\u63A5\u53E3", () => { window.BiliApiCapture.downloadEndpoints(); }, "#7952b3"));
    actions.appendChild(makeButton("\u91CD\u65B0\u626B\u63CF", () => { captureInlineState("manual"); updatePanel(); }, "#22b573"));
    const clearBtn = makeButton("\u6E05\u7A7A\u7F13\u5B58", () => {
      clearStore();
      updatePanel();
    }, "#ff6b6b");
    clearBtn.style.gridColumn = "1 / span 2";
    actions.appendChild(clearBtn);

    body.appendChild(countEl);
    body.appendChild(catsEl);
    body.appendChild(statusEl);
    body.appendChild(actions);

    panel.appendChild(header);
    panel.appendChild(body);

    let collapsed = false;
    toggle.addEventListener("click", () => {
      collapsed = !collapsed;
      body.style.display = collapsed ? "none" : "";
      toggle.textContent = collapsed ? "\u25BC" : "\u25B2";
    });

    document.body.appendChild(panel);
    updatePanel();
  }

  function updatePanel() {
    // No-op in the page context. The userscript side refreshes the shared panel.
    return;
    const countNode = document.getElementById(PANEL_ID + "_count");
    const catsNode = document.getElementById(PANEL_ID + "_cats");
    const statusNode = document.getElementById(PANEL_ID + "_status");
    if (!countNode || !catsNode || !statusNode) return;

    const records = readStore();
    const count = records.length;
    const catMap = {};
    const labelSet = new Set();
    records.forEach((r) => {
      const c = r.category || "unknown";
      catMap[c] = (catMap[c] || 0) + 1;
      labelSet.add(r.label);
    });

    countNode.textContent = "\u5DF2\u6355\u83B7 " + count + " \u6761 / " + labelSet.size + " \u4E2A\u63A5\u53E3";

    const catEntries = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    catsNode.textContent = catEntries.map(([c, n]) => c + ":" + n).join("  ");

    const latest = records[count - 1];
    if (latest) {
      statusNode.textContent = "\u6700\u65B0: " + (latest.category || "") + "/" + (latest.label || "").split("/").pop() + " | " + new Date(latest.time).toLocaleTimeString();
    } else {
      statusNode.textContent = "\u88AB\u52A8\u76D1\u542C\u4E2D\uFF0C\u6D4F\u89C8 B \u7AD9\u9875\u9762\u5373\u53EF\u81EA\u52A8\u6355\u83B7 API";
    }
  }

  function collectKeys(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return [];
    return Object.keys(obj).sort();
  }

  function endpointKey(record) {
    const method = record.request && record.request.method ? record.request.method : "GET";
    return method + " " + record.label;
  }

  function aggregateEndpoints(records) {
    const map = new Map();
    records.forEach((record) => {
      if (!record || record.category === "inline") return;
      const key = endpointKey(record);
      let item = map.get(key);
      if (!item) {
        item = {
          key,
          method: record.request && record.request.method ? record.request.method : "GET",
          pathname: record.label,
          category: record.category,
          count: 0,
          pages: new Set(),
          urls: [],
          queryKeys: new Set(),
          bodyKeys: new Set(),
          responseKeys: new Set(),
          dataKeys: new Set(),
          statuses: new Set(),
          contentTypes: new Set(),
          latestTime: record.time,
          latestUrl: record.url,
          requestSamples: [],
          responseSummarySamples: [],
          responseSchema: record.schema || inferSchema(record.payload)
        };
        map.set(key, item);
      }
      item.count++;
      item.latestTime = record.time >= item.latestTime ? record.time : item.latestTime;
      item.latestUrl = record.time >= item.latestTime ? record.url : item.latestUrl;
      item.pages.add(record.page);
      if (item.urls.length < 5 && !item.urls.includes(record.url)) item.urls.push(record.url);
      collectKeys(record.request && record.request.query).forEach((k) => item.queryKeys.add(k));
      collectKeys(record.request && record.request.body && record.request.body.parsed).forEach((k) => item.bodyKeys.add(k));
      if (record.response && record.response.status !== undefined) item.statuses.add(record.response.status);
      if (record.response && record.response.contentType) item.contentTypes.add(record.response.contentType);
      if (item.requestSamples.length < 3) item.requestSamples.push(record.request);
      if (item.responseSummarySamples.length < 3) item.responseSummarySamples.push(record.summary);
      if (!item.responseSchema && record.schema) item.responseSchema = record.schema;
      var payload = record.payload;
      if (payload && typeof payload === "object" && !Array.isArray(payload)) {
        collectKeys(payload).forEach(function(k) { item.responseKeys.add(k); });
        if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
          collectKeys(payload.data).forEach(function(k) { item.dataKeys.add(k); });
        }
      }
    });
    return [...map.values()].map((item) => ({
      key: item.key,
      method: item.method,
      pathname: item.pathname,
      category: item.category,
      count: item.count,
      pageCount: item.pages.size,
      sampleUrls: item.urls,
      queryKeys: [...item.queryKeys],
      bodyKeys: [...item.bodyKeys],
      responseKeys: [...item.responseKeys],
      dataKeys: [...item.dataKeys],
      statuses: [...item.statuses],
      contentTypes: [...item.contentTypes],
      latestTime: item.latestTime,
      latestUrl: item.latestUrl,
      requestSamples: item.requestSamples,
      responseSummarySamples: item.responseSummarySamples,
      responseSchema: item.responseSchema
    })).sort((a, b) => a.pathname.localeCompare(b.pathname) || a.method.localeCompare(b.method));
  }

  function downloadJson(data, filenamePrefix) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filenamePrefix + "-" + Date.now() + ".json";
    document.documentElement.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // ===== PAGE API =====
  const pageApi = {
    list: readStore,
    latest() { const r = readStore(); return r[r.length - 1] || null; },
    clear() { clearStore(); updatePanel(); },
    download(deduplicate) {
      let records = readStore();
      if (deduplicate) records = dedupeRecords(records);
      downloadJson(records, "bili-api-capture");
    },
    endpoints(deduplicate) {
      const records = deduplicate === false ? readStore() : dedupeRecords(readStore());
      return aggregateEndpoints(records);
    },
    downloadEndpoints() {
      downloadJson(this.endpoints(true), "bili-api-endpoints");
    },
    summary() {
      return readStore().map((item) => ({
        time: item.time, label: item.label, category: item.category,
        method: item.request && item.request.method,
        status: item.response && item.response.status,
        page: item.page, url: item.url, request: item.request, response: item.response, summary: item.summary
      }));
    },
    count() { return readStore().length; },
    categories() {
      const map = {};
      readStore().forEach((r) => { const c = r.category || "unknown"; map[c] = (map[c] || 0) + 1; });
      return map;
    },
    rescan() { captureInlineState("manual"); },
  };
  window.__BiliApiCapturePage = pageApi;
  window.__biliApiCapturePage = pageApi;
  if (!window.BiliApiCapture) window.BiliApiCapture = pageApi;
  if (!window.__biliApiCapture) window.__biliApiCapture = pageApi;
  window.__BILI_API_CAPTURE_READY__ = true;
  console.log("[BILI_API_CAPTURE] page side ready");

  // ===== BOOT =====
  ensurePanel();
  watchRouteChanges();
  scheduleInlineScans("boot");
  setTimeout(captureCurrentDocumentIfSecurity, 0);
  document.addEventListener("DOMContentLoaded", captureCurrentDocumentIfSecurity, { once: true });
  setTimeout(() => { window.dispatchEvent(new CustomEvent("__BILI_API_CAPTURE_SYNC_REQ__")); }, 200);

  // ===== INTERCEPT FETCH =====
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const requestMetaPromise = buildFetchRequestMeta(args);
    const response = await originalFetch.apply(this, args);
    try {
      const requestUrl = typeof args[0] === "string" ? args[0] : (args[0] && args[0].url) || "";
      const matched = matchApi(requestUrl);
      if (matched) {
        const requestMeta = await requestMetaPromise;
        const responseMeta = buildFetchResponseMeta(response);
        const clone = response.clone();
        const text = await clone.text();
        const json = safeJsonParse(text);
        if (json) {
          record(matched.normalizedUrl, json, matched.pathname, matched.category, requestMeta, responseMeta);
        } else if (isSecurityPath(matched.pathname)) {
          record(
            matched.normalizedUrl,
            buildRawTextPayload(text, responseMeta.contentType),
            matched.pathname,
            matched.category,
            requestMeta,
            responseMeta
          );
        }
      }
    } catch (_e) {}
    return response;
  };

  // ===== INTERCEPT XHR =====
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    this.__capture_url__ = url;
    this.__capture_method__ = String(method || "GET").toUpperCase();
    this.__capture_headers__ = {};
    return originalOpen.call(this, method, url, ...rest);
  };
  XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
    try {
      if (!this.__capture_headers__) this.__capture_headers__ = {};
      Object.assign(this.__capture_headers__, normalizeHeaders({ [name]: value }));
    } catch (_e) {}
    return originalSetRequestHeader.call(this, name, value);
  };
  XMLHttpRequest.prototype.send = function (...args) {
    const requestMeta = {
      method: this.__capture_method__ || "GET",
      headers: this.__capture_headers__ || {},
      body: summarizeBody(args[0])
    };
    this.addEventListener("load", function () {
      try {
        const url = this.responseURL || this.__capture_url__ || "";
        const matched = matchApi(url);
        if (!matched) return;
        let json = null;
        if (this.responseType === "json" && this.response) {
          json = this.response;
        } else if (!this.responseType || this.responseType === "text") {
          const text = typeof this.responseText === "string" ? this.responseText : "";
          json = safeJsonParse(text);
        }
        const responseMeta = {
          status: this.status,
          statusText: this.statusText,
          ok: this.status >= 200 && this.status < 300,
          headers: parseRawHeaders(this.getAllResponseHeaders && this.getAllResponseHeaders()),
          contentType: this.getResponseHeader && this.getResponseHeader("content-type")
        };
        if (json) {
          record(matched.normalizedUrl, json, matched.pathname, matched.category, requestMeta, responseMeta);
        } else if (isSecurityPath(matched.pathname)) {
          const text = typeof this.responseText === "string" ? this.responseText : "";
          record(
            matched.normalizedUrl,
            buildRawTextPayload(text, responseMeta.contentType),
            matched.pathname,
            matched.category,
            requestMeta,
            responseMeta
          );
        }
      } catch (_e) {}
    });
    return originalSend.apply(this, args);
  };

  // ===== INTERCEPT SEND BEACON =====
  const originalSendBeacon = navigator.sendBeacon && navigator.sendBeacon.bind(navigator);
  if (originalSendBeacon) {
    navigator.sendBeacon = function (url, data) {
      const requestUrl = normalizeUrl(url);
      const matched = matchApi(requestUrl);
      const requestMeta = {
        method: "BEACON",
        query: parseQuery(requestUrl),
        headers: {},
        body: summarizeBody(data)
      };
      const accepted = originalSendBeacon(url, data);
      try {
        if (matched) {
          record(
            matched.normalizedUrl,
            { beacon: true, accepted },
            matched.pathname,
            matched.category,
            requestMeta,
            { status: accepted ? 0 : -1, statusText: "sendBeacon", ok: !!accepted, headers: {}, contentType: "" }
          );
        }
      } catch (_e) {}
      return accepted;
    };
  }
})();
`;

    const script = document.createElement("script");
    script.textContent = source;
    document.documentElement.appendChild(script);
    script.remove();
  }

  bootUserscriptSide();
  injectPageHook();
})();
