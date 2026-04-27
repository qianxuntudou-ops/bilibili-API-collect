# Bilibili API 被动采集脚本

这个脚本的目标是：

- 只记录页面自己已经发出的接口请求（被动监听）
- 采集 B 站全部 API（不限于充电相关）
- 记录请求方法、请求头摘要和请求体预览，便于分析页面向服务器发送了什么
- 自动去重（内存级 + 持久化 + 导出时）
- 不额外主动轮询
- 不帮你绕过 B 站风控
- 在不同 B 站页面下都尽量自动生效

适合场景：

- 你已经在浏览器里正常登录
- 你自己打开任意 B 站页面，比如视频页、空间页、动态页、直播间、搜索页等
- 想把页面实际拿到的 API JSON 留下来分析

## 用法

1. 安装浏览器扩展 `Tampermonkey`
2. 新建脚本
3. 把 [bilibili-passive-capture.user.js](./bilibili-passive-capture.user.js) 的内容粘进去并保存
4. 保持登录状态，打开目标 B 站页面
5. 正常浏览页面
6. 页面右下角会出现 `BiliAPI Capture` 悬浮面板

面板按钮：

- `导出 JSON`：导出全部捕获记录
- `导出(去重)`：导出去重后的记录（同一接口 + 相同参数只保留最新）
- `查看摘要`：在控制台里输出摘要表格
- `导出接口`：按 `method + pathname` 聚合去重，导出接口文档草稿
- `重新扫描`：从页面当前内联状态再被动读取一次
- `清空缓存`：清掉本地已保存记录

如果你还想手动看数据，也可以打开浏览器控制台执行：

```js
BiliApiCapture.summary()
```

导出全部记录：

```js
BiliApiCapture.download()
```

导出去重后的记录：

```js
BiliApiCapture.download(true)
```

清空缓存：

```js
BiliApiCapture.clear()
```

查看分类统计：

```js
BiliApiCapture.categories()
```

查看最后一条：

```js
BiliApiCapture.latest()
```

按接口聚合去重：

```js
BiliApiCapture.endpoints()
```

导出接口聚合结果：

```js
BiliApiCapture.downloadEndpoints()
```

## 匹配策略

脚本使用**白名单前缀 + 黑名单排除**策略，自动捕获所有匹配的 B 站 API 请求。

> 当前本地版本为安全/会话分析取向：默认保留敏感字段原值，额外捕获 heartbeat、finger、getbuvid、gaia、cookie refresh、correspond 等关键链路，并对这些安全相关接口放宽去重。

### 白名单前缀

以下路径前缀的请求会被捕获：

`/x/` `/pgc/` `/room/` `/live_user/` `/xlive/` `/audio/` `/paywallet/` `/pugv/` `/pvideo` `/twirp/` `/link_draw/` `/link_setting/` `/session_svr/` `/svr_sync/` `/web_im/` `/medialist/` `/bapis/` `/studio/` `/x2/` `/msg/` `/gift/` `/user_plus/` `/banned_service/` `/main/` 等

### 黑名单排除

以下请求会被跳过（噪音数据）：

- 静态资源（.js, .css, .png, .jpg, .gif, .svg, .woff, .ttf, .mp4, .m4s 等）
- 普通 `/x/report/` 上报噪音
- 安全/会话相关的心跳、设备指纹、Gaia、Cookie 刷新接口在当前本地版本中不会被跳过

### 覆盖的模块

| 模块 | 分类标签 | 典型接口 |
|------|----------|----------|
| 视频 | video | view, playurl, player, ranking, popular |
| 播放器 | player | player/v2, playurl |
| 用户 | user | space, relation, card, acc/info |
| 评论 | comment | reply |
| 弹幕 | danmaku | dm/list, dm/view |
| 动态 | dynamic | feed/all, feed/space, detail |
| 直播 | live | room/get_info, getRoomPlayInfo |
| 搜索 | search | search/type, hotword |
| 收藏 | fav | fav/resource/list, fav/folder |
| 消息 | message | msgfeed, session_svr, web_im |
| 番剧 | bangumi | pgc/view/web/season |
| 音频 | audio | audio/music-service-c |
| 专栏 | article | article/view, article/list |
| 充电 | charge | elec/show, upower, ugcpay |
| 大会员 | vip | vip/privilege |
| 钱包 | wallet | paywallet |
| 漫画 | manga | twirp/comic |
| 课堂 | cheese | pugv/view |
| 相簿 | album | link_draw |
| 登录 | login | nav, passport-login |
| 创作 | creative | vu, x2, studio |
| 排行 | ranking | ranking, popular |
| 历史 | history | history/cursor, toview |
| 杂项 | misc | broadcast, web-show |

## 去重机制

三级去重：

1. **内存级**：当前页面生命周期内，相同 pathname + query 参数（忽略 wts、csrf 等噪音参数）的请求只记录一次
2. **持久化级**：localStorage 中维护最近 1000 条去重 key，跨页面/刷新有效
3. **导出级**：`download(true)` 时对全量记录按去重 key 去重，只保留最新

## 摘要机制

### 专用摘要

以下接口有深度摘要（提取关键字段）：

- `view` / `view/detail`：aid, bvid, cid, title, is_upower_exclusive 等
- `player/v2`：aid, cid, is_upower_exclusive, privilege_type 等
- `playurl`：quality, format, timelength, dash_video_count 等
- `nav`：isLogin, mid, uname, vipStatus 等
- `elec/show`：count, total_count, privilege_type 等
- `space/top/arc`：aid, bvid, is_charging_arc 等
- `acc/info`：mid, name, level, vip 等
- `reply`：page, replies_sample 等
- `feed/all`：items_sample 等
- `room/get_info`：room_id, live_status 等
- `fav/resource/list`：info, medias_sample 等
- `pgc/view/web/season`：season_id, episodes_sample 等
- 以及所有充电相关接口（upower, ugcpay, elec_remark 等）

### 通用摘要

不在专用摘要列表中的接口，会自动提取：

- `code`, `message`
- `data` 的类型（array/object）
- `data` 的长度（array）或键列表（object）
- `data` 的前几条样本（array）

## 输出内容

每条记录包含：

- `time`：采集时间
- `page`：当前页面地址
- `url`：实际请求地址
- `label`：接口路径（pathname）
- `category`：所属模块分类
- `request`：请求侧信息，包含 `method`、已脱敏的 `headers`、已脱敏并截断的 `body` 预览
- `response`：响应侧信息，包含 HTTP `status`、`statusText`、`content-type` 和已脱敏的响应头摘要
- `summary`：提炼的关键字段
- `schema`：根据响应 JSON 推断出的字段结构
- `payload`：原始 JSON（超过 8000 字符自动截断）
- `_dedupe_key`：去重标识

当前本地版本默认不脱敏敏感字段，便于分析 Cookie、CSRF、session、voucher、gaia token 的变化。请求体预览最多保留 50000 字符，并附带长度和 hash。

## 接口聚合导出

`BiliApiCapture.endpoints()` 会基于去重后的记录按 `method + pathname` 聚合，输出：

- `queryKeys`：该接口出现过的 query 参数名
- `bodyKeys`：该接口出现过的 body 字段名
- `statuses`：观察到的 HTTP 状态码
- `contentTypes`：响应类型
- `requestSamples`：脱敏后的请求样本
- `responseSummarySamples`：响应摘要样本
- `responseSchema`：响应 JSON 结构
- `count`：去重后的命中次数

## 内联状态采集

除了拦截 fetch/XHR，脚本还会采集页面内联的全局变量：

- `window.__INITIAL_STATE__`：视频页初始状态
- `window.__playinfo__` / `window.__PLAYINFO__`：播放信息
- `window.__BILI_CONFIG__`：全局配置

脚本元数据匹配范围：

- `*.bilibili.com`
- `bilibili.com`
- `*.b23.tv`
- `b23.tv`

## 存储

- 记录优先存储在 Tampermonkey 的 `GM_setValue` 全局存储中，最多保留 2000 条，可跨 B 站子域共享
- 当前页面的 localStorage 会作为兼容兜底，但不再是主要数据源
- 去重索引最多保留 1000 条
- 当 localStorage 空间不足时自动清理旧记录
- 每条记录的 payload 超过 8000 字符会自动截断

## 跨子域共享

脚本已启用 Tampermonkey 全局存储，因此 `www.bilibili.com`、`space.bilibili.com`、`live.bilibili.com` 等不同子域名下的面板会读取同一份采集记录。

页面注入层仍会在当前页面内负责拦截 fetch/XHR，捕获到记录后通过事件交给 userscript 外层写入全局存储。控制台里的 `BiliApiCapture.list()`、`summary()`、`endpoints()` 默认读取全局存储。

可见面板只由 userscript 外层渲染，页面注入层不再创建自己的 localStorage 面板，避免不同子域显示各自本地计数。升级前已经存在于某个子域 localStorage 的旧数据，会在该子域页面再次打开时自动导入 GM 全局存储。

## 与旧版的区别

| 项目 | 旧版 (v0.x) | 新版 (v1.x) |
|------|-------------|-------------|
| 覆盖范围 | 仅充电相关 ~20 个接口 | 全站 API（白名单前缀匹配） |
| 匹配方式 | 精确路径匹配 | 前缀白名单 + 黑名单排除 |
| 去重 | 仅内存级 | 内存 + 持久化 + 导出级 |
| 摘要 | 仅充电相关专用摘要 | 专用摘要 + 通用摘要 |
| 面板 | 显示"当前页待补" | 显示分类统计 |
| 导出 | 仅全量导出 | 全量 + 去重导出 |
| 存储 | 最多 200 条 | 最多 2000 条 + 溢出保护 |
| 面板名称 | MyBLBL Capture | BiliAPI Capture |
| API 名称 | BiliChargeCapture | BiliApiCapture |

## 建议

- 视频页：容易抓到 view, elec/show, player/v2, playurl
- 空间页：容易抓到 space/top/arc, arc/search
- 动态页：容易抓到 feed/all, feed/space
- 直播间：容易抓到 room/get_info, getRoomPlayInfo
- 搜索页：容易抓到 search/type
- 收藏页：容易抓到 fav/resource/list
- 番剧页：容易抓到 pgc/view/web/season
- 面板可点击标题旁的箭头折叠，不影响正常浏览
- 如果面板里数据没更新，点一次"重新扫描"
- 如果你想接入自己的分析工具，建议直接读取导出的 JSON
