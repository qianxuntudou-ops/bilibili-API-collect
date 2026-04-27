## 获取直播间内礼物

> https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/roomGiftList

*请求方式：GET*

认证方式：无 (无需添加Cookie)

**url参数：**

| 参数名         | 类型 | 内容       | 必要性 | 备注                             |
| -------------- | ---- | ---------- | ------ | -------------------------------- |
| platform       | str  | web        | 必要   |                                  |
| room_id        | num  | 主播房间号 | 必要   |                                  |
| area_parent_id | num  | 直播分区   | 非必要 | 不填写可能会获取不到部分活动礼物 |
| area_id        | num  | 直播子分区 | 非必要 | 不填写可能会获取不到部分活动礼物 |

**json回复：**



根对象：

| 字段    | 类型 | 内容     | 备注    |
| ------- | ---- | -------- | ------- |
| code    | num  | 返回值   | 0：成功 |
| message | str  | 错误信息 |         |
| data    | obj  | 信息本体 |         |

`data`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| gift_data | obj | 礼物数据 | |
| gift_config | obj | 礼物配置 | |
| global_config | obj | 全局配置 | |

`data.gift_data`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| room_gift_list | obj | 房间礼物列表 | |
| discount_gift_list | obj | 折扣礼物列表 | |
| tab_list | array | 标签列表 | |
| max_send_gift | num | 最大送礼数量 | |
| combo_interval_time | num | 连击间隔时间 | 单位：毫秒 |
| lottery_gift_config | null | 抽奖礼物配置 | |
| privilege | obj | 特权信息 | |
| red_dot | null | 红点信息 | |
| pay_limit_icon | str | 付费限制图标 | |
| naming_gift | null | 命名礼物 | |
| special_show_gift | null | 特殊展示礼物 | |
| bag_tab_disable | num | 背包标签是否禁用 | |
| special_tag | null | 特殊标签 | |

`data.gift_data.room_gift_list`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| gold_list | array | 金币礼物列表 | |
| silver_list | array | 银币礼物列表 | |
| need_odds_offline | bool | 是否需要离线赔率 | |
| ab_result | null | AB测试结果 | |
| panel_extra | null | 面板额外信息 | |

`data.gift_data.privilege`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| buy_guard_btn | str | 购买舰长按钮 | |
| is_expired | num | 是否过期 | |
| privilege_type | num | 特权类型 | |

`data.gift_config`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| base_config | obj | 基础配置 | |
| room_config | obj | 房间配置 | |

`data.gift_config.base_config`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hited | bool | 是否命中 | |
| list | array | 礼物列表 | |
| version | num | 版本号 | |
| ttl | num | 缓存时间 | |

`data.global_config`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| combo_resources | null | 连击资源 | |
| guard_resources | null | 舰长资源 | |
| naming_gift | obj | 命名礼物配置 | |
| send_disable_msg | obj | 发送禁用消息 | |
| gift_protocols | null | 礼物协议 | |

`data.global_config.send_disable_msg`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| gift_for_owner | str | 赠送主播礼物提示 | |
| no_send_obj | str | 无发送对象提示 | |
| no_fans_incr | str | 粉丝数不增加提示 | |
| jump_fans_url | str | 跳转粉丝页URL | |
| web_no_fans_incr | str | Web端粉丝数不增加提示 | |

`data.gift_config.base_config.list` 数组中的对象:

| 字段                | 类型 | 内容                | 备注                        |
| ------------------- | ---- | ------------------- | --------------------------- |
| id                  | num  | 礼物id              |                             |
| name                | str  | 礼物名字            |                             |
| price               | num  | 该值/1000的单位为元 |                             |
| type                | num  |                     |                             |
| coin_type           | str  | 一般为gold，即电池  |                             |
| effect              | num  | 特效类型？          | 观察到可能出现的值为0，2，3 |
| stay_time           | num  | 礼物展示的时间？    | 均为3                       |
| animation_frame_num | num  | 礼物动画帧数        |                             |
| desc                | str  | 礼物描述            |                             |
| img_basic           | str  | 礼物图片            |                             |
| gif                 | str  | 礼物gif动画         |                             |

**示例：**

查询`room_id=23375552`的直播间礼物信息

```shell
curl  'https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/roomGiftList?platform=pc&room_id=23174842'
```

## 获取盲盒概率

> https://api.live.bilibili.com/xlive/general-interface/v1/blindFirstWin/getInfo

*请求方式：GET*

认证方式：无 (无需添加Cookie)

**url参数：**

| 参数名  | 类型 | 内容 | 必要性           | 备注 |
| ------- | ---- | ---- | ---------------- | ---- |
| gift_id | num  |      | 盲盒对应的礼物id |      |

**json回复：**



根对象：

| 字段    | 类型 | 内容     | 备注    |
| ------- | ---- | -------- | ------- |
| code    | num  | 返回值   | 0：成功 |
| message | str  | 错误信息 |         |
| data    | obj  | 信息本体 |         |

`data`中的对象：

| 字段            | 类型  | 内容     | 备注 |
| --------------- | ----- | -------- | ---- |
| note_text       | str   | 描述     |      |
| blind_price     | num   | 盲盒价格 |      |
| blind_gift_name | str   | 盲盒名字 |      |
| gifts           | array | 盲盒价格 |      |

`gifts数组`中的对象：

| 字段      | 类型 | 内容           | 备注 |
| --------- | ---- | -------------- | ---- |
| gift_id   | num  | 爆出的礼物id   |      |
| price     | num  | 爆出的礼物价格 |      |
| gift_name | str  | 礼物名字       |      |
| gift_img  | str  | 礼物图片       |      |
| chance    | str  | 概率           |      |

**示例：**

查询`心动盲盒`的概率

```shell
curl  'https://api.live.bilibili.com/xlive/general-interface/v1/blindFirstWin/getInfo?gift_id=32251'
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "note_text": "每日1次机会，首次投喂盲盒时享首抽福利！",
    "blind_price": 15000,
    "gifts": [
      {
        "gift_id": 32125,
        "price": 2000,
        "gift_name": "电影票",
        "gift_img": "https://s1.hdslb.com/bfs/live/20864a10beaea541c7dce264d5bbc56676d63e4f.png",
        "is_win_gift": 0,
        "chance": "6%"
      },
      {
        "gift_id": 32126,
        "price": 9000,
        "gift_name": "棉花糖",
        "gift_img": "https://s1.hdslb.com/bfs/live/b555682af41551c28f8ad19dc5c4ed87943c84f4.png",
        "is_win_gift": 0,
        "chance": "44.5%"
      },
      {
        "gift_id": 32128,
        "price": 16000,
        "gift_name": "爱心抱枕",
        "gift_img": "https://s1.hdslb.com/bfs/live/824714c830966d7bec381e35ef808b1f478e21ee.png",
        "is_win_gift": 1,
        "chance": "45.56%"
      },
      {
        "gift_id": 32281,
        "price": 40000,
        "gift_name": "绮彩权杖",
        "gift_img": "https://s1.hdslb.com/bfs/live/5cecbf274a4205ef76ed3f11c6540f0c6743363c.png",
        "is_win_gift": 1,
        "chance": "3.7%"
      },
      {
        "gift_id": 32282,
        "price": 100000,
        "gift_name": "时空之站",
        "gift_img": "https://s1.hdslb.com/bfs/live/9ee53aedda3c891fdf23d35c14b3bdc4e0504a97.png",
        "is_win_gift": 1,
        "chance": "0.12%"
      },
      {
        "gift_id": 34894,
        "price": 200000,
        "gift_name": "蛇形护符",
        "gift_img": "https://s1.hdslb.com/bfs/live/2127dd998083a8981ef4e31a4e6787ce5a4d0f9f.png",
        "is_win_gift": 1,
        "chance": "0.08%"
      },
      {
        "gift_id": 32132,
        "price": 2233000,
        "gift_name": "浪漫城堡",
        "gift_img": "https://s1.hdslb.com/bfs/live/216fac597b3c5619d56ed332bcf5f880ea657e8e.png",
        "is_win_gift": 1,
        "chance": "0.04%"
      }
    ],
    "friday_yq_id": 106472,
    "is_first": true,
    "ab_res": 1,
    "uid": 451537183,
    "conf_id": 51,
    "pre_imgs": [
      {
        "gift_id": 32132,
        "preview_url": "http://i0.hdslb.com/bfs/live/e40708d0c8ef9505027ac33ad2a17a23e8e01139.mp4"
      }
    ],
    "blind_gift_name": "心动盲盒"
  }
}
```
</details>

---

## 获取礼物赠送信息

> https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/giftMessageV2

*请求方式: GET*

认证方式：Cookie（SESSDATA）+ WBI签名（需w_rid, wts参数）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |
| target_id | num | 目标主播UID | 必要 | |
| price | num | 价格 | 必要 | 礼物价格 |
| coin_type | num | 货币类型 | 必要 | 未知 |
| platform | str | 平台 | 必要 | web/pc |
| is_fans_club_ticket | num | 是否粉丝团门票 | 非必要 | |
| gift_id | num | 礼物ID | 必要 | |
| gift_attrs | num | 礼物属性 | 非必要 | |
| anchor_guest | str/num | 嘉宾UID | 非必要 | 空字符串或嘉宾UID |
| chat_room | bool | 是否聊天室 | 非必要 | |
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
| fans_medal_info | obj | 粉丝牌信息 | |
| gift_star | null | 礼物之星信息 | |
| virtual_mvp | null | 虚拟MVP信息 | |
| refresh_delay_ms | num | 刷新延迟毫秒 | |
| special_banner | obj | 特殊横幅 | |
| gift_banner | obj | 礼物横幅 | |

`data.fans_medal_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| current | obj | 当前粉丝牌 | |
| received | bool | 是否已领取 | |
| expectation | obj | 预期粉丝牌 | |
| is_level_up | bool | 是否升级 | |
| gift_id | num | 礼物ID | |

`data.special_banner`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| banner_type | num | 横幅类型 | 未知 |
| schema | str | 跳转配置 | |
| pop_ticket | obj | 弹票信息 | |

`data.special_banner.pop_ticket`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| state | num | 状态 | 未知 |
| bg_img | str | 背景图URL | |
| detail_text | str | 详情文字 | |
| version | num | 版本 | |

`data.gift_banner`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| web_banner | obj | Web横幅 | |
| version | num | 版本 | |
| biz_extra | str | 业务额外信息 | 未知 |
| gift_tag | num | 礼物标签 | 未知 |

`data.gift_banner.web_banner`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| banner_type | num | 横幅类型 | 未知 |
| schema | str | 跳转配置 | |
| icon | obj | 图标 | |
| double_icon | null | 双倍图标 | |
| main_title | obj | 主标题 | |
| sub_title | array | 副标题列表 | |
| button | null | 按钮信息 | |
| background | obj | 背景 | |

---

## 发送金瓜子（推测）

> https://api.live.bilibili.com/xlive/revenue/v1/gift/sendGold

*请求方式：POST*

认证方式：Cookie（SESSDATA）+ WBI签名（需w_rid, wts参数）

**url参数：**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| uid | num | 发送者UID | 必要 | |
| gift_id | num | 礼物ID | 必要 | |
| ruid | num | 接收者UID | 必要 | 主播UID |
| send_ruid | num | 发送者UID | 必要 | 通常为0 |
| gift_num | num | 礼物数量 | 必要 | |
| coin_type | str | 货币类型 | 必要 | gold：金瓜子 |
| bag_id | num | 背包ID | 必要 | 通常为0 |
| platform | str | 平台 | 必要 | pc |
| biz_code | str | 业务代码 | 必要 | Live |
| biz_id | num | 业务ID | 必要 | 房间号 |
| storm_beat_id | num | 未知 | 必要 | 通常为0 |
| metadata | str | 元数据 | 非必要 | 空字符串 |
| price | num | 礼物单价 | 必要 | 单位为金瓜子 |
| receive_users | str | 接收用户列表 | 非必要 | 空字符串 |
| live_statistics | str | 直播统计数据 | 非必要 | JSON字符串 |
| statistics | str | 统计数据 | 非必要 | JSON字符串 |
| web_location | str | Web位置 | 非必要 | |
| csrf | str | CSRF令牌 | 必要 | Cookie中的bili_jct |
| w_rid | str | WBI签名 | 必要 | 需要WBI签名 |
| wts | num | WBI时间戳 | 必要 | 需要WBI签名 |

**json回复：**

根对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0：成功 |
| message | str | 错误信息 | |
| ttl | num | 未知 | |
| data | obj | 数据 | |

`data`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 发送者UID | |
| uname | str | 发送者用户名 | |
| face | str | 发送者头像URL | |
| guard_level | num | 舰长等级 | |
| ruid | num | 接收者UID | 主播UID |
| room_id | num | 房间号 | |
| rcost | num | 未知 | |
| total_coin | num | 总金币数 | |
| pay_coin | num | 实际支付金币数 | |
| blow_switch | num | 未知 | |
| send_tips | str | 发送提示 | |
| discount_id | num | 折扣ID | |
| send_master | null | 未知 | |
| button_combo_type | num | 连击按钮类型 | |
| send_gift_countdown | num | 发送礼物冷却时间 | |
| blind_gift | null | 盲盒礼物信息 | |
| fulltext | str | 完整文字 | |
| crit_prob | num | 暴击概率 | |
| price | num | 礼物单价 | |
| left_num | num | 剩余数量 | |
| need_num | num | 需要数量 | |
| available_num | num | 可用数量 | |
| bp_cent_balance | num | B币余额（分） | |
| gift_list | array | 礼物列表 | |
| send_id | str | 发送ID | |
| sender_uinfo | obj | 发送者信息 | |

`data.gift_list`数组中的对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| tid | str | 未知 | |
| gift_id | num | 礼物ID | |
| gift_type | num | 礼物类型 | |
| gift_name | str | 礼物名称 | |
| gift_num | num | 礼物数量 | |
| gift_action | str | 礼物动作 | |
| gift_price | num | 礼物价格 | |
| coin_type | str | 货币类型 | |
| tag_image | str | 标签图片URL | |
| effect_block | num | 特效屏蔽 | |
| extra | obj | 额外信息 | |
| gift_effect | obj | 礼物特效 | |
| is_special_batch | num | 是否特殊批次 | |
| combo_stay_time | num | 连击停留时间 | |
| combo_total_coin | num | 连击总金币 | |
| demarcation | num | 未知 | |
| magnification | num | 放大倍数 | |
| combo_resources_id | num | 连击资源ID | |
| float_sc_resource_id | num | 浮动SC资源ID | |
| is_naming | bool | 是否命名 | |
| receive_user_info | obj | 接收用户信息 | |
| is_join_receiver | bool | 是否加入接收者 | |
| gift_tag | array | 礼物标签 | |
| receiver_uinfo | obj | 接收者用户信息 | |
| gift_info | obj | 礼物信息 | |
| benefits | null | 福利信息 | |

`data.sender_uinfo`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 发送者UID | |
| base | obj | 基础信息 | |
| medal | null | 粉丝牌信息 | |
| wealth | null | 财富信息 | |
| title | null | 头衔信息 | |
| guard | null | 舰长信息 | |
| uhead_frame | null | 头像框信息 | |
| guard_leader | null | 舰长头衔信息 | |

`data.sender_uinfo.base`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| name | str | 用户名 | |
| face | str | 头像URL | |
| name_color | num | 名字颜色 | |
| is_mystery | bool | 是否匿名 | |
| risk_ctrl_info | null | 风控信息 | |
| origin_info | obj | 来源信息 | |
| official_info | obj | 认证信息 | |
| name_color_str | str | 名字颜色字符串 | |