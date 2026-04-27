# 直播间基本信息

## 获取直播间信息

> https://api.live.bilibili.com/room/v1/Room/get_info

*请求方式: GET*

**URL参数：**

| 参数名     | 类型  | 内容   | 必要性 | 备注    |
|---------|-----|------|-----|-------|
| room_id | num | 直播间号 | 必要  | 可以为短号 |

**json回复：**

根对象：

| 字段      | 类型  | 内容   | 备注              |
|---------|-----|------|-----------------|
| code    | num | 返回值  | 0：成功<br />1：不存在 |
| message | str | 错误信息 |                 |
| msg     | str | 错误信息 |                 |
| data    | obj | 信息本体 |                 |

`data`对象：

| 字段                      | 类型        | 内容     | 备注                          |
|-------------------------|-----------|--------|-----------------------------|
| uid                     | num       | 主播mid  |                             |
| room_id                 | num       | 直播间长号  |                             |
| short_id                | num       | 直播间短号  | 为0是无短号                      |
| attention               | num       | 关注数量   |                             |
| online                  | num       | 观看人数   |                             |
| is_portrait             | bool      | 是否竖屏   |                             |
| description             | str       | 描述     |                             |
| live_status             | num       | 直播状态   | 0：未开播<br />1：直播中<br />2：轮播中 |
| area_id                 | num       | 分区id   |                             |
| parent_area_id          | num       | 父分区id  |                             |
| parent_area_name        | str       | 父分区名称  |                             |
| old_area_id             | num       | 旧版分区id |                             |
| background              | str       | 背景图片链接 |                             |
| title                   | str       | 标题     |                             |
| user_cover              | str       | 封面     |                             |
| keyframe                | str       | 关键帧    | 用于网页端悬浮展示                   |
| is_strict_room          | bool      | 未知     | 未知                          |
| live_time               | str       | 直播开始时间 | YYYY-MM-DD HH:mm:ss         |
| tags                    | str       | 标签     | ','分隔                       |
| is_anchor               | num       | 未知     | 未知                          |
| room_silent_type        | str       | 禁言状态   |                             |
| room_silent_level       | num       | 禁言等级   |                             |
| room_silent_second      | num       | 禁言时间   | 单位是秒                        |
| area_name               | str       | 分区名称   |                             |
| pardants                | str       | 未知     | 未知                          |
| area_pardants           | str       | 未知     | 未知                          |
| hot_words               | list(str) | 热词     |                             |
| hot_words_status        | num       | 热词状态   |                             |
| verify                  | str       | 未知     | 未知                          |
| new_pendants            | obj       | 头像框\大v |                             |
| up_session              | str       | 未知     |                             |
| pk_status               | num       | pk状态   |                             |
| pk_id                   | num       | pk id  |                             |
| battle_id               | num       | 未知     |                             |
| allow_change_area_time  | num       |        |                             |
| allow_upload_cover_time | num       |        |                             |
| studio_info             | obj       |        |                             |

`new_pendants`对象：

| 字段           | 类型  | 内容  | 备注                |
|--------------|-----|-----|-------------------|
| frame        | obj | 头像框 |                   |
| mobile_frame | obj | 同上  | 手机版, 结构一致, 可能null |
| badge        | obj | 大v  |                   |
| mobile_badge | obj | 同上  | 手机版, 结构一致, 可能null |

`frame`对象：

| 字段           | 类型   | 内容     | 备注  |
|--------------|------|--------|-----|
| name         | str  | 名称     |     |
| value        | str  | 值      |     |
| position     | num  | 位置     |     |
| desc         | str  | 描述     |     |
| area         | num  | 分区     |     |
| area_old     | num  | 旧分区    |     |
| bg_color     | str  | 背景色    |     |
| bg_pic       | str  | 背景图    |     |
| use_old_area | bool | 是否旧分区号 |     |

`badge`对象：

| 字段       | 类型  | 内容  | 备注                                        |
|----------|-----|-----|-------------------------------------------|
| name     | str | 类型  | v_person: 个人认证(黄) <br /> v_company: 企业认证(蓝) |
| position | num | 位置  |                                           |
| value    | str | 值   |                                           |
| desc     | str | 描述  |                                           |

`studio_info`对象：

| 字段          | 类型    | 内容  | 备注  |
|-------------|-------|-----|-----|
| status      | num   |     |     |
| master_list | array |     |     |

**示例：**

查询直播间`room_id=1`信息

```shell
curl -G 'https://api.live.bilibili.com/room/v1/Room/get_info' \
--data-urlencode 'room_id=1'
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "msg": "ok",
  "message": "ok",
  "data": {
    "uid": 9617619,
    "room_id": 5440,
    "short_id": 1,
    "attention": 11919499,
    "online": 0,
    "is_portrait": false,
    "description": "欢迎加入bilibili《快乐运动研究社》，和B站UP主们一起探讨有关运动的经历感受，解决身体和情绪的“疑难杂症”，寻找适合自己的运动，一起跟练！本期我们一起探讨：运动健身能缓解社交恐惧吗？",
    "live_status": 2,
    "area_id": 145,
    "parent_area_id": 1,
    "parent_area_name": "娱乐",
    "old_area_id": 6,
    "background": "",
    "title": "快乐运动研究社",
    "user_cover": "https://i0.hdslb.com/bfs/live/new_room_cover/96943b8d106a777a34cf796421bb4254163b30e1.jpg",
    "keyframe": "https://i0.hdslb.com/bfs/live-key-frame/keyframe08121926000000005440np0q7a.jpg",
    "is_strict_room": false,
    "live_time": "0000-00-00 00:00:00",
    "tags": "",
    "is_anchor": 0,
    "room_silent_type": "",
    "room_silent_level": 1,
    "room_silent_second": 0,
    "area_name": "视频聊天",
    "pendants": "",
    "area_pendants": "",
    "hot_words": [
      "2333333",
      "喂，妖妖零吗",
      "红红火火恍恍惚惚",
      "FFFFFFFFFF",
      "Yooooooo",
      "啪啪啪啪啪",
      "666666666",
      "老司机带带我",
      "你为什么这么熟练啊",
      "gg",
      "prprpr",
      "向大佬低头",
      "请大家注意弹幕礼仪哦！",
      "还有这种操作！",
      "囍",
      "打call",
      "你气不气？",
      "队友呢？"
    ],
    "hot_words_status": 0,
    "verify": "",
    "new_pendants": {
      "frame": {
        "name": "",
        "value": "",
        "position": 0,
        "desc": "",
        "area": 0,
        "area_old": 0,
        "bg_color": "",
        "bg_pic": "",
        "use_old_area": false
      },
      "badge": {
        "name": "v_company",
        "position": 3,
        "value": "",
        "desc": "哔哩哔哩直播官方账号"
      },
      "mobile_frame": {
        "name": "",
        "value": "",
        "position": 0,
        "desc": "",
        "area": 0,
        "area_old": 0,
        "bg_color": "",
        "bg_pic": "",
        "use_old_area": false
      },
      "mobile_badge": null
    },
    "up_session": "",
    "pk_status": 0,
    "pk_id": 0,
    "battle_id": 0,
    "allow_change_area_time": 0,
    "allow_upload_cover_time": 0,
    "studio_info": {
      "status": 0,
      "master_list": []
    }
  }
}
```

</details>

---

## 获取直播间详细信息(按房间号)

> https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom

*请求方式: GET*

认证方式：WBI签名（需w_rid, wts参数）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |
| web_location | str | Web位置 | 非必要 | |
| w_rid | str | WBI签名 | 必要 | |
| wts | num | WBI时间戳 | 必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| ttl | num | 未知 | |
| data | obj | 数据 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| room_info | obj | 直播间信息 | |
| anchor_info | obj | 主播信息 | |
| news_info | obj | 动态信息 | |
| rankdb_info | obj | 排行榜信息 | |
| area_rank_info | obj | 分区排行信息 | |
| battle_rank_entry_info | null | 大乱斗排行入口 | |
| tab_info | obj | 标签页信息 | |
| voice_join_info | obj | 连麦信息 | |
| ad_banner_info | obj | 广告横幅信息 | |
| skin_info | obj | 皮肤信息 | |
| pk_info | null | PK信息 | |
| battle_info | null | 大乱斗信息 | |
| silent_room_info | obj | 禁言信息 | |
| switch_info | obj | 开关信息 | |
| room_config_info | obj | 房间配置信息 | |
| gift_memory_info | obj | 礼物回忆信息 | |
| new_switch_info | obj | 新版开关信息 | |
| super_chat_info | obj | 醒目留言信息 | |
| dm_brush_info | obj | 弹幕刷屏信息 | |
| dm_emoticon_info | obj | 弹幕表情信息 | |
| dm_tag_info | obj | 弹幕标签信息 | |
| topic_info | obj | 话题信息 | |
| game_info | obj | 游戏信息 | |
| watched_show | obj | 观看人数展示 | |
| topic_room_info | obj | 话题房间信息 | |
| show_reserve_status | bool | 是否显示预约状态 | |
| like_info_v3 | obj | 点赞信息 | |
| live_play_info | obj | 直播播放信息 | |
| multi_voice | obj | 多人连麦信息 | |
| popular_rank_info | null | 人气排行信息 | |
| new_area_rank_info | obj | 新版分区排行 | |
| gift_star | obj | 礼物之星 | |
| progress_for_widget | obj | 小组件进度 | |
| revenue_demotion | obj | 收益降级信息 | |
| block_info | obj | 封禁信息 | |
| danmu_extra | obj | 弹幕额外信息 | |
| player_throttle_info | obj | 播放器限流信息 | |
| guard_info | obj | 大航海信息 | |
| room_rank_info | obj | 房间排行信息 | |
| dm_reply | obj | 弹幕回复信息 | |
| dm_combo | null | 弹幕连击信息 | |
| dm_vote | null | 弹幕投票信息 | |
| location | null | 位置信息 | |
| interactive_game_tag | obj | 互动游戏标签 | |
| video_enhancement | obj | 视频增强 | |
| guard_leader | obj | 舰长头衔 | |
| room_anonymous | obj | 匿名房间信息 | |
| tab_switches | obj | 标签页开关 | |
| pk_info_v2 | null | PK信息V2 | |
| area_mask_info | obj | 分区遮罩信息 | |
| lol_info | null | 英雄联盟信息 | |
| record_switch_info | null | 录制开关信息 | |
| online_gold_rank_info_v2 | null | 金色排行信息V2 | |
| second_create_info | null | 二创信息 | |
| play_together_info | null | 一起玩信息 | |
| cloud_game_info | obj | 云游戏信息 | |
| revenue_material_md5 | null | 收益素材MD5 | |
| video_connection_info | null | 视频连接信息 | |
| hot_rank_info | null | 热门排行信息 | |
| universal_interact_info | null | 通用互动信息 | |

`data.room_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 主播UID | |
| room_id | num | 直播间ID | |
| short_id | num | 短号 | |
| title | str | 直播间标题 | |
| cover | str | 封面URL | |
| tags | str | 标签 | |
| background | str | 背景图URL | |
| description | str | 直播间描述 | |
| live_status | num | 直播状态 | 0: 未开播; 1: 直播中; 2: 轮播中 |
| live_start_time | num | 直播开始时间 | 10位Unix时间戳 |
| live_screen_type | num | 直播画面类型 | 未知 |
| lock_status | num | 锁定状态 | 未知 |
| lock_time | num | 锁定时间 | 未知 |
| hidden_status | num | 隐藏状态 | 未知 |
| hidden_time | num | 隐藏时间 | 未知 |
| area_id | num | 子分区ID | |
| area_name | str | 子分区名称 | |
| parent_area_id | num | 父分区ID | |
| parent_area_name | str | 父分区名称 | |
| keyframe | str | 关键帧URL | |
| special_type | num | 特殊类型 | 未知 |
| pk_status | num | PK状态 | 未知 |
| is_studio | bool | 是否工作室模式 | |
| pendants | obj | 挂件信息 | |
| on_voice_join | num | 连麦状态 | 未知 |
| online | num | 人气值 | |
| room_type | obj | 房间类型 | |
| sub_session_key | str | 子会话标识 | |
| live_id | num | 直播ID | |
| live_id_str | str | 直播ID(字符串) | |
| official_room_id | num | 官方房间ID | |
| official_room_info | null | 官方房间信息 | |
| voice_background | str | 语音背景 | |
| live_model | num | 直播模式 | 未知 |
| live_platform | str | 直播平台 | |
| radio_background_type | num | 电台背景类型 | 未知 |

`data.anchor_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| base_info | obj | 基本信息 | |
| live_info | obj | 直播等级信息 | |
| relation_info | obj | 关系信息 | |
| medal_info | obj | 粉丝牌信息 | |
| gift_info | obj | 礼物信息 | |

`data.anchor_info.base_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uname | str | 主播名称 | |
| face | str | 主播头像URL | |
| gender | str | 性别 | |
| official_info | obj | 认证信息 | |

`data.anchor_info.live_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| level | num | 直播等级 | |
| level_color | num | 等级颜色 | |
| score | num | 直播积分 | |
| upgrade_score | num | 升级积分 | |
| current | array | 当前区间 | |
| next | array | 下一区间 | |
| rank | str | 排名 | |

`data.anchor_info.relation_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| attention | num | 关注状态 | 未知 |

`data.anchor_info.medal_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| medal_name | str | 粉丝牌名称 | |
| medal_id | num | 粉丝牌ID | |
| fansclub | num | 粉丝团 | 未知 |

`data.anchor_info.gift_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| price | num | 礼物价格 | |
| price_update_time | num | 价格更新时间 | |

`data.rankdb_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| roomid | num | 直播间ID | |
| rank_desc | str | 排名描述 | |
| color | str | 颜色 | |
| h5_url | str | H5链接 | |
| web_url | str | Web链接 | |
| timestamp | num | 时间戳 | |

`data.silent_room_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| type | str | 禁言类型 | |
| level | num | 禁言等级 | |
| second | num | 禁言时长(秒) | |
| expire_time | num | 过期时间 | |

`data.switch_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| close_guard | bool | 关闭大航海 | |
| close_gift | bool | 关闭礼物 | |
| close_online | bool | 关闭在线人数 | |
| close_danmaku | bool | 关闭弹幕 | |

`data.super_chat_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| status | num | 醒目留言状态 | 未知 |
| jump_url | str | 跳转链接 | |
| icon | str | 图标URL | |
| ranked_mark | num | 排名标识 | 未知 |
| message_list | array | 醒目留言列表 | |
| sc_manager | bool | 是否醒目留言管理 | |

`data.dm_brush_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| min_time | num | 最小间隔(毫秒) | |
| brush_count | num | 刷屏数量 | |
| slice_count | num | 分片数量 | |
| storage_time | num | 存储时间 | |

`data.watched_show`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| switch | bool | 是否显示 | |
| num | num | 观看人数 | |
| text_small | str | 小文字 | |
| text_large | str | 大文字 | |
| icon | str | 图标URL | |
| icon_location | num | 图标位置 | |
| icon_web | str | Web图标URL | |

`data.like_info_v3`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| total_likes | num | 总点赞数 | |
| click_block | bool | 点击屏蔽 | 未知 |
| count_block | bool | 计数屏蔽 | 未知 |
| guild_emo_text | str | 公会表情文字 | |
| guild_dm_text | str | 公会弹幕文字 | |
| like_dm_text | str | 点赞弹幕文字 | |
| hand_icons | array | 手势图标URL列表 | |
| dm_icons | array | 弹幕图标URL列表 | |
| eggshells_icon | str | 蛋壳图标URL | |
| count_show_time | num | 计数展示时间 | |
| process_icon | str | 进度图标URL | |
| process_color | str | 进度颜色 | |
| report_click_limit | num | 举报点击限制 | |
| report_time_min | num | 举报最小时间 | |
| report_time_max | num | 举报最大时间 | |
| icon | str | 图标URL | |
| cooldown | num | 冷却时间(秒) | |
| hand_use_face | bool | 手势使用头像 | |
| guide_icon_urls | array | 引导图标URL列表 | |
| guide_icon_ratio | num | 引导图标比例 | |

`data.guard_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| count | num | 大航海人数 | |
| anchor_guard_achieve_level | num | 主播大航海成就等级 | |

`data.guard_leader`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 舰长UID | |
| name | str | 舰长名称 | |
| face | str | 舰长头像URL | |
| jump_url | str | 跳转链接 | |
| text | str | 文字 | |
| rank_top_icon1 | str | 排名顶部图标1 | |
| rank_top_icon2 | str | 排名顶部图标2 | |
| rank_top_background_url1 | str | 排名顶部背景1 | |
| rank_top_background_url2 | str | 排名顶部背景2 | |
| background_url | str | 背景URL | |
| show | num | 是否显示 | |
| anchor_background_url | str | 主播背景URL | |
| input_background_url | str | 输入框背景URL | |
| newly | num | 是否新增 | |
| entry_effect_id | num | 入场特效ID | |
| rank_top_background_light_url1 | str | 排名顶部亮色背景1 | |
| rank_top_background_light_url2 | str | 排名顶部亮色背景2 | |
| display_src | str | 展示来源 | |
| avatar_src | str | 头像来源 | |
| icon_src | str | 图标来源 | |

`data.player_throttle_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| status | num | 限流状态 | |
| normal_sleep_time | num | 普通休眠时间(秒) | |
| fullscreen_sleep_time | num | 全屏休眠时间(秒) | |
| tab_sleep_time | num | 标签页休眠时间(秒) | |
| prompt_time | num | 提示时间(秒) | |

`data.block_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| block | bool | 是否被封禁 | |
| desc | str | 封禁描述 | |
| business | num | 业务类型 | 未知 |

`data.video_enhancement`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| title | str | 标题 | |
| desc | str | 描述 | |
| default_switch_status | num | 默认开关状态 | |
| highest_quality | num | 最高画质 | |
| is_enabled | bool | 是否启用 | |

`data.area_mask_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| area_masks | obj | 分区遮罩 | |

`data.area_mask_info.area_masks`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| horizontal_masks | null | 横向遮罩 | |
| vertical_masks | null | 纵向遮罩 | |
| full_mask | null | 全屏遮罩 | |

`data.news_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 主播UID | |
| ctime | str | 创建时间 | |
| content | str | 动态内容 | |

`data.area_rank_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| areaRank | obj | 分区排行 | |
| liveRank | obj | 直播排行 | |

`data.area_rank_info.areaRank`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| index | num | 排名索引 | |
| rank | str | 排名 | |

`data.area_rank_info.liveRank`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| rank | str | 排名 | |

`data.tab_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| list | array | 标签页列表 | |

`data.voice_join_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| status | obj | 连麦状态 | |
| icons | obj | 图标信息 | |
| web_share_link | str | Web分享链接 | |

`data.voice_join_info.status`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| open | num | 是否开放连麦 | |
| anchor_open | num | 主播是否开放 | |
| status | num | 连麦状态 | |
| uid | num | 连麦用户UID | |
| user_name | str | 连麦用户名 | |
| head_pic | str | 连麦用户头像URL | |
| guard | num | 大航海等级 | |
| start_at | num | 开始时间 | 10位时间戳 |
| current_time | num | 当前时间 | 10位时间戳 |

`data.voice_join_info.icons`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| icon_close | str | 关闭图标URL | |
| icon_open | str | 开启图标URL | |
| icon_wait | str | 等待图标URL | |
| icon_starting | str | 开始中图标URL | |

`data.ad_banner_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| data | null | 广告数据 | |

`data.skin_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| id | num | 皮肤ID | |
| skin_name | str | 皮肤名称 | |
| skin_config | str | 皮肤配置 | JSON格式 |
| show_text | str | 展示文字 | |
| skin_url | str | 皮肤URL | |
| start_time | num | 开始时间 | 10位时间戳 |
| end_time | num | 结束时间 | 10位时间戳 |
| current_time | num | 当前时间 | 10位时间戳 |

`data.room_config_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| dm_text | str | 弹幕文字 | |
| is_default | bool | 是否默认配置 | |

`data.gift_memory_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| list | null | 礼物回忆列表 | |

`data.new_switch_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| room-socket | num | WebSocket连接 | |
| room-prop-send | num | 房间道具发送 | |
| room-sailing | num | 航行功能 | |
| room-info-popularity | num | 人气信息 | |
| room-danmaku-editor | num | 弹幕编辑器 | |
| room-effect | num | 房间特效 | |
| room-fans_medal | num | 粉丝勋章 | |
| room-report | num | 举报功能 | |
| room-feedback | num | 反馈功能 | |
| room-player-watermark | num | 播放器水印 | |
| room-recommend-live_off | num | 直播推荐关闭 | |
| room-activity | num | 活动功能 | |
| room-web_banner | num | Web横幅 | |
| room-silver_seeds-box | num | 银瓜子宝箱 | |
| room-wishing_bottle | num | 许愿瓶 | |
| room-board | num | 看板功能 | |
| room-supplication | num | 祈福功能 | |
| room-hour_rank | num | 小时榜 | |
| room-week_rank | num | 周榜 | |
| room-anchor_rank | num | 主播榜 | |
| room-info-integral | num | 积分信息 | |
| room-super-chat | num | 醒目留言 | |
| room-tab | num | 标签页 | |
| room-hot-rank | num | 热门榜 | |
| fans-medal-progress | num | 粉丝勋章进度 | |
| gift-bay-screen | num | 礼物弹幕屏 | |
| room-enter | num | 进场功能 | |
| room-my-idol | num | 我的偶像 | |
| room-topic | num | 话题功能 | |
| fans-club | num | 粉丝团 | |
| room-popular-rank | num | 人气排行 | |
| mic_user_gift | num | 麦位用户礼物 | |
| new-room-area-rank | num | 新版分区排行 | |
| wealth_medal | num | 财富勋章 | |
| bubble | num | 气泡 | |
| title | num | 头衔 | |
| room_rank_rearrange | num | 房间排行重排 | |
| web-gift-batter-bar | num | Web礼物连击栏 | |
| popular_rank_anchor_ab | num | 人气排行主播AB测试 | |
| h5_pop_up | num | H5弹窗 | |
| brand-user-card-web-switch | num | 品牌用户卡片Web开关 | |
| brand-follow-switch | num | 品牌关注开关 | |
| danmu_click_switch | num | 弹幕点击开关 | |
| danmu_setting_show_switch | num | 弹幕设置显示开关 | |
| room_hot_rank_v3 | num | 热门榜V3 | |
| dm_pin_switch | num | 弹幕置顶开关 | |
| input_plus_switch | num | 输入增强开关 | |
| enter_room_warning | num | 进入房间警告 | |
| chronos_danmu_style | num | 时间弹幕样式 | |

`data.dm_emoticon_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| is_open_emoticon | num | 是否开启表情 | |
| is_shield_emoticon | num | 是否屏蔽表情 | |

`data.dm_tag_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| dm_tag | num | 弹幕标签 | |
| platform | null | 平台 | |
| extra | str | 额外信息 | |
| dm_chronos_extra | str | 时间弹幕额外信息 | |
| dm_mode | null | 弹幕模式 | |
| dm_setting_switch | num | 弹幕设置开关 | |
| material_conf | null | 素材配置 | |

`data.topic_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| topic_id | num | 话题ID | |
| topic_name | str | 话题名称 | |

`data.game_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| game_status | num | 游戏状态 | |

`data.topic_room_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| interactive_h5_url | str | 互动H5链接 | |
| watermark | num | 水印 | |

`data.live_play_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| show_widget_banner | bool | 是否显示小组件横幅 | |
| show_left_entry | bool | 是否显示左侧入口 | |
| widget_version | num | 小组件版本 | |

`data.multi_voice`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| switch_status | num | 连麦开关状态 | |
| members | array | 连麦成员列表 | |
| mv_role | num | MV角色 | |
| seat_type | num | 座位类型 | |
| invoking_time | num | 邀请时间 | 10位时间戳 |
| version | num | 版本 | |
| pk | null | PK信息 | |
| biz_session_id | str | 业务会话ID | |
| mode_details | null | 模式详情 | |
| hat_list | null | 帽子列表 | |
| battle_info | null | 大乱斗信息 | |

`data.new_area_rank_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| items | null | 排行项列表 | |
| rotation_cycle_time_web | num | Web轮播周期时间(秒) | |

`data.gift_star`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| show | bool | 是否显示 | |
| display_widget_ab_group | num | 展示小组件AB组 | |

`data.progress_for_widget`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| gift_star_process | null | 礼物之星进度 | |
| wish_process | null | 许愿进度 | |
| star_knight | null | 星骑士进度 | |
| collection_praise_process | obj | 集赞进度 | |
| wish_process_v2 | null | 许愿进度V2 | |

`data.progress_for_widget.collection_praise_process`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| id | num | 活动ID | |
| uid | num | 主播UID | |
| target_praise | num | 目标点赞数 | |
| current_praise | num | 当前点赞数 | |
| start_time | num | 开始时间 | 10位时间戳 |
| end_time | num | 结束时间 | 10位时间戳 |
| benefit | str | 奖励描述 | |
| isSuccess | bool | 是否成功 | |
| exist | bool | 是否存在 | |
| audit_status | num | 审核状态 | |
| jump_url | str | 跳转链接 | |
| current_praise_text | str | 当前点赞文字 | |
| icon_url | str | 图标URL | |
| live_id | str | 直播ID | |

`data.revenue_demotion`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| global_gift_config_demotion | bool | 全局礼物配置降级 | |

`data.danmu_extra`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| screen_switch_off | bool | 屏幕开关关闭 | |
| chronos_kv | str | 时间KV配置 | |
| danmu_player_config | null | 弹幕播放器配置 | |
| danmu_settings | null | 弹幕设置 | |
| input_plus | obj | 输入增强 | |
| laugh_room_info | obj | 欢笑房间信息 | |

`data.room_rank_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| anchor_rank_entry | null | 主播排行入口 | |
| user_rank_entry | obj | 用户排行入口 | |
| user_rank_tab_list | obj | 用户排行标签页列表 | |

`data.room_rank_info.user_rank_entry`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| user_contribution_rank_entry | obj | 用户贡献排行入口 | |

`data.room_rank_info.user_rank_tab_list`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| tab | array | 排行标签页列表 | |

`data.dm_reply`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| show_reply | bool | 是否显示回复 | |
| show_reply_esports | bool | 是否显示电竞回复 | |

`data.room_anonymous`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| open_anonymous | bool | 是否开启匿名 | |

`data.tab_switches`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| subtitle | num | 字幕开关 | |
| realtime_data | null | 实时数据 | |
| lol_player_grade | null | 英雄联盟玩家评分 | |
| wzry_player_grade | null | 王者荣耀玩家评分 | |

`data.interactive_game_tag`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| action | num | 动作 | |
| game_id | str | 游戏ID | |
| game_name | str | 游戏名称 | |

## 获取用户对应的直播间状态

> https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld

*请求方式：GET*

**url参数：**

| 参数名 | 类型  | 内容      | 必要性 | 备注  |
|-----|-----|---------|-----|-----|
| mid | num | 目标用户mid | 必要  |     |

**json回复：**

根对象：

| 字段      | 类型  | 内容   | 备注                  |
|---------|-----|------|---------------------|
| code    | num | 返回值  | 0：成功<br />-400：请求错误 |
| message | str | 错误信息 | 默认为0                |
| ttl     | num | 1    |                     |
| data    | obj | 信息本体 |                     |

`data`对象：

| 字段             | 类型  | 内容        | 备注               |
|----------------|-----|-----------|------------------|
| roomStatus     | num | 直播间状态     | 0：无房间<br />1：有房间 |
| roundStatus    | num | 轮播状态      | 0：未轮播<br />1：轮播  |
| live_status    | num | 直播状态      | 0：未开播<br />1：直播中 |
| url            | str | 直播间网页url  |                  |
| title          | str | 直播间标题     |                  |
| cover          | str | 直播间封面url  |                  |
| online         | num | 直播间人气     | 值为上次直播时刷新        |
| roomid         | num | 直播间id（短号） |                  |
| broadcast_type | num | 0         |                  |
| online_hidden  | num | 0         |                  |

**示例：**

查询用户`mid=322892`的直播间信息

```shell
curl -G 'https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld' \
--data-urlencode 'mid=322892'
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "roomStatus": 1,
    "roundStatus": 0,
    "live_status": 1,
    "url": "https://live.bilibili.com/5441",
    "title": "好久没当黑铁主播了",
    "cover": "http://i0.hdslb.com/bfs/live/room_cover/833f7ff506bac17c06010e8834922993657505b2.jpg",
    "online": 268602,
    "roomid": 5441,
    "broadcast_type": 0,
    "online_hidden": 0
  }
}
```

</details>

## 获取房间页初始化信息

> https://api.live.bilibili.com/room/v1/Room/room_init

*请求方式：GET*

**url参数：**

| 参数名 | 类型  | 内容         | 必要性 | 备注  |
|-----|-----|------------|-----|-----|
| id  | num | 目标直播间号（短号） | 必要  |     |

**json回复：**

根对象：

| 字段      | 类型  | 内容   | 备注                     |
|---------|-----|------|------------------------|
| code    | num | 返回值  | 0：成功<br />60004：直播间不存在 |
| msg     | str | 错误信息 | 默认为ok                  |
| message | str | 错误信息 | 默认为ok                  |
| data    | obj | 信息本体 |                        |

`data`对象：

| 字段           | 类型   | 内容           | 备注                                 |
|--------------|------|--------------|------------------------------------|
| room_id      | num  | 直播间真实id      |                                    |
| short_id     | num  | 直播间id（短号）    |                                    |
| uid          | num  | 主播用户mid      |                                    |
| need_p2p     | num  | 是否p2p        |                                    |
| is_hidden    | bool | 是否隐藏         |                                    |
| is_locked    | bool | 是否锁定         |                                    |
| is_portrait  | bool | 是否竖屏         |                                    |
| live_status  | num  | 直播状态         | 0：未开播<br />1：直播中<br />2：轮播中        |
| hidden_till  | num  | 隐藏时间戳        | 	                                  |
| lock_till    | num  | 锁定时间戳        | 		                                 |
| encrypted    | bool | 是否加密         | 		                                 |
| pwd_verified | bool | 加密房间是否通过密码验证 | `encrypted`=true时才有意义              |
| live_time    | num  | 开播时间         | 未开播时为`-62170012800`                |
| room_shield  | num  | 未知           |                                    |
| is_sp        | num  | 是否为特殊直播间     | 0：普通直播间<br />1：付费直播间               |
| special_type | num  | 特殊直播间标志      | 0：普通直播间<br />1：付费直播间<br />2：拜年祭直播间 |

**示例：**

查询直播间`id=76`的直播间信息

```shell
curl -G 'https://api.live.bilibili.com/room/v1/Room/room_init' \
--data-urlencode 'id=76'
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "msg": "ok",
  "message": "ok",
  "data": {
    "room_id": 14073662,
    "short_id": 76,
    "uid": 50333369,
    "need_p2p": 0,
    "is_hidden": false,
    "is_locked": false,
    "is_portrait": false,
    "live_status": 1,
    "hidden_till": 0,
    "lock_till": 0,
    "encrypted": false,
    "pwd_verified": false,
    "live_time": 1602151186,
    "room_shield": 1,
    "is_sp": 0,
    "special_type": 0
  }
}
```

</details>

## 获取主播信息

> https://api.live.bilibili.com/live_user/v1/Master/info

*请求方式：GET*

**url参数：**

| 参数名 | 类型  | 内容      | 必要性 | 备注  |
|-----|-----|---------|-----|-----|
| uid | num | 目标用户mid | 必要  |     |

**json回复：**

根对象：

| 字段      | 类型  | 内容   | 备注               |
|---------|-----|------|------------------|
| code    | num | 返回值  | 0：成功<br />1：参数错误 |
| msg     | str | 错误信息 | 默认为空             |
| message | str | 错误信息 | 默认为空             |
| data    | obj | 信息本体 |                  |

`data`对象：

| 字段             | 类型  | 内容        | 备注         |
|----------------|-----|-----------|------------|
| info           | obj | 主播信息      |            |
| exp            | obj | 经验等级      |            |
| follower_num   | num | 主播粉丝数     |            |
| room_id        | num | 直播间id（短号） |            |
| medal_name     | str | 粉丝勋章名     |            |
| glory_count    | num | 主播荣誉数     |            |
| pendant        | str | 直播间头像框url |            |
| link_group_num | num | 0         | **作用尚不明确** |
| room_news      | obj | 主播公告      |            |

`info`对象：

| 字段              | 类型  | 内容      | 备注                      |
|-----------------|-----|---------|-------------------------|
| uid             | num | 主播mid   |                         |
| uname           | str | 主播用户名   |                         |
| face            | str | 主播头像url |                         |
| official_verify | obj | 认证信息    |                         |
| gender          | num | 主播性别    | -1：保密<br />0：女<br />1：男 |

`info`中的`official_verify`对象：

| 字段   | 类型  | 内容     | 备注                           |
|------|-----|--------|------------------------------|
| type | num | 主播认证类型 | -1：无<br />0：个人认证<br />1：机构认证 |
| desc | str | 主播认证信息 |                              |

`exp`对象：

| 字段           | 类型  | 内容   | 备注  |
|--------------|-----|------|-----|
| master_level | obj | 主播等级 |     |

`exp`中的`master_level`对象：

| 字段      | 类型    | 内容     | 备注  |
|---------|-------|--------|-----|
| level   | num   | 当前等级   |     |
| color   | num   | 等级框颜色  |     |
| current | array | 当前等级信息 |     |
| next    | array | 下一等级信息 |     |

`master_level`中的`current`数组：

| 项   | 类型  | 内容   | 备注  |
|-----|-----|------|-----|
| 0   | num | 升级积分 |     |
| 1   | num | 总积分  |     |

`master_level`中的`next`数组：

| 项   | 类型  | 内容   | 备注  |
|-----|-----|------|-----|
| 0   | num | 升级积分 |     |
| 1   | num | 总积分  |     |

`room_news`对象：

| 字段         | 类型  | 内容   | 备注  |
|------------|-----|------|-----|
| content    | str | 公告内容 |     |
| ctime      | str | 公告时间 |     |
| ctime_text | str | 公告日期 |     |

**示例：**

查询直播间`mid=2`的主播信息

```shell
curl -G 'https://api.live.bilibili.com/live_user/v1/Master/info' \
--data-urlencode 'uid=2'
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "msg": "",
  "message": "",
  "data": {
    "info": {
      "uid": 2,
      "uname": "碧诗",
      "face": "https://i0.hdslb.com/bfs/face/ef0457addb24141e15dfac6fbf45293ccf1e32ab.jpg",
      "official_verify": {
        "type": 0,
        "desc": "bilibili个人认证:bilibili创始人（站长）"
      },
      "gender": 1
    },
    "exp": {
      "master_level": {
        "level": 30,
        "color": 10512625,
        "current": [
          2870000,
          11883810
        ],
        "next": [
          3730000,
          15613810
        ]
      }
    },
    "follower_num": 926624,
    "room_id": 1024,
    "medal_name": "逸国",
    "glory_count": 0,
    "pendant": "",
    "link_group_num": 0,
    "room_news": {
      "content": "",
      "ctime": "",
      "ctime_text": ""
    }
  }
}
```

</details>

## 获取直播间基本信息

> https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo

*请求方式: GET*

注: 亦可用于批量获取

<!--{
  "gh": [745]
}-->

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ----- | ---- | --- | - | - |
| req_biz | str | `web_room_componet` | 必要 | |
| room_ids | num | 直播间短ID | 不必要 | 多个重复该参数即可 |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| --- | --- | --- | --- |
| code | num | 返回值 | 0: 成功<br />-400: 请求错误 |
| message | str | 错误信息 | 默认为 0 |
| ttl | num | 1 | |
| data | obj | 信息本体 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| --- | --- | --- | --- |
| by_uids | obj | 空 |  |
| by_room_ids | obj | 直播间信息 |  |

`data`中的`by_room_ids`对象:

以直播间长ID为键, 直播间信息为值的, 按键名降序排序

`by_room_ids`中的值对象:

| 字段 | 类型 | 内容 | 备注 |
| --- | --- | --- | --- |
| room_id | num | 直播间长ID |  |
| uid | num | 主播用户mid |  |
| area_id | num | 直播间分区ID |  |
| live_status | num | 直播状态 | 0: 未开播<br />1: 直播中<br />2: 轮播中 |
| live_url | str | 直播间网页url |  |
| parent_area_id | num | 直播间父分区ID |  |
| title | str | 直播间标题 |  |
| parent_area_name | str | 直播间父分区名称 |  |
| area_name | str | 直播间分区名称 |  |
| live_time | str | 开播时间 | `yyyy-MM-dd HH:mm:ss` |
| description | str | 直播间简介 |  |
| tags | str | 直播间标签 | 以 `,` 分隔 |
| attention | num | 关注数 |  |
| online | num | 在线人数 |  |
| short_id | num | 直播间短ID | 为0是无短号 |
| uname | str | 主播用户名 |  |
| cover | str | 直播间封面url |  |
| background | str | 直播间背景url |  |
| join_slide | num | 1 |  |
| live_id | num | 0 |  |
| live_id_str | str | "0" |  |

**示例:**

```shell
curl -G 'https://api.live.bilibili.com/xlive/web-room/v1/index/getRoomBaseInfo' \
--url-query 'req_biz=web_room_componet' \
--url-query 'room_ids=1' \
--url-query 'room_ids=3
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "by_uids": {},
    "by_room_ids": {
      "23058": {
        "room_id": 23058,
        "uid": 11153765,
        "area_id": 190,
        "live_status": 0,
        "live_url": "https://live.bilibili.com/23058",
        "parent_area_id": 5,
        "title": "哔哩哔哩音悦台",
        "parent_area_name": "电台",
        "area_name": "唱见电台",
        "live_time": "0000-00-00 00:00:00",
        "description": "<p>这里是哔哩哔哩官方音乐台喔！</p><p>一起来听音乐吧ε=ε=(ノ≧∇≦)ノ</p><p>没想到蒸汽配圣诞下装，意外的很暴露呢=3=</p>\n",
        "tags": "",
        "attention": 225431,
        "online": 0,
        "short_id": 3,
        "uname": "3号直播间",
        "cover": "",
        "background": "https://i0.hdslb.com/bfs/live/2836bb7b84c792e2c6aadfd4d1cce13484775fa3.jpg",
        "join_slide": 1,
        "live_id": 0,
        "live_id_str": "0"
      },
      "5440": {
        "room_id": 5440,
        "uid": 9617619,
        "area_id": 701,
        "live_status": 2,
        "live_url": "https://live.bilibili.com/5440",
        "parent_area_id": 11,
        "title": "华为nova Flip新生之夜",
        "parent_area_name": "知识",
        "area_name": "科技·科学",
        "live_time": "0000-00-00 00:00:00",
        "description": "<p>华为novaFlip新生之夜正在直播中！备案号：Z0910417240818001<br></p>",
        "tags": "",
        "attention": 17848313,
        "online": 0,
        "short_id": 1,
        "uname": "哔哩哔哩直播",
        "cover": "http://i0.hdslb.com/bfs/live/1a862058e4211a5e73a8a1bf0635953ea08a4091.jpg",
        "background": "http://i0.hdslb.com/bfs/live/ec518ede15d4c2547c83cb59f14752450c0889b0.jpg",
        "join_slide": 1,
        "live_id": 0,
        "live_id_str": "0"
      }
    }
  }
}
```

</details>

## 批量查询直播间状态

> https://api.live.bilibili.com/room/v1/Room/get_status_info_by_uids

*请求方式：GET/POST*

认证方式：无 (无需添加Cookie)

**url参数 (GET方式)：**

| 参数名    | 类型    | 内容         | 必要性 | 备注  |
|--------|-------|------------|-----|-----|
| uids[] | array | 要查询的主播 mid | 必要  |     |

**正文参数 (POST方式)：**

| 参数名  | 类型   | 内容         | 必要性 | 备注  |
|------|------|------------|-----|-----|
| uids | nums | 要查询的主播 mid | 必要  |     |

**json回复：**

根对象：

| 字段      | 类型  | 内容   | 备注                      |
|---------|-----|------|-------------------------|
| code    | num | 返回值  | 0：成功<br />-111：csrf校验失败 |
| message | str | 错误信息 | 默认为success              |
| msg     | str | 错误信息 | 默认为success              |
| ttl     | num | 1    |                         |
| data    | obj | 信息本体 |                         |

`data`对象：

| 字段  | 类型  | 内容    | 备注         |
|-----|-----|-------|------------|
| uid | str | 直播间信息 | 实际字段为主播mid |

`uid`对象：

| 字段                  | 类型  | 内容        | 备注                           |
|---------------------|-----|-----------|------------------------------|
| title               | str | 直播间标题     |                              |
| room_id             | num | 直播间房间号    | 直播间实际房间号                     |
| uid                 | num | 主播mid     |                              |
| online              | num | 直播间在线人数   |                              |
| live_time           | num | 开播时间戳，单位秒，未开播时为0    |                              |
| live_status         | num | 直播间开播状态   | 0：未开播<br />1：正在直播<br />2：轮播中 |
| short_id            | num | 直播间房间号    | 直播间短房间号，常见于签约主播              |
| area                | num | 直播间分区id   |                              |
| area_name           | str | 直播间分区名    |                              |
| area_v2_id          | num | 直播间新版分区id |                              |
| area_v2_name        | str | 直播间新版分区名  |                              |
| area_v2_parent_id   | num | 直播间父分区id  |                              |
| area_v2_parent_name | str | 直播间父分区名   |                              |
| uname               | str | 主播用户名     |                              |
| face                | str | 主播头像url   |                              |
| tag_name            | str | 直播间标签     |                              |
| tags                | str | 直播间自定标签   |                              |
| cover_from_user     | str | 直播间封面url  |                              |
| keyframe            | str | 直播间关键帧url |                              |
| lock_till           | str | 直播间封禁信息   |                              |
| hidden_till         | str | 直播间隐藏信息   |                              |
| broadcast_type      | num | 直播类型      | 0：普通直播<br />1：手机直播          |

**示例：**

查询用户`mid=672328094`的直播间信息

```shell
# GET方式
curl -G 'https://api.live.bilibili.com/room/v1/Room/get_status_info_by_uids'
--data-urlencode 'uids[]=672328094'

# POST方式
curl 'https://api.live.bilibili.com/room/v1/Room/get_status_info_by_uids' \
-H "Content-Type: application/json" \
-d "{\"uids\": [672328094]}" 
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "msg": "success",
  "message": "success",
  "data": {
    "672328094": {
      "title": "【B限】玩个毛线",
      "room_id": 22637261,
      "uid": 672328094,
      "online": 4087370,
      "live_time": 0,
      "live_status": 2,
      "short_id": 0,
      "area": 6,
      "area_name": "生活娱乐",
      "area_v2_id": 371,
      "area_v2_name": "虚拟主播",
      "area_v2_parent_name": "虚拟主播",
      "area_v2_parent_id": 9,
      "uname": "嘉然今天吃什么",
      "face": "http://i2.hdslb.com/bfs/face/d399d6f5cf7943a996ae96999ba3e6ae2a2988de.jpg",
      "tag_name": "日常,学习,萌宠,厨艺,手机直播",
      "tags": "",
      "cover_from_user": "http://i0.hdslb.com/bfs/live/new_room_cover/f3ed7a782c13086e536ec8bc6e9593bb4918f905.jpg",
      "keyframe": "http://i0.hdslb.com/bfs/live-key-frame/keyframe041722000000226372619dr3m8.jpg",
      "lock_till": "0000-00-00 00:00:00",
      "hidden_till": "0000-00-00 00:00:00",
      "broadcast_type": 0
    }
  }
}
```

</details>

## 获取直播间最近历史弹幕

> https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory

<!--{
  "from": {
    "url": "https://www.bilibili.com/read/cv8186413/"
  }
}-->

*请求方式: GET*

注: 该接口部分返回信息不明, 仅供参考, 来源 [cv8186413](https://www.bilibili.com/read/cv8186413/)

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ----- | ---- | --- | - | - |
| roomid | num | 直播间短ID | 必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| --- | --- | --- | --- |
| code | num | 返回值 | 0: 成功<br />-400: 请求错误 |
| message | str | 错误信息 | 默认为空 |
| msg | str | 空 | 仅请求成功时存在 |
| ttl | num | 1 | 仅请求失败时存在 |
| data | obj | 信息本体 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| --- | --- | --- | --- |
| admin | array | 管理员最新的10条弹幕消息 | 格式与`room`相同 |
| room | array | 普通用户的10条弹幕信息 | 格式与`admin`相同 |

`data`中的任意数组中的对象:

| 字段 | 类型 | 内容 | 备注 |
| --- | --- | --- | --- |
| text | str | 弹幕内容 | |
| dm_type | num | 弹幕类型 | |
| uid | num | 弹幕发送者的UID | |
| nickname | str | 弹幕发送者的昵称 | |
| uname_color | str | 弹幕发送者的昵称颜色? | |
| timeline | str | 弹幕发送时间 | 格式为`yyyy-MM-dd HH:mm:ss` |
| isadmin | num | 是否为管理员 | |
| vip | num | 是否为VIP? ||
| svip | num | 是否为SVIP? ||
| medal | array | 粉丝勋章信息? | 格式不明 |
| title | array | 标题? | 格式不明 |
| user_level | array | 用户等级信息? | 格式不明 |
| rank | num | 排名? | [用户空间详细信息](../user/info.md#获取用户详细信息) |
| teamid | num |  | |
| rnd | str | 随机数种子? |  |
| user_title | str | 用户头衔? |格式不明|
| guard_level |  | 大航海等级？ | |
| bubble |  | | |
| bubble_color |  | | |
| lpl |  | | |
| yeah_space_url |  | | |
| jump_to_url |  | | |
| check_info | obj | 弹幕审核信息? |  |
| voice_dm_info | obj | 语音弹幕信息? |  |
| emoticon | obj | 房间独有表情信息 |  |
| emots | obj | 默认表情信息 | 结构为`表情名-信息`组成的键值对<br />如果信息不含默认表情，则返回 null |
| id_str | str | 弹幕ID? |  |
| wealth_level | num | 财富等级? |  |
| bubble_id_v2 | num |  |  |
| reply | obj | 回复的弹幕 |  |
| group_medal | null |  |  |
| user | obj | 该用户信息 ||

`data`对象中的`emoticon`对象:

| 字段            | 类型 | 内容                     | 备注                         |
| --------------- | ---- | ------------------------ | ---------------------------- |
| id              | num  | 0                        |                              |
| emoticon_unique | str  | 表情的独特标识           | 格式为`room_房间号_表情id`   |
| text            | text | 表情的触发词             |                              |
| perm            | num  | 发送权限？               | 1：所有人都可发送            |
| url             | str  | 表情的图像链接           |                              |
| in_player_area  | num  | 是否显示在直播画面区域？ |                              |
| bulge_display   | num  | 是否高亮显示？           |                              |
| is_dynamic      | num  | 是否为动态表情           | 0：静态图像<br />1：动态图像 |
| height          | num  | 表情的高度               |                              |
| width           | num  | 表情的宽度               |                              |

`data`对象中的`emots`对象中的任意一个值对象:

| 字段           | 类型 | 内容             | 备注                      |
| -------------- | ---- | ---------------- | ------------------------- |
| count          | num  | 重复发送数量     |                           |
| descript       | str  | 表情描述         |                           |
| emoji          | str  | 表情描述         |                           |
| emotion_id     | num  | 表情 id          |                           |
| emotion_unique | str  | 表情的独特标识符 | 格式可能为`emoji_表情 id` |
| height         | num  | 表情的宽度       |                           |
| url            | str  | 表情的图像链接   |                           |
| width          | num  | 表情的高度       |                           |

`data`对象中的`user`对象:

| 字段 | 类型 | 内容 | 备注 |
| - | - | --- | --- |
| uid | num | 用户 mid ||
| base | obj | 用户基本信息 ||
| medal | null | ||
| wealth | null | ||
| title | obj | 用户标题? ||
| guard | null | ||
| uhead_frame | null | ||
| guard_leader | obj |  |  |

`data`对象中的`user`对象中的`base`对象:

| 字段 | 类型 | 内容 | 备注 |
| - | - | --- | --- |
| name | str | 用户名 ||
| face | str | 用户头像 url ||
| name_color | num | 用户名颜色? ||
| is_mystery | bool | 是否为神秘用户? ||
| risk_ctrl_info | null |  |  |
| origin_info | obj | 原始信息? |  |
| official_info | obj | 认证信息 |  |
| name_color_str | str |  |  |

**示例:**

```shell
curl -G 'https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory' \
--url-query 'roomid=1'
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "data": {
    "admin": [],
    "room": [
      {
        "text": "‫",
        "dm_type": 0,
        "uid": 20276964,
        "nickname": "咸菜拉面",
        "uname_color": "",
        "timeline": "2024-08-15 05:05:06",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [
          27,
          "小孩梓",
          "阿梓从小就很可爱",
          80397,
          398668,
          "",
          0,
          6809855,
          398668,
          6850801,
          3,
          1,
          7706705
        ],
        "title": [
          "title-86-1",
          "title-86-1"
        ],
        "user_level": [
          59,
          0,
          16752445,
          931
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723669505",
        "user_title": "title-86-1",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723669506,
          "ct": "18434F3D"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "74368f428dfaec806cd205e62866bd1c45",
        "wealth_level": 37,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 20276964,
          "base": {
            "name": "咸菜拉面",
            "face": "https://i0.hdslb.com/bfs/face/182b73f6b6274fcee7491219f511b1748c4bc712.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "咸菜拉面",
              "face": "https://i0.hdslb.com/bfs/face/182b73f6b6274fcee7491219f511b1748c4bc712.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": {
            "name": "小孩梓",
            "level": 27,
            "color_start": 398668,
            "color_end": 6850801,
            "color_border": 6809855,
            "color": 398668,
            "id": 13139,
            "typ": 0,
            "is_light": 1,
            "ruid": 7706705,
            "guard_level": 3,
            "score": 50112778,
            "guard_icon": "https://i0.hdslb.com/bfs/live/143f5ec3003b4080d1b5f817a9efdca46d631945.png",
            "honor_icon": "",
            "v2_medal_color_start": "#4775EFCC",
            "v2_medal_color_end": "#4775EFCC",
            "v2_medal_color_border": "#58A1F8FF",
            "v2_medal_color_text": "#FFFFFFFF",
            "v2_medal_color_level": "#000B7099",
            "user_receive_count": 0
          },
          "wealth": null,
          "title": {
            "old_title_css_id": "title-86-1",
            "title_css_id": "title-86-1"
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "‫",
        "dm_type": 0,
        "uid": 20276964,
        "nickname": "咸菜拉面",
        "uname_color": "",
        "timeline": "2024-08-16 05:05:06",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [
          27,
          "小孩梓",
          "阿梓从小就很可爱",
          80397,
          398668,
          "",
          0,
          6809855,
          398668,
          6850801,
          3,
          1,
          7706705
        ],
        "title": [
          "title-86-1",
          "title-86-1"
        ],
        "user_level": [
          59,
          0,
          16752445,
          931
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723755905",
        "user_title": "title-86-1",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723755906,
          "ct": "F65D229F"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "7f3bb90826ad642012a31368f266be6d2",
        "wealth_level": 37,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 20276964,
          "base": {
            "name": "咸菜拉面",
            "face": "https://i0.hdslb.com/bfs/face/182b73f6b6274fcee7491219f511b1748c4bc712.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "咸菜拉面",
              "face": "https://i0.hdslb.com/bfs/face/182b73f6b6274fcee7491219f511b1748c4bc712.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": {
            "name": "小孩梓",
            "level": 27,
            "color_start": 398668,
            "color_end": 6850801,
            "color_border": 6809855,
            "color": 398668,
            "id": 13139,
            "typ": 0,
            "is_light": 1,
            "ruid": 7706705,
            "guard_level": 3,
            "score": 50112778,
            "guard_icon": "https://i0.hdslb.com/bfs/live/143f5ec3003b4080d1b5f817a9efdca46d631945.png",
            "honor_icon": "",
            "v2_medal_color_start": "#4775EFCC",
            "v2_medal_color_end": "#4775EFCC",
            "v2_medal_color_border": "#58A1F8FF",
            "v2_medal_color_text": "#FFFFFFFF",
            "v2_medal_color_level": "#000B7099",
            "user_receive_count": 0
          },
          "wealth": null,
          "title": {
            "old_title_css_id": "title-86-1",
            "title_css_id": "title-86-1"
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "好帅",
        "dm_type": 0,
        "uid": 3546708493469870,
        "nickname": "aodun1",
        "uname_color": "",
        "timeline": "2024-08-16 22:33:28",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [],
        "title": [
          "",
          ""
        ],
        "user_level": [
          0,
          0,
          9868950,
          ">50000"
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723811729",
        "user_title": "",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723818808,
          "ct": "1B75FB"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "088336a59eb277942ee353dd6666bf6347",
        "wealth_level": 0,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 3546708493469870,
          "base": {
            "name": "aodun1",
            "face": "https://i2.hdslb.com/bfs/face/6fb05f895d854e68419d45eef2c2e272b04ad25f.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "aodun1",
              "face": "https://i2.hdslb.com/bfs/face/6fb05f895d854e68419d45eef2c2e272b04ad25f.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": null,
          "wealth": null,
          "title": {
            "old_title_css_id": "",
            "title_css_id": ""
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "好帅",
        "dm_type": 0,
        "uid": 3546708493469870,
        "nickname": "aodun1",
        "uname_color": "",
        "timeline": "2024-08-16 22:35:16",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [],
        "title": [
          "",
          ""
        ],
        "user_level": [
          0,
          0,
          9868950,
          ">50000"
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723811729",
        "user_title": "",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723818916,
          "ct": "D6ABF2E7"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "6f421255746f5d8e4731fdadac66bf6356",
        "wealth_level": 0,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 3546708493469870,
          "base": {
            "name": "aodun1",
            "face": "https://i2.hdslb.com/bfs/face/6fb05f895d854e68419d45eef2c2e272b04ad25f.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "aodun1",
              "face": "https://i2.hdslb.com/bfs/face/6fb05f895d854e68419d45eef2c2e272b04ad25f.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": null,
          "wealth": null,
          "title": {
            "old_title_css_id": "",
            "title_css_id": ""
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "好帅",
        "dm_type": 0,
        "uid": 3546708493469870,
        "nickname": "aodun1",
        "uname_color": "",
        "timeline": "2024-08-16 22:36:51",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [],
        "title": [
          "",
          ""
        ],
        "user_level": [
          0,
          0,
          9868950,
          ">50000"
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723811729",
        "user_title": "",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723819011,
          "ct": "1B6978C1"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "270f5a2ac69c5904617873cc4666bf640",
        "wealth_level": 0,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 3546708493469870,
          "base": {
            "name": "aodun1",
            "face": "https://i2.hdslb.com/bfs/face/6fb05f895d854e68419d45eef2c2e272b04ad25f.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "aodun1",
              "face": "https://i2.hdslb.com/bfs/face/6fb05f895d854e68419d45eef2c2e272b04ad25f.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": null,
          "wealth": null,
          "title": {
            "old_title_css_id": "",
            "title_css_id": ""
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "好帅",
        "dm_type": 0,
        "uid": 3546708493469870,
        "nickname": "aodun1",
        "uname_color": "",
        "timeline": "2024-08-16 22:39:01",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [],
        "title": [
          "",
          ""
        ],
        "user_level": [
          0,
          0,
          9868950,
          ">50000"
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723811729",
        "user_title": "",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723819141,
          "ct": "143613AF"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "002ebbdc402b3d625052865f7b66bf6469",
        "wealth_level": 0,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 3546708493469870,
          "base": {
            "name": "aodun1",
            "face": "https://i2.hdslb.com/bfs/face/6fb05f895d854e68419d45eef2c2e272b04ad25f.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "aodun1",
              "face": "https://i2.hdslb.com/bfs/face/6fb05f895d854e68419d45eef2c2e272b04ad25f.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": null,
          "wealth": null,
          "title": {
            "old_title_css_id": "",
            "title_css_id": ""
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "赚麻了 哈哈",
        "dm_type": 0,
        "uid": 243082910,
        "nickname": "可人的樱花",
        "uname_color": "",
        "timeline": "2024-08-17 01:00:49",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [],
        "title": [
          "",
          ""
        ],
        "user_level": [
          0,
          0,
          9868950,
          ">50000"
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723379161",
        "user_title": "",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723827649,
          "ct": "3917D4D7"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "03f3261e144366383c49c6b5d166bf8563",
        "wealth_level": 7,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 243082910,
          "base": {
            "name": "可人的樱花",
            "face": "http://i2.hdslb.com/bfs/face/5faa9bef952f831236b740932c559476658f88e5.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "可人的樱花",
              "face": "http://i2.hdslb.com/bfs/face/5faa9bef952f831236b740932c559476658f88e5.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": null,
          "wealth": null,
          "title": {
            "old_title_css_id": "",
            "title_css_id": ""
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "‫",
        "dm_type": 0,
        "uid": 20276964,
        "nickname": "咸菜拉面",
        "uname_color": "",
        "timeline": "2024-08-17 05:05:07",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [
          27,
          "小孩梓",
          "阿梓从小就很可爱",
          80397,
          398668,
          "",
          0,
          6809855,
          398668,
          6850801,
          3,
          1,
          7706705
        ],
        "title": [
          "title-86-1",
          "title-86-1"
        ],
        "user_level": [
          59,
          0,
          16752445,
          931
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723842307",
        "user_title": "title-86-1",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723842307,
          "ct": "8B947ABC"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "1a928b968afaa7825ea506ffe566bfbf16",
        "wealth_level": 37,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 20276964,
          "base": {
            "name": "咸菜拉面",
            "face": "https://i0.hdslb.com/bfs/face/182b73f6b6274fcee7491219f511b1748c4bc712.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "咸菜拉面",
              "face": "https://i0.hdslb.com/bfs/face/182b73f6b6274fcee7491219f511b1748c4bc712.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": {
            "name": "小孩梓",
            "level": 27,
            "color_start": 398668,
            "color_end": 6850801,
            "color_border": 6809855,
            "color": 398668,
            "id": 13139,
            "typ": 0,
            "is_light": 1,
            "ruid": 7706705,
            "guard_level": 3,
            "score": 50112778,
            "guard_icon": "https://i0.hdslb.com/bfs/live/143f5ec3003b4080d1b5f817a9efdca46d631945.png",
            "honor_icon": "",
            "v2_medal_color_start": "#4775EFCC",
            "v2_medal_color_end": "#4775EFCC",
            "v2_medal_color_border": "#58A1F8FF",
            "v2_medal_color_text": "#FFFFFFFF",
            "v2_medal_color_level": "#000B7099",
            "user_receive_count": 0
          },
          "wealth": null,
          "title": {
            "old_title_css_id": "title-86-1",
            "title_css_id": "title-86-1"
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "下播啦~ 感谢大家的陪伴~ 下次见哦~",
        "dm_type": 0,
        "uid": 3546614675278489,
        "nickname": "机器人管家_鱼",
        "uname_color": "",
        "timeline": "2024-08-18 00:07:36",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [
          21,
          "赴神明",
          "Mr_钟明",
          27751673,
          1725515,
          "",
          0,
          12632256,
          12632256,
          12632256,
          0,
          0,
          3493291261692485
        ],
        "title": [
          "",
          ""
        ],
        "user_level": [
          11,
          0,
          6406234,
          ">50000"
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723910862",
        "user_title": "",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723910856,
          "ct": "9BD05026"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "2ee6101973eeb69931eb86ac7e66c0ca17",
        "wealth_level": 23,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 3546614675278489,
          "base": {
            "name": "机器人管家_鱼",
            "face": "https://i1.hdslb.com/bfs/face/de737cd746a96742c07ced6c213aa25cf0429d90.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "机器人管家_鱼",
              "face": "https://i1.hdslb.com/bfs/face/de737cd746a96742c07ced6c213aa25cf0429d90.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": {
            "name": "赴神明",
            "level": 21,
            "color_start": 12632256,
            "color_end": 12632256,
            "color_border": 12632256,
            "color": 1725515,
            "id": 1231122,
            "typ": 0,
            "is_light": 0,
            "ruid": 3493291261692485,
            "guard_level": 0,
            "score": 50001573,
            "guard_icon": "",
            "honor_icon": "",
            "v2_medal_color_start": "#919298CC",
            "v2_medal_color_end": "#919298CC",
            "v2_medal_color_border": "#919298CC",
            "v2_medal_color_text": "#FFFFFFFF",
            "v2_medal_color_level": "#6C6C7299",
            "user_receive_count": 0
          },
          "wealth": null,
          "title": {
            "old_title_css_id": "",
            "title_css_id": ""
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      },
      {
        "text": "‫",
        "dm_type": 0,
        "uid": 20276964,
        "nickname": "咸菜拉面",
        "uname_color": "",
        "timeline": "2024-08-18 05:05:05",
        "isadmin": 0,
        "vip": 0,
        "svip": 0,
        "medal": [
          27,
          "小孩梓",
          "阿梓从小就很可爱",
          80397,
          398668,
          "",
          0,
          6809855,
          398668,
          6850801,
          3,
          1,
          7706705
        ],
        "title": [
          "title-86-1",
          "title-86-1"
        ],
        "user_level": [
          59,
          0,
          16752445,
          931
        ],
        "rank": 10000,
        "teamid": 0,
        "rnd": "1723928706",
        "user_title": "title-86-1",
        "guard_level": 0,
        "bubble": 0,
        "bubble_color": "",
        "lpl": 0,
        "yeah_space_url": "",
        "jump_to_url": "",
        "check_info": {
          "ts": 1723928705,
          "ct": "8A379FF4"
        },
        "voice_dm_info": {
          "voice_url": "",
          "file_format": "",
          "text": "",
          "file_duration": 0,
          "file_id": ""
        },
        "emoticon": {
          "id": 0,
          "emoticon_unique": "",
          "text": "",
          "perm": 0,
          "url": "",
          "in_player_area": 0,
          "bulge_display": 0,
          "is_dynamic": 0,
          "height": 0,
          "width": 0
        },
        "emots": null,
        "id_str": "41e8b55dea381d494cfe60ba3466c11064",
        "wealth_level": 37,
        "bubble_id_v2": 0,
        "reply": {
          "show_reply": true,
          "reply_mid": 0,
          "reply_uname": "",
          "reply_uname_color": "",
          "reply_is_mystery": false
        },
        "group_medal": null,
        "user": {
          "uid": 20276964,
          "base": {
            "name": "咸菜拉面",
            "face": "https://i0.hdslb.com/bfs/face/182b73f6b6274fcee7491219f511b1748c4bc712.jpg",
            "name_color": 0,
            "is_mystery": false,
            "risk_ctrl_info": null,
            "origin_info": {
              "name": "咸菜拉面",
              "face": "https://i0.hdslb.com/bfs/face/182b73f6b6274fcee7491219f511b1748c4bc712.jpg"
            },
            "official_info": {
              "role": 0,
              "title": "",
              "desc": "",
              "type": -1
            },
            "name_color_str": ""
          },
          "medal": {
            "name": "小孩梓",
            "level": 27,
            "color_start": 398668,
            "color_end": 6850801,
            "color_border": 6809855,
            "color": 398668,
            "id": 13139,
            "typ": 0,
            "is_light": 1,
            "ruid": 7706705,
            "guard_level": 3,
            "score": 50112778,
            "guard_icon": "https://i0.hdslb.com/bfs/live/143f5ec3003b4080d1b5f817a9efdca46d631945.png",
            "honor_icon": "",
            "v2_medal_color_start": "#4775EFCC",
            "v2_medal_color_end": "#4775EFCC",
            "v2_medal_color_border": "#58A1F8FF",
            "v2_medal_color_text": "#FFFFFFFF",
            "v2_medal_color_level": "#000B7099",
            "user_receive_count": 0
          },
          "wealth": null,
          "title": {
            "old_title_css_id": "title-86-1",
            "title_css_id": "title-86-1"
          },
          "guard": null,
          "uhead_frame": null,
          "guard_leader": {
            "is_guard_leader": false
          }
        }
      }
    ]
  },
  "message": "",
  "msg": ""
}
```

</details>

## 清晰度代码

| 代码    | 说明  |
|-------|-----|
| 30000 | 杜比  |
| 20000 | 4K  |
| 10000 | 原画  |
| 400   | 蓝光  |
| 250   | 超清  |
| 150   | 高清  |
| 80    | 流畅  |

## 获取直播间信息

> https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo

*请求方式：GET*

认证方式：无 (无需添加Cookie)

**url参数 (GET方式)：**

| 参数名      | 类型  | 内容    | 必填  | 备注                                             |
|----------|-----|-------|-----|------------------------------------------------|
| room_id  | num | 直播间id | 必要  |                                                |
| protocol | str | 直播协议  | 必要  | 0：http_stream<br/>1：http_hls<br/>可多选, 使用英文逗号分隔 |
| format   | str | 格式    | 必要  | 0：flv<br/>1：ts<br/>2：fmp4<br/>可多选, 使用英文逗号分隔    |
| codec    | str | 编码格式  | 必要  | 0：AVC<br/>1：HEVC<br/>可多选, 使用英文逗号分隔             |
| qn       | num | 清晰度编码 |     | 默认`150`<br/>[清晰度代码](#清晰度代码)                    |
| platform | str | `web` |     |                                                |
| ptype    | num | `8`   |     |                                                |
| dolby    | num | `5`   |     |                                                |
| panorama | num | `1`   |     |                                                |
| only_audio | num | 是否为音频流 | 非必要 | 默认为视频流，`1` 为音频流               |

**json回复：**

根对象：

| 字段名     | 类型  | 内容   | 备注                    |
|---------|-----|------|-----------------------|
| code    | num | 响应码  | 0：成功<br/>1002002：参数错误 |
| message | str | 0    |                       |
| ttl     | num | 1    |                       |
| data    | obj | 信息本体 |                       |

`data`对象：

| 字段名               | 类型    | 内容        | 备注                        |
|-------------------|-------|-----------|---------------------------|
| room_id           | num   | 直播间id     |                           |
| short_id          | num   | 直播间短id    |                           |
| uid               | num   | 主播uid     |                           |
| is_hidden         | bool  | 直播间是否被隐藏  |                           |
| is_locked         | bool  | 直播间是否被锁定  |                           |
| is_portrait       | bool  | 是否竖屏      |                           |
| live_status       | num   | 直播状态      | 0：未开播<br/>1：直播中<br/>2：轮播中 |
| hidden_till       | num   | 隐藏结束时间    |                           |
| lock_till         | num   | 封禁结束时间    | 秒级时间戳                     |
| encrypted         | bool  | 直播间为加密直播间 |                           |
| pwd_verified      | bool  | 是否通过密码验证  | 当`encrypted`为`true`时才有意义  |
| live_time         | num   | 本次开播时间    | 秒级时间戳                     |
| room_shield       | num   |           |                           |
| all_special_types | array |           |                           |
| playurl_info      | obj   | 直播流信息     |                           |
| official_type     | num   | 官方直播间类型   |                           |
| official_room_id  | num   | 官方直播间id    |                           |
| risk_with_delay   | num   | 延迟风险值     |                           |
| multi_screen_info | str   | 多屏信息      |                           |
| pure_control_function | null | 纯控制功能 |                           |
| degraded_playurl  | null  | 降级播放地址    |                           |
| subtitle_cfg      | null  | 字幕配置      |                           |
| relay_room_id     | num   | 中继房间id    |                           |

`playurl_info`对象

| 字段名       | 类型  | 内容  | 备注  |
|-----------|-----|-----|-----|
| conf_json | str |     |     |
| playurl   | obj |     |     |
| expected_quality | obj | 期望清晰度 |     |
| qn_desc_more_ab | num | 清晰度描述AB测试 |     |

`playurl`对象

| 字段名       | 类型    | 内容    | 备注  |
|-----------|-------|-------|-----|
| cid       | num   | 直播间id |     |
| g_qn_desc | array | 清晰度列表 |     |
| stream    | array | 直播流信息 |     |
| p2p_data  | obj   |       |     |
| dolby_qn  |       |       |     |
| hot       | bool  |       |     |
| hdr_metadata_degrade_desc | obj | HDR元数据降级描述 |     |

`expected_quality`对象

| 字段名 | 类型 | 内容 | 备注 |
| ------ | ---- | ---- | ---- |
| qn | num | 期望清晰度代码 | |
| hdr_type | num | 期望HDR类型 | |

`g_qn_desc`数组中的对象

| 字段名       | 类型  | 内容    | 备注              |
|-----------|-----|-------|-----------------|
| qn        | num | 清晰度代码 | [清晰度代码](#清晰度代码) |
| desc      | str | 清晰度描述 |                 |
| hdr_desc  | str |       |                 |
| attr_desc |     |       |                 |

`stream`数组中的对象

| 字段名           | 类型    | 内容   | 备注  |
|---------------|-------|------|-----|
| protocol_name | str   | 协议名  |     |
| format        | array | 格式列表 |     |

`format`数组中的对象

| 字段名         | 类型    | 内容   | 备注  |
|-------------|-------|------|-----|
| format_name | str   | 格式名  |     |
| codec       | array | 编码列表 |     |

`codec`数组中的对象

| 字段名        | 类型    | 内容        | 备注              |
|------------|-------|-----------|-----------------|
| codec_name | str   | 编码名       |                 |
| current_qn | num   | 当前清晰度编码   | [清晰度代码](#清晰度代码) |
| accept_qn  | array | 可用清晰度编码列表 | [清晰度代码](#清晰度代码) |
| base_url   | str   | 播放源路径     |                 |
| url_info   | array | 域名信息列表    |                 |
| hdr_qn     | null  |           |                 |
| dolby_type | num   |           |                 |
| attr_name  | str   |           |                 |

`url_info`数组中的对象

| 字段名        | 类型  | 内容    | 备注  |
|------------|-----|-------|-----|
| host       | str | 域名    |     |
| extra      | str | URL参数 |     |
| stream_ttl | num |       |     |

`p2p_data`对象

| 字段名       | 类型   | 内容  | 备注  |
|-----------|------|-----|-----|
| p2p       | bool |     |     |
| p2p_type  | num  |     |     |
| m_p2p     | bool |     |     |
| m_servers | null |     |     |

**示例：**

查询`room_id=3`的直播间信息

```shell
curl -L -X GET 'https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo?room_id=3&protocol=0,1&format=0,1,2&codec=0,1&qn=10000'
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "room_id": 23058,
    "short_id": 3,
    "uid": 11153765,
    "is_hidden": false,
    "is_locked": false,
    "is_portrait": false,
    "live_status": 1,
    "hidden_till": 0,
    "lock_till": 0,
    "encrypted": false,
    "pwd_verified": true,
    "live_time": 1671425336,
    "room_shield": 1,
    "all_special_types": [],
    "playurl_info": {
      "conf_json": "{\"cdn_rate\":10000,\"report_interval_sec\":150}",
      "playurl": {
        "cid": 23058,
        "g_qn_desc": [
          {
            "qn": 30000,
            "desc": "杜比",
            "hdr_desc": "",
            "attr_desc": null
          },
          {
            "qn": 20000,
            "desc": "4K",
            "hdr_desc": "",
            "attr_desc": null
          },
          {
            "qn": 10000,
            "desc": "原画",
            "hdr_desc": "",
            "attr_desc": null
          },
          {
            "qn": 400,
            "desc": "蓝光",
            "hdr_desc": "HDR",
            "attr_desc": null
          },
          {
            "qn": 250,
            "desc": "超清",
            "hdr_desc": "HDR",
            "attr_desc": null
          },
          {
            "qn": 150,
            "desc": "高清",
            "hdr_desc": "",
            "attr_desc": null
          },
          {
            "qn": 80,
            "desc": "流畅",
            "hdr_desc": "",
            "attr_desc": null
          }
        ],
        "stream": [
          {
            "protocol_name": "http_stream",
            "format": [
              {
                "format_name": "flv",
                "codec": [
                  {
                    "codec_name": "avc",
                    "current_qn": 10000,
                    "accept_qn": [
                      10000,
                      150
                    ],
                    "base_url": "/live-bvc/462997/live_11153765_9369560.flv?",
                    "url_info": [
                      {
                        "host": "https://cn-hbcd-cu-02-20.bilivideo.com",
                        "extra": "expires=1674103815&pt=web&deadline=1674103815&len=0&oi=1963941079&platform=web&qn=10000&trid=1000061f434c07ac4f4184820bfb141e75e8&uipk=100&uipv=100&nbs=1&uparams=cdn,deadline,len,oi,platform,qn,trid,uipk,uipv,nbs&cdn=cn-gotcha01&upsig=f494aa9e92e24943061fe5082494ec44&sk=33541455720f64c7671bc1480acfb176&p2p_type=1&src=57345&sl=1&free_type=0&sid=cn-hbcd-cu-02-20&chash=1&sche=ban&score=12&pp=rtmp&machinezone=jd&source=onetier&trace=0&site=92e80b6f3ebfd393e7d1c1e2e648d9c1&order=1",
                        "stream_ttl": 3600
                      }
                    ],
                    "hdr_qn": null,
                    "dolby_type": 0,
                    "attr_name": ""
                  }
                ]
              }
            ]
          },
          {
            "protocol_name": "http_hls",
            "format": [
              {
                "format_name": "ts",
                "codec": [
                  {
                    "codec_name": "avc",
                    "current_qn": 10000,
                    "accept_qn": [
                      10000,
                      150
                    ],
                    "base_url": "/live-bvc/462997/live_11153765_9369560.m3u8?",
                    "url_info": [
                      {
                        "host": "https://cn-hbcd-cu-02-20.bilivideo.com",
                        "extra": "expires=1674103815&len=0&oi=1963941079&pt=web&qn=10000&trid=1003061f434c07ac4f4184820bfb141e75e8&sigparams=cdn,expires,len,oi,pt,qn,trid&cdn=cn-gotcha01&sign=4f9bcec18e3afdca04b31ffb285ec915&sk=33541455720f64c7671bc1480acfb176&p2p_type=1&src=57345&sl=1&free_type=0&sid=cn-hbcd-cu-02-20&chash=1&sche=ban&score=12&pp=rtmp&machinezone=jd&source=onetier&trace=0&site=92e80b6f3ebfd393e7d1c1e2e648d9c1&order=1",
                        "stream_ttl": 3600
                      }
                    ],
                    "hdr_qn": null,
                    "dolby_type": 0,
                    "attr_name": ""
                  }
                ]
              },
              {
                "format_name": "fmp4",
                "codec": [
                  {
                    "codec_name": "avc",
                    "current_qn": 10000,
                    "accept_qn": [
                      10000,
                      150
                    ],
                    "base_url": "/live-bvc/462997/live_11153765_9369560/index.m3u8?",
                    "url_info": [
                      {
                        "host": "https://cn-hbcd-cu-02-20.bilivideo.com",
                        "extra": "expires=1674103815&len=0&oi=1963941079&pt=web&qn=10000&trid=1007061f434c07ac4f4184820bfb141e75e8&sigparams=cdn,expires,len,oi,pt,qn,trid&cdn=cn-gotcha01&sign=cc57dce528316d8389f2f34e7bd15f5c&sk=a99391b8b4d5779b2e32e41dbc989d2d&flvsk=33541455720f64c7671bc1480acfb176&p2p_type=1&src=57345&sl=1&free_type=0&sid=cn-hbcd-cu-02-20&chash=1&sche=ban&bvchls=1&score=12&pp=rtmp&machinezone=jd&source=onetier&trace=0&site=92e80b6f3ebfd393e7d1c1e2e648d9c1&order=1",
                        "stream_ttl": 3600
                      },
                      {
                        "host": "https://c1--cn-gotcha208.bilivideo.com",
                        "extra": "expires=1674103815&len=0&oi=1963941079&pt=web&qn=10000&trid=1007061f434c07ac4f4184820bfb141e75e8&sigparams=cdn,expires,len,oi,pt,qn,trid&cdn=cn-gotcha208&sign=2ff96adf5056c8dbee546955260fc2df&sk=a99391b8b4d5779b2e32e41dbc989d2d&p2p_type=1&src=57345&sl=1&free_type=0&pp=rtmp&machinezone=jd&source=onetier&trace=0&site=92e80b6f3ebfd393e7d1c1e2e648d9c1&order=2",
                        "stream_ttl": 3600
                      }
                    ],
                    "hdr_qn": null,
                    "dolby_type": 0,
                    "attr_name": ""
                  }
                ]
              }
            ]
          }
        ],
        "p2p_data": {
          "p2p": true,
          "p2p_type": 1,
          "m_p2p": false,
          "m_servers": null
        },
        "dolby_qn": null
      }
    }
  }
}
```

</details>





## 获取直播间主播信息

> https://api.live.bilibili.com/live_user/v1/UserInfo/get_anchor_in_room

*请求方式: GET*

**URL参数：**

| 参数名     | 类型  | 内容   | 必要性 | 备注    |
|---------|-----|------|-----|-------|
| roomid | num | 直播间号 | 必要  | 可以为短号 |


**json回复：**


根对象：

| 字段      | 类型  | 内容   | 备注              |
|---------|-----|------|-----------------|
| code    | num | 返回值  | 0：成功 （直播间不存在也为0） |
| message | str | 错误信息 |                 |
| msg     | str | 错误信息 |                 |
| data    | obj | 信息本体 |                  |



`data`对象：

| 字段                      | 类型        | 内容     | 备注                          |
|-------------------------|-----------|--------|-----------------------------|
| info                     | obj       | 主播信息  |                     |
| level                 | obj       | 直播等级  |                         |
| san                | num       | 主播san值  |       12满分              |


`info`对象:


| 字段              | 类型 | 内容             | 备注     |
|-------------------|------|------------------|----------|
| uid               | num  | 主播mid          |          |
| uname             | str  | 主播用户名          |          |
| face              | str  | 主播头像URL      |          |
| rank              | str  | 主播排名         |          |
| platform_user_level | num  | 平台用户等级     |          |
| mobile_verify     | num  | 手机验证状态     |          |
| identification    | num  | 身份认证状态     |          |
| official_verify   | obj  | 认证信息         |          |
| vip_type          | num  | VIP类型          |          |
| gender            | num  | 主播性别         |     -1：保密<br />0：女<br />1：男     |


`info`中的`official_verify`对象:

| 字段 | 类型 | 内容             | 备注     |
|------|------|----------|-----|
| type | num | 主播认证类型 | -1：无<br />0：个人认证<br />1：机构认证 |
| desc | str | 主播认证信息 |                              |
| role | num  | 未知       |       |

`level`对象:



| 字段         | 类型 |  内容           | 备注     |
|--------------|------|------------------|----------|
| uid          | num  | 用户ID           |          |
| cost         | num  | 消费金额         |          |
| rcost        | num  | 充值金额         |          |
| user_score   | str  | 用户积分         |          |
| vip          | num  | VIP状态          |          |
| vip_time     | str  | VIP到期时间      |          |
| svip         | num  | SVIP状态         |          |
| svip_time    | str  | SVIP到期时间     |          |
| update_time  | str  | 更新时间         |          |
| master_level | obj  | 主播等级     |          |
| user_level   | num  | 用户等级         |          |
| color        | num  | 颜色值           |          |
| anchor_score | num  | 主播积分        |          |



`level` 中的 `master_level`对象:

| 字段              | 类型 | 内容        | 备注     |
|-------------------|------|------------------|----------|
| level             | num  | 主播等级             |          |
| color             | num  | 颜色值           |          |
| current           | list | 当前积分     |          |
| next              | list | 下一等级积分  |          |
| anchor_score      | num  | 主播积分          |          |
| upgrade_score     | num  | 升级积分          |          |
| master_level_color | num  | 主播等级颜色值   |          |
| sort              | str  | 排名             |          |


**示例：**

查询`roomid=1`的直播间主播信息

```shell
curl -G 'https://api.live.bilibili.com/live_user/v1/UserInfo/get_anchor_in_room' \
--data-urlencode 'roomid=1'
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "msg": "success",
  "message": "success",
  "data": {
    "info": {
      "uid": 9617619,
      "uname": "哔哩哔哩直播",
      "face": "https://i0.hdslb.com/bfs/face/8f6a614a48a3813d90da7a11894ae56a59396fcd.jpg",
      "rank": "10000",
      "platform_user_level": 6,
      "mobile_verify": 1,
      "identification": 1,
      "official_verify": {
        "type": 1,
        "desc": "哔哩哔哩直播官方账号",
        "role": 3
      },
      "vip_type": 2,
      "gender": -1
    },
    "level": {
      "uid": 9617619,
      "cost": 7782673656,
      "rcost": 20199200291,
      "user_score": "0",
      "vip": 0,
      "vip_time": "0000-00-00 00:00:00",
      "svip": 0,
      "svip_time": "0000-00-00 00:00:00",
      "update_time": "2024-08-08 17:13:12",
      "master_level": {
        "level": 40,
        "color": 16746162,
        "current": [0, 147013810],
        "next": [0, 147013810],
        "anchor_score": 201992002,
        "upgrade_score": 0,
        "master_level_color": 16746162,
        "sort": "\u003E10000"
      },
      "user_level": 60,
      "color": 16752445,
      "anchor_score": 201992002
    },
    "san": 12
  }
}
```

</details>
