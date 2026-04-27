# 播放器

## web 播放器信息

web 播放器的信息接口，提供正常播放需要的元数据，包括：智能防挡弹幕、字幕、章节看点等。

> https://api.bilibili.com/x/player/wbi/v2  
> https://api.bilibili.com/x/player/v2

*请求方式：GET*

**URL参数:**

| 参数名 | 类型 | 内容      | 必要性      | 备注              |
| ------ | ---- | --------- | ----------- | ----------------- |
| aid    | num  | 稿件 avid | 必要 (可选) | aid 与 bvid 任选 |
| bvid   | str  | 稿件 bvid | 必要 (可选) | aid 与 bvid 任选 |
| cid    | num  | 稿件 cid | 必要 | |
| season_id | num | 番剧 season_id | 不必要 | |
| ep_id | num | 剧集 ep_id | 不必要 | |
| w_rid | str  | WBI 签名 | 不必要 |  |
| wts   | num  | 当前 unix 时间戳 | 不必要 |  |

**JSON回复:**

根对象:

| 字段    | 类型 | 内容     | 备注                        |
| ------- | ---- | -------- | --------------------------- |
| code    | num  | 返回值   | 0: 成功<br />-400: 请求错误 |
| message | str  | 错误信息 | 默认为 0                     |
| ttl     | num  | 1        |                             |
| data    | obj  | 数据本体 |                             |

`data` 对象:

| 字段      | 类型  | 内容     | 备注 |
| --------- | ----- | -------- | ---- |
| aid        | num  | 视频 aid   |      |
| bvid       | str  | 视频 bvid  |      |
| allow_bp   | bool |  |  |
| no_share   | bool | 禁止分享? |  |
| cid        | num  | 视频 cid   |      |
| max_limit  | num  | 未知 |  |
| page_no    | num  | 当前分P号 |  |
| has_next   | bool | 是否有下一分P |  |
| dm_mask    | obj  | webmask 防挡字幕信息 | 若无则没有防挡功能 |
| subtitle   | obj  | 字幕信息 | 若无则没有字幕, 若不登陆则为空 |
| view_points | array  | 分段章节信息 |  |
| ip_info    | obj  | 请求 IP 信息 |      |
| login_mid  | num  | 登录用户 mid |      |
| login_mid_hash | str |  |  |
| is_owner | bool | 是否为该视频 UP 主 |  |
| name       | str  |  |  |
| permission | num  |  |  |
| level_info | obj  | 登录用户等级信息 |  |
| vip        | obj  | 登录用户 VIP 信息 |  |
| answer_status | num | 答题状态 |  |
| block_time | num | 封禁时间? |  |
| role | str |  |  |
| last_play_time | num | 上次观看时间? |  |
| last_play_cid | num | 上次观看 cid? |  |
| now_time | num | 当前 UNIX 秒级时间戳 |  |
| online_count | num | 在线人数 |  |
| need_login_subtitle | bool | 是否必须登陆才能查看字幕 | 是的 |
| preview_toast | str | `为创作付费，购买观看完整视频\|购买观看` |  |
| interaction | obj | 互动视频资讯 | 若非互动视频，则无该栏位（直接没有该键，而非栏位值为空）|
| options | obj |  |  |
| guide_attention | any |  |  |
| jump_card | any |  |  |
| operation_card | any |  |  |
| online_switch | obj |  |  |
| fawkes | obj | 播放器相关信息? |  |
| show_switch | obj |  |  |
| bgm_info | obj | 背景音乐信息 |  |
| toast_block | bool |  |  |
| is_upower_exclusive | bool | 是否为充电专属视频 |  |
| is_upower_play | bool | 当前用户是否可播放充电专属视频 | 已解锁时为 `true` |
| is_ugc_pay_preview | bool | 是否为 UGC 付费试看 |  |
| elec_high_level | obj | 充电专属视频权益提示 | 仅充电专属视频返回有效内容 |
| disable_show_up_info | bool |  |  |
| is_upower_exclusive_with_qa | bool | 是否为带专属问答的充电专属视频 |  |
| arc_aigc | null | AIGC相关信息 | 当前返回null |
| self_visible | null | 自身可见性 | 当前返回null |

`data` 对象中的 `options` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | --- | --- |
| is_360 | bool | 是否 360 全景视频 |  |
| without_vip | bool |  |  |

`data` 对象中的 `bgm_info` 对象:

| 字段 | 类型 | 内容 | 备注 |
| --- | --- | --- | --- |
| music_id | str | 音乐 id |  |
| music_title | str | 音乐标题 |  |
| jump_url | str | 跳转 URL |  |

`data` 对象中的 `dm_mask` 对象 (如果有):

| 字段      | 类型  | 内容     | 备注 |
| --------- | ----- | -------- | ---- |
|cid        | num  |  视频 cid   |      |
|plat       | num  | 未知   |      |
|fps       | num  | webmask 取样 fps   |      |
|time       | num  | 未知   |      |
|mask_url   | str  |  webmask 资源 url |  |

解析 webmask 请看 [智能防挡弹幕](../danmaku/webmask.md)

`data` 对象中的 `subtitle` 对象:

| 字段      | 类型  | 内容     | 备注 |
| --------- | ----- | -------- | ---- |
|allow_submit|bool | true   |      |
|  lan      |  str | ""          |      |
|lan_doc | str | ""    | |
|subtitles| array |  | 不登录为 `[]` |
| subtitle_position | obj | 字幕位置 | 可能为null |
| font_size_type | num | 字体大小类型 | 默认为0 |

`subtitle` 对象中的 `subtitles` 数组内的元素:

| 字段      | 类型  | 内容     | 备注 |
| --------- | ----- | -------- | ---- |
| ai_status | num  |    |      |
| ai_type   | num  |    |   |
| id  | num | | |
|id_str | str| | 和 id 不一样 |
| is_lock | bool | | |
| lan | str | 语言类型英文字母缩写 ||
| lan_doc | str| 语言类型中文名称 | |
|subtitle_url|str| 资源 url 地址 | |
|type| num | 0 | |

`subtitle` 对象中的 `subtitle_position` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| x_min | num | X轴最小值 | |
| y_min | num | Y轴最小值 | |
| x_max | num | X轴最大值 | |
| y_max | num | Y轴最大值 | |

`data`对象中的`view_point` 数组内的元素:

| 字段      | 类型  | 内容     | 备注 |
| --------- | ----- | -------- | ---- |
| content | str  |  分段章节名  |      |
| from | num  |  分段章节起始秒数  |      |
| to | num  |  分段章节结束秒数  |      |
| type | num  |    |      |
| imgUrl | str  |  图片资源地址  |      |
| logoUrl | str  |  ""  |      |
| team_type | str  |    |      |
| team_name | str  |    |      |

`data` 对象中的 `interaction` 对象 (如果有):

| 字段      | 类型  | 内容     | 备注 |
| --------- | ----- | -------- | ---- |
| graph_version | num | 剧情图id |   |
| msg | str |  | 未登入有机会返回 `登录后才能体验全部结局哦～` |
| error_toast | str | 错误信息？ | 所有互动视频皆返回 `剧情图被修改已失效`，不确定有没有例外 |
| mark | num | 0? |   |
| need_reload | num | 0? |   |

`data`对象中的`elec_high_level`对象：

| 字段           | 类型 | 内容                           | 备注             |
| -------------- | ---- | ------------------------------ | ---------------- |
| privilege_type | num  | 解锁视频所需最低定价档位的代码 | 见[充电档位代码与定价](../electric/monthly.md#充电档位代码privilege_type与定价) |
| title          | str  | 提示标题                       | `该视频为「{充电档位名称}」充电专属视频` |
| sub_title      | str  | 提示子标题                     | 可能为空 |
| show_button    | bool | 是否显示按钮                   |                  |
| button_text    | str  | 按钮文本                       | 为空或`去开通`   |
| jump_url       | str  | 跳转url                        | 无按钮时为空     |
| intro          | str  | 充电介绍语                     |                  |
| new            | bool | 是否为新版充电权益提示         | 作用尚不明确     |
| question_text  | str  | 专属问答提示文字               | 无则为空         |
| qa_title       | str  | 专属问答标题                   | 无则为空         |

`data` 对象中的 `ip_info` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| ip | str | IP 地址 | |
| zone_ip | str | 区域 IP | |
| zone_id | num | 区域 ID | |
| country | str | 国家 | |
| province | str | 省份 | |
| city | str | 城市 | |

`data` 对象中的 `level_info` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| current_level | num | 当前等级 | |
| current_min | num | 当前等级最低经验值 | |
| current_exp | num | 当前经验值 | |
| next_exp | num | 升级所需经验值 | |
| level_up | num | 距升级剩余秒数 | |

`data` 对象中的 `vip` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| type | num | VIP 类型 | 0: 无<br />1: 月度大会员<br />2: 年度大会员 |
| status | num | VIP 状态 | 0: 无效<br />1: 有效 |
| due_date | num | VIP 到期时间 | 毫秒级时间戳 |
| vip_pay_type | num | VIP 付费方式 | |
| theme_type | num | 主题类型 | |
| label | obj | VIP 标签信息 | |
| avatar_subscript | num | 头像角标 | |
| nickname_color | str | 昵称颜色 | |
| role | num | 角色 | |
| avatar_subscript_url | str | 头像角标 URL | |
| tv_vip_status | num | 电视大会员状态 | |
| tv_vip_pay_type | num | 电视大会员付费方式 | |
| tv_due_date | num | 电视大会员到期时间 | 毫秒级时间戳 |
| avatar_icon | obj | 头像图标信息 | |
| ott_info | obj | OTT 信息 | |
| super_vip | obj | 超级大会员信息 | |

`data` 对象中的 `vip` 对象中的 `label` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| path | str | 标签路径 | |
| text | str | 标签文字 | |
| label_theme | str | 标签主题 | |
| text_color | str | 文字颜色 | |
| bg_style | num | 背景样式 | |
| bg_color | str | 背景颜色 | |
| border_color | str | 边框颜色 | |
| use_img_label | bool | 是否使用图片标签 | |
| img_label_uri_hans | str | 简体中文图片标签 URI | |
| img_label_uri_hant | str | 繁体中文图片标签 URI | |
| img_label_uri_hans_static | str | 简体中文静态图片标签 URI | |
| img_label_uri_hant_static | str | 繁体中文静态图片标签 URI | |
| label_id | num | 标签 ID | |
| label_goto | obj | 标签跳转信息 | |

`data` 对象中的 `vip` 对象中的 `avatar_icon` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| icon_type | num | 图标类型 | |
| icon_resource | obj | 图标资源 | |

`data` 对象中的 `vip` 对象中的 `ott_info` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| vip_type | num | OTT VIP 类型 | |
| pay_type | num | 付费类型 | |
| pay_channel_id | str | 付费渠道 ID | |
| status | num | 状态 | |
| overdue_time | num | 过期时间 | 毫秒级时间戳 |

`data` 对象中的 `vip` 对象中的 `super_vip` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| is_super_vip | bool | 是否为超级大会员 | |

`data` 对象中的 `online_switch` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| enable_gray_dash_playback | str | 灰度 dash 播放开关 | |
| new_broadcast | str | 新版弹幕开关 | |
| realtime_dm | str | 实时弹幕开关 | |
| subtitle_submit_switch | str | 字幕提交开关 | |

`data` 对象中的 `fawkes` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| config_version | num | 配置版本号 | |
| ff_version | num | ff 版本号 | |

`data` 对象中的 `show_switch` 对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| long_progress | bool | 是否显示长进度条 | |

### 充电专属相关字段判定说明

- `is_upower_exclusive` 更适合直接用于判断“当前视频是否为充电专属视频”
- `is_upower_play` 表示“当前登录用户是否已经具备播放该充电专属视频的权限”，不等同于“当前视频一定是充电专属视频”
- `elec_high_level.privilege_type` 更接近“当前视频要求的充电档位代码”
- 根据抓包样本，部分普通视频页面中也可能出现通用充电状态或通用付费提示字段，这通常更像是在描述该 UP 的充电体系状态或页面通用组件状态，而不一定表示当前视频本身被充电权益锁定
- 因此不要只凭 `preview_toast`、通用充电状态字段，或单独看到充电相关提示文案，就判断当前视频为充电专属
- 若要综合判断，建议优先看：
  - `is_upower_exclusive`
  - `elec_high_level.privilege_type`
  - [视频基本信息](info.md#获取视频详细信息web端)中的 `is_upower_preview`

**示例:**

未登录, `aid=1906473802`

```shell
curl -G 'https://api.bilibili.com/x/player/wbi/v2' \
--url-query 'bvid=BV1MU411S7iJ' \
--url-query 'aid=1906473802' \
--url-query 'cid=1625992822'
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "aid": 1906473802,
    "bvid": "BV1MU411S7iJ",
    "allow_bp": false,
    "no_share": false,
    "cid": 1625992822,
    "max_limit": 1000,
    "page_no": 1,
    "has_next": false,
    "ip_info": {
      "ip": "104.28.152.138",
      "zone_ip": " 10.163.150.25",
      "zone_id": 29409280,
      "country": "美国",
      "province": "加利福尼亚州",
      "city": "东洛杉矶"
    },
    "login_mid": 0,
    "login_mid_hash": "",
    "is_owner": false,
    "name": "",
    "permission": "0",
    "level_info": {
      "current_level": 0,
      "current_min": 0,
      "current_exp": 0,
      "next_exp": 0,
      "level_up": 0
    },
    "vip": {
      "type": 0,
      "status": 0,
      "due_date": 0,
      "vip_pay_type": 0,
      "theme_type": 0,
      "label": {
        "path": "",
        "text": "",
        "label_theme": "",
        "text_color": "",
        "bg_style": 0,
        "bg_color": "",
        "border_color": "",
        "use_img_label": false,
        "img_label_uri_hans": "",
        "img_label_uri_hant": "",
        "img_label_uri_hans_static": "",
        "img_label_uri_hant_static": ""
      },
      "avatar_subscript": 0,
      "nickname_color": "",
      "role": 0,
      "avatar_subscript_url": "",
      "tv_vip_status": 0,
      "tv_vip_pay_type": 0,
      "tv_due_date": 0,
      "avatar_icon": {
        "icon_resource": {}
      }
    },
    "answer_status": 0,
    "block_time": 0,
    "role": "",
    "last_play_time": 0,
    "last_play_cid": 0,
    "now_time": 1725002188,
    "online_count": 1,
    "need_login_subtitle": false,
    "view_points": [],
    "preview_toast": "为创作付费，购买观看完整视频|购买观看",
    "options": {
      "is_360": false,
      "without_vip": false
    },
    "guide_attention": [],
    "jump_card": [],
    "operation_card": [],
    "online_switch": {
      "enable_gray_dash_playback": "500",
      "new_broadcast": "1",
      "realtime_dm": "1",
      "subtitle_submit_switch": "1"
    },
    "fawkes": {
      "config_version": 30787,
      "ff_version": 21289
    },
    "show_switch": {
      "long_progress": false
    },
    "bgm_info": {
      "music_id": "MA436038343856245020",
      "music_title": "Unwelcome school",
      "jump_url": "https://music.bilibili.com/h5/music-detail?music_id=MA436038343856245020&cid=1625992822&aid=1906473802"
    },
    "toast_block": false,
    "is_upower_exclusive": false,
    "is_upower_play": false,
    "is_ugc_pay_preview": false,
    "elec_high_level": {
      "privilege_type": 0,
      "title": "",
      "sub_title": "",
      "show_button": false,
      "button_text": "",
      "jump_url": "",
      "intro": "",
      "new": false
    },
    "disable_show_up_info": false
  }
}
```

</details>

已登陆, `aid=60977932`

```shell
curl -G 'https://api.bilibili.com/x/player/v2' \
--url-query 'aid=60977932' \
--url-query 'cid=106101299' \
-b 'SESSDATA=xxx'
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "aid": 60977932,
    "bvid": "BV1Jt411P77c",
    "allow_bp": false,
    "no_share": false,
    "cid": 106101299,
    "max_limit": 1000,
    "page_no": 1,
    "has_next": true,
    "ip_info": {
      "ip": "108.181.22.55",
      "zone_ip": " 172.27.132.5",
      "zone_id": 29409296,
      "country": "美国",
      "province": "加利福尼亚州",
      "city": "洛杉矶"
    },
    "login_mid": 616368979,
    "login_mid_hash": "445e7035",
    "is_owner": false,
    "name": "淡紫玲儿",
    "permission": "10000,1001",
    "level_info": {
      "current_level": 3,
      "current_min": 1500,
      "current_exp": 2962,
      "next_exp": 4500,
      "level_up": -62135596800
    },
    "vip": {
      "type": 1,
      "status": 0,
      "due_date": 1665417600000,
      "vip_pay_type": 0,
      "theme_type": 0,
      "label": {
        "path": "",
        "text": "",
        "label_theme": "",
        "text_color": "",
        "bg_style": 0,
        "bg_color": "",
        "border_color": "",
        "use_img_label": true,
        "img_label_uri_hans": "",
        "img_label_uri_hant": "",
        "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/d7b702ef65a976b20ed854cbd04cb9e27341bb79.png",
        "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/KJunwh19T5.png"
      },
      "avatar_subscript": 0,
      "nickname_color": "",
      "role": 0,
      "avatar_subscript_url": "",
      "tv_vip_status": 0,
      "tv_vip_pay_type": 0,
      "tv_due_date": 0,
      "avatar_icon": {
        "icon_resource": {}
      }
    },
    "answer_status": 0,
    "block_time": 0,
    "role": "0",
    "last_play_time": 0,
    "last_play_cid": 0,
    "now_time": 1725003260,
    "online_count": 1,
    "need_login_subtitle": false,
    "subtitle": {
      "allow_submit": true,
      "lan": "zh-CN",
      "lan_doc": "中文（中国）",
      "subtitles": [
        {
          "id": 13643112644608002,
          "lan": "zh-Hans",
          "lan_doc": "中文（简体）",
          "is_lock": true,
          "subtitle_url": "//aisubtitle.hdslb.com/bfs/subtitle/c49b18a284739d99df1e3723cdf72c0c82db98e0.json?auth_key=1725003260-5d0391a07f4f47f6960f60cf5045dff3-0-fc16c1f67a6b41edcb2a89d5e0c9bfdd",
          "type": 0,
          "id_str": "13643112644608002",
          "ai_type": 0,
          "ai_status": 0
        },
        {
          "id": 13643200114196484,
          "lan": "en-US",
          "lan_doc": "英语（美国）",
          "is_lock": true,
          "subtitle_url": "//aisubtitle.hdslb.com/bfs/subtitle/2b38bc0f5d7671176964d4c3de441ed37568500c.json?auth_key=1725003260-5f709a74aa884751b77f86b6f6a48078-0-9b2fc3c18b99b1bf0cc7c7e63d18f686",
          "type": 0,
          "id_str": "13643200114196484",
          "ai_type": 0,
          "ai_status": 0
        }
      ]
    },
    "view_points": [],
    "preview_toast": "为创作付费，购买观看完整视频|购买观看",
    "options": {
      "is_360": false,
      "without_vip": false
    },
    "guide_attention": [],
    "jump_card": [],
    "operation_card": [],
    "online_switch": {
      "enable_gray_dash_playback": "500",
      "new_broadcast": "1",
      "realtime_dm": "1",
      "subtitle_submit_switch": "1"
    },
    "fawkes": {
      "config_version": 30787,
      "ff_version": 21289
    },
    "show_switch": {
      "long_progress": false
    },
    "bgm_info": null,
    "toast_block": false,
    "is_upower_exclusive": false,
    "is_upower_play": false,
    "is_ugc_pay_preview": false,
    "elec_high_level": {
      "privilege_type": 0,
      "title": "",
      "sub_title": "",
      "show_button": false,
      "button_text": "",
      "jump_url": "",
      "intro": "",
      "new": false
    },
    "disable_show_up_info": false
  }
}
```

</details>

## 播放反馈

> https://app.bilibili.com/x/resource/laser2

*请求方式: POST*

注: 该接口不传 Cookie

**URL参数:**

|参数名|类型|内容|必要性|备注|
|-|-|-|-|-|
|mid|num|当前用户 mid|不必要|未登录为空|
|buvid|str|BUVID (APP) 或 buvid3 (Web)|必要|可为任意非空字符串|
|app_key|str|APP 密钥|必要|Web: web_player<br />可为任意非空字符串|
|url|str|日志 URL|非必要|从 [上传接口](../creativecenter/upload.md#上传接口) 得到的 upos 协议 URL|
|task_type|num|任务类型|非必要|300: 播放卡顿<br />301: 进度条君无法调戏<br />354: 校园网无法访问<br />303: 弹幕无法显示<br />553: 跳过首尾时间有误<br />304: 出现浮窗广告<br />305: 无限小电视<br />302: 音画不同步<br />306: 黑屏<br />307: 其他|

**JSON回复:**

|字段|类型|内容|备注|
|-|-|-|-|
|code|num|返回值|0: 成功<br />-400: 请求错误|
|message|str|错误信息|默认为 0|
|ttl|num|1||
|data|obj|数据本体| |

`data` 对象:

|字段|类型|内容|备注|
|-|-|-|-|
|task_id|num|任务 ID?||

**示例:**

播放反馈无限小电视, 不登录, 不传文件, buvid 为 `chenrui-in-icu`

```shell
curl -X POST "https://app.bilibili.com/x/resource/laser2" \
--data-urlencode "buvid=chenrui-in-icu" \
--data-urlencode "app_key=web_player" \
--data-urlencode "task_type=305"
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "task_id": 850448532
  }
}
```

</details>
