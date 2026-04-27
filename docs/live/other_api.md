# 直播其他接口

## 获取直播间屏蔽信息

> https://api.live.bilibili.com/banned_service/v1/shield/get_shield_info

*请求方式：GET*

认证方式：Cookie

**URL参数：**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |

**json回复：**

根对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0：成功 |
| message | str | 错误信息 | |
| data | obj | 屏蔽信息 | |

`data`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| shield_user_list | array | 屏蔽用户列表 | |
| keyword_list | array | 屏蔽关键词列表 | |
| shield_rules | obj | 屏蔽规则 | |

`data.shield_rules`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| rank | num | 等级限制 | 低于该等级的用户被屏蔽 |
| verify | num | 认证限制 | 0：不限制<br/>1：限制未认证用户 |
| level | num | 等级限制 | 未知 |

---

## 获取客户端资源

> https://api.live.bilibili.com/xlive/open-interface/v1/fetch_client_resource

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |
| room_id | num | 直播间ID | 非必要 | |
| ruid | num | 主播UID | 非必要 | |
| page_source | num | 页面来源 | 非必要 | |
| platform | str | 平台 | 非必要 | pc |
| position | num | 位置 | 非必要 | |
| position_flag | num | 位置标识 | 非必要 | |
| source | str | 来源 | 非必要 | |
| csrf | str | CSRF Token | 非必要 | |
| w_rid | str | WBI签名 | 非必要 | |
| wts | num | 时间戳 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 资源信息 | |

---

## 获取收益MD5

> https://api.live.bilibili.com/xlive/general-interface/v1/content/getRevenueMd5

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | MD5信息 | |

`data`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| wealth | str | 财富值MD5 | |

---

## 获取内容

> https://api.live.bilibili.com/xlive/general-interface/v1/content/get

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 内容数据 | |

---

## 获取追踪配置

> https://api.live.bilibili.com/xlive/open-interface/v2/tracker/conf

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 追踪配置 | |

---

## 获取RTC时间戳

> https://api.live.bilibili.com/xlive/open-interface/v1/rtc/getTimestamp

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 时间戳信息 | |

---

## 查询资源

> https://api.live.bilibili.com/xlive/open-interface/v1/query_resource

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| module | str | 资源模块名 | 必要 | 多个模块用逗号分隔，可选值: `medal_icon`/`medal`/`guard_resource`/`medal_level_up_animation` |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 资源数据 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hash | str | 资源哈希 | |
| kv | obj | KV配置数据 | |
| medal_icon | obj | 勋章图标资源 | |
| birthday | obj | 生日相关数据 | |
| guard_resource | obj | 舰长资源 | |
| guard_resource_new | obj | 新版舰长资源 | |
| medal | obj | 勋章数据 | |
| medal_level_up_animation | obj | 勋章升级动画数据 | |

`data.kv`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hash | str | 哈希 | |
| data | obj | KV数据 | |

`data.kv.data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| web | str | Web端配置 | |

`data.medal_icon`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hash | str | 哈希 | |
| hover | str | 悬浮图标 | |
| data | array | 图标数据列表 | |
| honor | str | 荣誉图标 | 为空时为null |
| guard_honor | str | 舰长荣誉图标 | 为空时为null |
| guard_icon | obj | 舰长图标 | 为空时为null |
| light_honor | str | 点亮荣誉图标 | |
| thousand_guard_icon | obj | 千舰图标 | 为空时为null |
| thousand_guard_uid | array | 千舰用户UID列表 | 为空时为null |

`data.medal_icon.guard_icon`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| 1 | str | 督察舰长图标 | |
| 2 | str | 舰长图标 | |
| 3 | str | 提督图标 | |

`data.medal_icon.thousand_guard_icon`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| 1 | str | 千舰图标1 | |
| 2 | str | 千舰图标2 | |
| 3 | str | 千舰图标3 | |

`data.birthday`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hash | str | 哈希 | |
| data | array | 生日数据列表 | |

`data.guard_resource`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hash | str | 哈希 | |
| data | obj | 舰长资源数据 | 未请求该模块时为null |

`data.guard_resource.data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| guard_1_1 | str | 督察舰长图标1 | |
| guard_1_2 | str | 督察舰长图标2 | |
| guard_1_3 | str | 督察舰长图标3 | |
| guard_2_1 | str | 舰长图标1 | |
| guard_2_2 | str | 舰长图标2 | |
| guard_2_3 | str | 舰长图标3 | |
| guard_3_1 | str | 提督图标1 | |
| guard_3_2 | str | 提督图标2 | |
| guard_3_3 | str | 提督图标3 | |
| list_bg_2 | str | 舰长列表背景 | |
| list_bg_3 | str | 提督列表背景 | |
| rhombus_2 | str | 舰长菱形图标 | |
| rhombus_3 | str | 提督菱形图标 | |
| buy_guard_2 | str | 购买舰长页面背景 | |
| buy_guard_3 | str | 购买提督页面背景 | |
| dialog_bg_2 | str | 舰长对话框背景 | |
| dialog_bg_3 | str | 提督对话框背景 | |
| anchor_dialog_bg_2 | str | 主播舰长对话框背景 | |
| anchor_dialog_bg_3 | str | 主播提督对话框背景 | |
| color_highlight_2 | str | 舰长高亮色 | |
| color_minor_2 | str | 舰长次要色 | |
| color_name_2 | str | 舰长名称色 | |
| color_highlight_3 | str | 提督高亮色 | |
| color_minor_3 | str | 提督次要色 | |
| color_name_3 | str | 提督名称色 | |
| log_icon_2 | str | 舰长日志图标 | |
| log_icon_3 | str | 提督日志图标 | |
| guard_log_icon_2 | str | 舰长日志舰长图标 | |
| guard_log_icon_3 | str | 提督日志舰长图标 | |
| log_color_highlight_2 | str | 舰长日志高亮色 | |
| log_color_highlight_3 | str | 提督日志高亮色 | |

`data.guard_resource_new`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hash | str | 哈希 | |
| data | array | 新版舰长资源数据列表 | |

`data.medal`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hash | str | 哈希 | |
| data | obj | 勋章详细数据 | 未请求该模块时为null |

`data.medal.data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| normal | array | 普通勋章列表 | |
| guard | array | 舰长勋章列表 | |
| honor | array | 荣誉勋章列表 | |
| honor_level_icon | array | 荣誉等级图标列表 | |
| honor_guard_level_icon | array | 荣誉舰长等级图标列表 | |

`data.medal_level_up_animation`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hash | str | 哈希 | |
| data | obj | 升级动画数据 | 未请求该模块时为null |

`data.medal_level_up_animation.data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| animation | array | 动画数据列表 | |

---

## 获取抽奖信息

> https://api.live.bilibili.com/xlive/lottery-interface/v1/lottery/getLotteryInfoWeb

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| roomid | num | 直播间ID | 必要 | |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 抽奖信息 | |

---

## 获取全屏特效配置

> https://api.live.bilibili.com/xlive/general-interface/v1/fullScSpecialEffect/GetEffectConfListV2

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 特效配置 | |

`data`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| full_sc_resource | obj | 全屏特效资源 | |
| float_sc_resource | obj | 浮动特效资源 | |

`data.full_sc_resource`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| conf_list | array | 配置列表 | |
| base_version | num | 基础版本号 | |
| ttl | num | 缓存时间 | |

---

## 数据接口

> https://api.live.bilibili.com/xlive/data-interface/v1/x25Kn/E

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 数据 | |

---

## 获取购物车状态

> https://api.live.bilibili.com/xlive/e-commerce-interface/v1/ecommerce-user/get_shopping_cart_status

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 购物车状态 | |

---

## 获取Widget横幅列表

> https://api.live.bilibili.com/xlive/play-interface/widgetService/GetWidgetBannerList

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 横幅列表 | |

`data`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| banner_list | array | 横幅列表 | |
| widget_list | array | 小组件列表 | |
| banner_list_entrance | array | 横幅入口列表 | |
| popup_config | null | 弹窗配置 | |

`data.banner_list`数组中的对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| id | num | 横幅ID | |
| name | str | 名称 | |
| main_pic | str | 主图URL | |
| icon | str | 图标URL | |
| icon_v2 | str | 图标V2 URL | |
| jump_url | str | 跳转URL | |
| jump_type | num | 跳转类型 | |
| online_time | str | 上线时间 | |
| offline_time | str | 下线时间 | |
| weight | num | 权重 | |
| show_type | num | 展示类型 | |
| show_strategy | num | 展示策略 | |
| activity_type | num | 活动类型 | |
| icon_type | num | 图标类型 | |
| extra | str | 额外信息 | |
| business_type | num | 业务类型 | |
| badge | null | 徽章 | |
| entrance_icon | str | 入口图标URL | |
| entrance_jump_url | str | 入口跳转URL | |
| entrance_type | num | 入口类型 | |

`data.widget_list`数组中的对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| widget_type | num | 小组件类型 | |
| widget_config | obj | 小组件配置 | |

`data.widget_list[].widget_config`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| jump_url | str | 跳转URL | |
| icon | str | 图标URL | |
| title | str | 标题 | |
| subtitle | str | 副标题 | |
| online_time | str | 上线时间 | |
| offline_time | str | 下线时间 | |
| weight | num | 权重 | |

`data.banner_list_entrance`数组中的对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| icon | str | 图标URL | |
| jump_url | str | 跳转URL | |
| name | str | 名称 | |
| online_time | str | 上线时间 | |
| offline_time | str | 下线时间 | |
| weight | num | 权重 | |
| show_type | num | 展示类型 | |
| show_strategy | num | 展示策略 | |
| badge | null | 徽章 | |

---

## 获取背景列表

> https://api.live.bilibili.com/room/v1/Bg/get_list

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | array | 背景列表 | |

---

## 主播检查

> https://api.live.bilibili.com/xlive/lottery-interface/v1/Anchor/Check

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 检查结果 | |

---

## 获取大乱斗时间戳

> https://api.live.bilibili.com/xlive/general-interface/v1/battle/getTimestamp

*请求方式: GET*

认证方式：无（无需Cookie）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| platform | str | 平台 | 必要 | pc |
| timestamp | num | 时间戳 | 必要 | 13位毫秒时间戳 |

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
| timestamp | num | 服务器时间戳 | 13位毫秒时间戳，用于大乱斗功能的时间校验 |
