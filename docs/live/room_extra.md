# 直播间扩展接口

## 获取悬浮信息

> https://api.live.bilibili.com/room/v2/Index/getHoverInfo

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
| data | obj | 悬浮信息 | |

---

## 通过UID获取房间ID

> https://api.live.bilibili.com/room/v2/Room/room_id_by_uid

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| uid | num | 用户UID | 必要 | |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 房间信息 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| room_id | num | 直播间ID | |
| short_id | num | 短ID | |
| uid | num | 用户UID | |

---

## 获取直播间播放信息

> https://api.live.bilibili.com/xlive/web-room/v2/index/getRoomPlayInfo

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 播放信息 | |

---

## 获取用户视角的直播间信息

> https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByUser

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 直播间信息 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| user_level | obj | 用户等级信息 | |
| vip | obj | 大会员信息 | |
| title | obj | 头衔信息 | |
| badge | obj | 房间管理标识 | |
| privilege | obj | 特权信息 | |
| info | obj | 当前用户信息 | |
| property | obj | 用户属性 | |
| recharge | obj | 充值信息 | |
| relation | obj | 关注关系 | |
| wallet | obj | 钱包信息 | |
| medal | obj | 粉丝勋章信息 | |
| extra_config | obj | 额外配置 | |
| mailbox | obj | 信箱信息 | |
| user_reward | obj | 用户奖励信息 | |
| shield_info | obj | 屏蔽信息 | |
| super_chat_message | obj | 醒目留言信息 | |
| lpl_info | obj | LPL信息 | |
| cd | obj | 冷却信息 | |
| notice | obj | 通知信息 | |
| show_animation | bool | 是否显示动画 | |
| play_together_info | null | 一起玩信息 | |
| like_user_info_v3 | obj | 点赞用户信息 | |
| function_card | obj | 功能卡片 | |
| ab | obj | AB测试配置 | |
| play_together_info_v2 | obj | 一起玩信息v2 | |
| wealth | obj | 财富等级信息 | |
| br | obj | BR信息 | |
| watermark | str | 水印 | |
| group_medal | null | 群组勋章 | |
| uinfo | obj | 用户详细信息 | |
| qoe_show | obj | QOE显示信息 | |
| popular_rank_guide_card | null | 热门排名引导卡片 | |
| super_chat_message_extend | obj | 醒目留言扩展信息 | |
| v2_watermark | obj | V2水印信息 | |
| forbid_live | obj | 直播禁止信息 | |
| super_bag_entrance | obj | 超级背包入口 | |
| all_gift_bag_entrance_list | null | 所有礼物背包入口列表 | |
| super_power_rank | obj | 超能力排名 | |
| is_show_other_edit | num | 是否显示其他编辑 | |
| tab_icons | array | 标签图标列表 | |
| is_show_other_edit_record | num | 是否显示其他编辑记录 | |
| fans_club_poke_gift_notice | null | 粉丝团戳礼物通知 | |
| cny_quiz_guide_pop_up | bool | 春节答题引导弹窗 | |
| other_edit_info | null | 其他编辑信息 | |
| multi_voice_info | obj | 多语音信息 | |
| game_shop | obj | 游戏商店信息 | |
| is_show_edit_policy | num | 是否显示编辑策略 | |
| guard_notice | obj | 舰长通知信息 | |

`data.user_level`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| level | num | 当前等级 | |
| next_level | num | 下一等级 | |
| color | num | 等级颜色值 | |
| level_rank | str | 等级排名描述 | |

`data.vip`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| vip | num | 大会员类型 | 0: 无 |
| vip_time | str | 大会员到期时间 | |
| svip | num | 年费大会员类型 | 0: 无 |
| svip_time | str | 年费大会员到期时间 | |

`data.title`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| title | str | 头衔文本 | |
| source | str | 头衔来源 | |

`data.badge`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| is_room_admin | bool | 是否为房间管理员 | |
| admin_level | num | 管理员等级 | |
| permissions | null | 权限信息 | |

`data.privilege`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| target_id | num | 目标UID | |
| privilege_type | num | 特权类型 | |
| privilege_uname_color | str | 特权用户名颜色 | |
| buy_guard_notice | null | 购买舰长通知 | |
| sub_level | num | 订阅等级 | |
| notice_status | num | 通知状态 | |
| expired_time | str | 过期时间 | |
| auto_renew | num | 是否自动续费 | |
| renew_remind | null | 续费提醒 | |
| benefit_alters | array | 福利变更列表 | |
| guard_type | num | 舰长类型 | |

`data.info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 用户UID | |
| uname | str | 用户名 | |
| uface | str | 用户头像URL | |
| main_rank | num | 主站等级 | |
| bili_vip | num | 大会员状态 | |
| mobile_verify | num | 手机验证状态 | |
| identification | num | 身份认证状态 | |

`data.property`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uname_color | str | 用户名颜色 | |
| bubble | num | 气泡标识 | |
| danmu | obj | 弹幕设置 | |
| bubble_color | str | 气泡颜色 | |
| bubble_id | num | 气泡ID | |

`data.property.danmu`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| mode | num | 弹幕模式 | |
| color | num | 弹幕颜色 | |
| length | num | 弹幕长度限制 | |
| room_id | num | 房间ID | |

`data.recharge`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| status | num | 充值状态 | |
| type | num | 充值类型 | |
| value | str | 充值金额 | |
| color | str | 颜色 | |
| config_id | num | 配置ID | |

`data.relation`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| is_followed | bool | 是否已关注该用户 | |
| is_fans | bool | 对方是否为我的粉丝 | |
| is_in_fansclub | bool | 是否在粉丝团中 | |
| is_official_followed | bool | 是否被官方关注 | |

`data.wallet`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| gold | num | 金币数量 | |
| silver | num | 银币数量 | |

`data.medal`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| cnt | num | 勋章数量 | |
| is_weared | bool | 是否佩戴勋章 | |
| curr_weared | null | 当前佩戴的勋章(旧版) | |
| up_medal | obj | UP主勋章信息 | |
| lookup | null | 查询信息 | |
| up_medal_v2 | bool | 是否使用v2勋章 | |
| lookup_v2 | null | v2查询信息 | |
| curr_weared_v2 | obj | 当前佩戴的勋章(v2) | |
| curr_show | null | 当前展示 | |

`data.medal.up_medal`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | UP主UID | |
| medal_name | str | 勋章名称 | |
| medal_color | num | 勋章颜色值 | |
| level | num | 勋章等级 | |

`data.medal.curr_weared_v2`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| name | str | 勋章名称 | |
| level | num | 勋章等级 | |
| color_start | num | 渐变起始颜色值 | |
| color_end | num | 渐变结束颜色值 | |
| color_border | num | 边框颜色值 | |
| color | num | 勋章颜色值 | |
| id | num | 勋章ID | |
| typ | num | 勋章类型 | |
| is_light | num | 是否点亮 | |
| ruid | num | 房间主播UID | |
| guard_level | num | 舰长等级 | |
| score | num | 勋章分数 | |
| guard_icon | str | 舰长图标URL | |
| honor_icon | str | 荣誉图标URL | |
| v2_medal_color_start | str | V2渐变起始颜色 | |
| v2_medal_color_end | str | V2渐变结束颜色 | |
| v2_medal_color_border | str | V2边框颜色 | |
| v2_medal_color_text | str | V2文字颜色 | |
| v2_medal_color_level | str | V2等级颜色 | |
| user_receive_count | num | 用户领取次数 | |

`data.extra_config`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| show_bag | bool | 是否显示背包 | |
| show_vip_broadcast | bool | 是否显示大会员广播 | |

`data.mailbox`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| switch_status | num | 信箱开关状态 | |
| red_notice | num | 红点通知数 | |

`data.user_reward`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| entry_effect | obj | 进场特效 | |
| welcome | obj | 欢迎信息 | |

`data.user_reward.entry_effect`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| id | num | 特效ID | |
| privilege_type | num | 特权类型 | |
| priority | num | 优先级 | |
| web_basemap_url | str | Web底图URL | |
| web_effective_time | num | Web有效时间 | |
| web_effect_close | num | Web特效关闭 | |
| web_close_time | num | Web关闭时间 | |
| copy_writing | str | 文案 | |
| copy_color | str | 文案颜色 | |
| highlight_color | str | 高亮颜色 | |
| mock_effect | num | 模拟特效 | |
| business | num | 业务类型 | |
| face | str | 头像URL | |
| basemap_url | str | 底图URL | |
| show_avatar | num | 是否显示头像 | |
| effective_time | num | 有效时间 | |
| web_dynamic_url | str | Web动态URL | |

`data.user_reward.welcome`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| allow_mock | num | 允许模拟 | |

`data.shield_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| shield_user_list | array | 屏蔽用户列表 | |
| keyword_list | array | 关键词屏蔽列表 | |
| shield_rules | obj | 屏蔽规则 | |
| is_block | bool | 是否被封禁 | |
| block_expired | num | 封禁过期时间 | |

`data.shield_info.shield_rules`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| rank | num | 等级限制 | |
| verify | num | 认证限制 | |
| level | num | 等级限制 | |

`data.super_chat_message`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| list | array | 醒目留言列表 | |

`data.lpl_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| lpl | num | LPL标识 | |

`data.cd`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| guide_free_medal_cost | num | 引导免费勋章消耗冷却 | |
| guide_light_medal | num | 引导点亮勋章冷却 | |
| guide_follow | num | 引导关注冷却 | |
| guard_compensate | num | 舰长补偿冷却 | |
| interact_toasts | array | 交互提示列表 | |

`data.notice`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| gift_red_dot | obj | 礼物红点通知 | |
| user_head_dot | obj | 用户头像红点通知 | |
| glory_dress_on | bool | 荣耀装扮是否开启 | |

`data.notice.gift_red_dot`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| module | str | 模块名 | |
| num | num | 数量 | |

`data.notice.user_head_dot`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| module | str | 模块名 | |
| num | num | 数量 | |

`data.like_user_info_v3`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| hit_ab | num | AB测试命中标识 | |

`data.ab`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| Giftpanel_touch | num | 礼物面板触摸AB测试 | |
| bag_gift_support_batch_send | num | 背包礼物支持批量发送 | |
| blindbox_price_0227 | num | 盲盒价格AB测试 | |
| contribution_rank_show_exp | num | 贡献榜显示经验 | |
| gift_dynamic_panel | num | 礼物动态面板 | |
| hzscreen_gift_var | num | 横屏礼物变量 | |
| live_gift_corner_color_bg | num | 直播礼物角标颜色背景 | |
| mobile_gift_panel_top_area_v3 | num | 移动端礼物面板顶部区域v3 | |
| pk_gift_pk | num | PK礼物 | |
| popular_rank_card_ab | num | 热门排名卡片AB测试 | |
| room_hot_rank_v2 | num | 房间热度排名v2 | |
| room_hot_rank_v3 | num | 房间热度排名v3 | |
| room_rank_rearrange | num | 房间排名重排 | |
| wealth | num | 财富等级AB测试 | |
| web_moreLive | num | Web更多直播 | |

`data.play_together_info_v2`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| icon_status | num | 图标状态 | |
| todo_num | num | 待办数量 | |
| icon_url | str | 图标URL | |
| create_url | str | 创建URL | |
| card_level | num | 卡片等级 | |
| card_expire_time | num | 卡片过期时间 | |
| card_url_app | str | App卡片URL | |
| card_url_web | str | Web卡片URL | |
| discount_url_web | str | Web折扣URL | |
| dispatch_url_web | str | Web调度URL | |

`data.wealth`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 用户UID | |
| level | num | 财富等级 | |
| level_total_score | num | 等级总积分 | |
| cur_score | num | 当前积分 | |
| upgrade_need_score | num | 升级所需积分 | |
| status | num | 状态 | |
| dm_icon_key | str | 弹幕图标key | |

`data.br`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| is_br | num | 是否BR用户 | |
| show_icon | bool | 是否显示图标 | |
| red_dot | bool | 是否有红点 | |
| icon_title | str | 图标标题 | |
| jump_url | str | 跳转URL | |
| icon_url | str | 图标URL | |
| biz_id | num | 业务ID | |
| badge_url | str | 徽章URL | |

`data.uinfo`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 用户UID | |
| base | obj | 基础信息 | |
| medal | null | 勋章信息 | |
| wealth | obj | 财富等级 | |
| title | null | 头衔信息 | |
| guard | obj | 舰长信息 | |
| uhead_frame | null | 用户头像框 | |
| guard_leader | null | 舰长房管 | |

`data.uinfo.base`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| name | str | 用户名 | |
| face | str | 头像URL | |
| name_color | num | 用户名颜色值 | |
| is_mystery | bool | 是否匿名 | |
| risk_ctrl_info | null | 风控信息 | |
| origin_info | null | 原始信息 | |
| official_info | null | 认证信息 | |
| name_color_str | str | 用户名颜色字符串 | |

`data.uinfo.wealth`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| level | num | 财富等级 | |
| dm_icon_key | str | 弹幕图标key | |

`data.uinfo.guard`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| level | num | 舰长等级 | |
| expired_str | str | 过期时间描述 | |

`data.qoe_show`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| show | bool | 是否显示 | |
| qoe_info | null | QOE信息 | |

`data.super_chat_message_extend`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| in_audit_list | null | 审核列表 | |
| audit_info | obj | 审核信息 | |
| entrance_mode | num | 入口模式 | |
| has_fans_sc | bool | 是否有粉丝醒目留言 | |
| dm_text | str | 弹幕文本 | |
| button_text | str | 按钮文本 | |
| fans_sc_can_buy | bool | 粉丝醒目留言是否可购买 | |

`data.super_chat_message_extend.audit_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| ids | null | 审核ID列表 | |
| msg | str | 审核消息 | |

`data.v2_watermark`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| sawtooth_watermark | str | 锯齿水印 | |
| icon_watermark | str | 图标水印 | |

`data.forbid_live`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| is_forbid | bool | 是否被禁止直播 | |
| forbid_text | str | 禁止原因文本 | |

`data.super_power_rank`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| show_icon | bool | 是否显示图标 | |
| icon_url | str | 图标URL | |
| jump_url | str | 跳转URL | |

`data.multi_voice_info`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| enable_asr | bool | 是否启用语音识别 | |

`data.game_shop`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| visible | num | 是否可见 | |
| icon_url | str | 图标URL | |
| promotion_page_url | str | 推广页URL | |

`data.guard_notice`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| url | str | 通知URL | |
| delay_second | num | 延迟秒数 | |
| red_alarm | num | 红色警报 |

`data.function_card`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| send_gift_card | obj | 送礼卡片 | |
| wish_list_card | null | 心愿单卡片 | |

`data.function_card.send_gift_card`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| card_experiment | num | 卡片实验ID | |
| card_duration | num | 卡片持续时间 | |
| title | str | 标题 | |
| subtitle | str | 副标题 | |
| popup_title | str | 弹窗标题 | |
| surplus_remind | num | 剩余提醒 | |
| watch_live | num | 观看直播 | |
| send_dm | num | 发送弹幕 | |
| follow_watch_live | num | 关注后观看直播 | |
| follow_send_dm | num | 关注后发送弹幕 | |
| price_cap | num | 价格上限 | |
| default_gift | num | 默认礼物ID | |
| gift_list | array | 礼物列表 | |

`data.super_bag_entrance`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| show_icon | bool | 是否显示图标 | |
| icon_title | str | 图标标题 | |
| icon_url | str | 图标URL | |
| jump_url | str | 跳转URL | |
| bag_type | num | 背包类型 | |

---

## 获取直播间礼物列表

> https://api.live.bilibili.com/xlive/web-room/v1/giftPanel/roomGiftList

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 礼物列表 | |

---

## 直播间进入动作

> https://api.live.bilibili.com/xlive/web-room/v1/index/roomEntryAction

*请求方式: POST*

**正文参数（ application/x-www-form-urlencoded ）:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |
| csrf | str | CSRF Token | 必要 | |
| csrf_token | str | CSRF Token | 必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 数据 | |

---

## 获取历史弹幕

> https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| roomid | num | 直播间ID | 必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 弹幕数据 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| admin | array | 管理员弹幕 | |
| room | array | 普通用户弹幕 | |

---

## 获取房间游戏卡片信息

> https://api.live.bilibili.com/xlive/game-pc/room_game_card_info

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |
| web_location | str | Web位置 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 游戏卡片信息 | |

---

## 获取用户额外信息

> https://api.live.bilibili.com/xlive/app-room/v1/index/GetUserExtraInfo

*请求方式: GET*

认证方式：Cookie（SESSDATA）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| room_id | num | 直播间ID | 必要 | |

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
| uname_color | str | 用户名颜色 | |
| bubble | num | 气泡标识 | |
| danmu | obj | 弹幕设置 | |
| bubble_color | str | 气泡颜色 | |
| bubble_id | num | 气泡ID | |

`data.danmu`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| mode | num | 弹幕模式 | |
| color | num | 弹幕颜色 | |
| length | num | 弹幕长度限制 | |

---

## 获取直播间进度条信息

> https://api.live.bilibili.com/xlive/web-room/v1/index/getProgressBarInfo

*请求方式: GET*

认证方式：无（无需Cookie）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| roomid | num | 直播间ID | 必要 | |
| platform | str | 平台 | 必要 | web |

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
| bar_status | str | 进度条状态 | 未知 |
| play_tag_list | array | 播放标签列表 | |
| bar_special_time | num | 特殊时间 | 未知 |
| bar_start_time | num | 开始时间 | 未知 |
