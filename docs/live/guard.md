## 查询大航海成员
> https://api.live.bilibili.com/xlive/app-room/v2/guardTab/topListNew

*请求方式: GET*

认证方式：无（无需Cookie）

**URL参数：**

| 参数名    | 类型 | 内容     | 必要性 | 备注                                    |
| --------- | ---- | -------- | ------ | --------------------------------------- |
| roomid    | num  | 直播间号 | 必要   |                                         |
| page      | num  | 页数     | 必要   |                                         |
| ruid      | num  | 主播id   | 必要   |                                         |
| page_size | num  | 页大小   | 非必要 | 默认20，最大30，若超过则作为10处理      |
| typ       | num  | 排序方式 | 非必要 | typ=3,4,5分别为按周/月/总航海亲密度排序 |

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
| info | obj | 排行榜信息 | |
| list | array | 大航海成员 | page=1时，list[0]得到的会是榜单的第四名 |
| top3 | array | 整个列表的top3 | 与list对象结构相同 |
| my_follow_info | obj | 当前用户的大航海信息 | 未上船时大部分字段为0/null |
| guard_warn | obj | 大航海过期提醒信息 | |
| guard_leader | obj | 舰长榜榜首信息 | 无时为null |
| exist_benefit | bool | 是否存在权益 | |
| remind_benefit | str | 权益提醒按钮文字 | |
| ab | obj | AB测试配置 | |
| remind_msg | str | 提醒消息 | |
| typ | num | 排序方式 | 0: 未知 |
| extop | array/null | 额外展示项 | 可能为null或数组 |
| main_text | str | 主文字 | |
| sub_text | str | 副文字 | |
| btn_type | num | 按钮类型 | |
| prompt_text | str | 提示文字 | |

`data.info`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| num | num | 大航海总人数 | |
| page | num | 总页数 | |
| now | num | 当前页码 | |
| achievement_level | num | 成就等级 | |
| anchor_guard_achieve_level | num | 主播大航海成就等级 | |
| achievement_icon_src | str | 成就图标URL | |
| buy_guard_icon_src | str | 购买大航海图标URL | |
| rule_doc_src | str | 规则文档URL | |
| ex_background_src | str | 扩展背景图URL | |
| color_start | str | 渐变起始色 | |
| color_end | str | 渐变结束色 | |
| tab_color | array | Tab标签颜色数组 | 长度2 |
| title_color | array | 标题颜色数组 | 长度2 |

`data.top3`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| ruid | num | 主播UID | |
| rank | num | 榜单排名 | |
| accompany | num | 陪伴天数 | |
| uinfo | obj | 用户信息 | 与list中uinfo结构相同 |
| score | num | 亲密度 | |

`data.guard_leader`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 用户UID | |
| name | str | 用户名 | |
| face | str | 用户头像URL | |
| display_src | str | 展示图URL | |
| avatar_src | str | 头像源图URL | |
| icon_src | str | 图标URL | |

`data.guard_warn`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| is_warn | num | 是否提醒 | 0: 否; 1: 是 |
| warn | str | 提醒内容 | |
| expired | num | 已过期 | 未知 |
| will_expired | num | 即将过期 | 未知 |
| address | str | 跳转地址 | |

`data.my_follow_info`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| accompany_days | num | 陪伴天数 | |
| auto_renew | num | 自动续费 | 0: 否; 1: 是 |
| renew_remind | obj | 续费提醒信息 | |
| rank | num | 排名 | |
| ruid | num | 主播UID | |
| uinfo | obj | 用户信息 | 未上船时为null |
| expired_time | str | 过期时间 | |

`data.my_follow_info.renew_remind`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| content | str | 提醒内容 | |
| type | num | 提醒类型 | |
| hint | str | 提示文字 | |

`data.my_follow_info.uinfo`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 用户UID | |
| base | obj | 用户基本信息 | |
| medal | obj/null | 粉丝牌信息 | |
| wealth | obj/null | 财富信息 | 未知 |
| title | obj/null | 头衔信息 | 未知 |
| guard | obj | 大航海信息 | |
| uhead_frame | obj/null | 头像框信息 | 未知 |
| guard_leader | obj/null | 舰长榜榜首信息 | |

`data.ab`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| guard_accompany_list | num | 未知 | AB测试相关 |

`data.extop`数组中的对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| ruid | num | 主播UID | |
| rank | num | 排名 | |
| accompany | num | 陪伴天数 | |
| extop_icon_src | str | 额外展示图标URL | |
| uinfo | obj | 用户信息 | |

`list`对象：

| 字段      | 类型 | 内容     | 备注  |
| --------- | ---- | -------- | ----- |
| ruid      | num  | 主播UID  |       |
| rank      | num  | 榜单排名 |       |
| accompany | num  | 陪伴天数 |       |
| uinfo     | obj  | 用户信息 |       |
| score     | num  | 亲密度   | 恒为0 |

`list`对象的`uinfo`：
| 字段  | 类型 | 内容         | 备注                                                     |
| ----- | ---- | ------------ | -------------------------------------------------------- |
| uid   | num  | 用户UID      |                                                          |
| base  | obj  | 用户基本信息 |                                                          |
| medal | obj  | 粉丝牌       | 与[此处](/bilibili-API-collect/docs/user/medals)基本一致 |

`list`对象的`uinfo`的`base`：

| 字段 | 类型   | 内容     | 备注 |
| ---- | ------ | -------- | ---- |
| name | string | 用户名   |      |
| face | string | 用戶头像 |      |


**示例：**

查询`23174842`直播间的大航海成员


```shell
curl  ' https://api.live.bilibili.com/xlive/app-room/v2/guardTab/topListNew?ruid=504140200&roomid=23174842&page=1'
```


<details>
<summary>查看响应示例：</summary>

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "info": {
            "num": 23,
            "page": 10,
            "now": 1,
            "achievement_level": 1,
            "anchor_guard_achieve_level": 0,
            "achievement_icon_src": "",
            "buy_guard_icon_src": "https://i0.hdslb.com/bfs/live/4a481b491767f9d91165a4631252de4503d63a17.png",
            "rule_doc_src": "",
            "ex_background_src": "https://i0.hdslb.com/bfs/live/d0e938839a9dee733e8a7f9f6a3a132108ae22bc.png",
            "color_start": "",
            "color_end": "",
            "tab_color": [
                "#4DDDDBD5",
                "#26CFCBC0"
            ],
            "title_color": [
                "#FFC9CCD0",
                "#FF9499A0"
            ]
        },
        "list": [
            {
                "ruid": 504140200,
                "rank": 4,
                "accompany": 36,
                "uinfo": {
                    "uid": 432911315,
                    "base": {
                        "name": "幻想乡的年华",
                        "face": "https://i2.hdslb.com/bfs/face/5ddde7a8466aa2d60d082ccfc08a0267445b193b.jpg",
                        "name_color": 0,
                        "is_mystery": false,
                        "risk_ctrl_info": null,
                        "origin_info": {
                            "name": "幻想乡的年华",
                            "face": "https://i2.hdslb.com/bfs/face/5ddde7a8466aa2d60d082ccfc08a0267445b193b.jpg"
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
                        "name": "软饭兔",
                        "level": 25,
                        "color_start": 398668,
                        "color_end": 6850801,
                        "color_border": 16771156,
                        "color": 398668,
                        "id": 0,
                        "typ": 0,
                        "is_light": 1,
                        "ruid": 504140200,
                        "guard_level": 2,
                        "score": 0,
                        "guard_icon": "",
                        "honor_icon": "",
                        "v2_medal_color_start": "#4775EFCC",
                        "v2_medal_color_end": "#4775EFCC",
                        "v2_medal_color_border": "#58A1F8FF",
                        "v2_medal_color_text": "#FFFFFFFF",
                        "v2_medal_color_level": "#000B7099",
                        "user_receive_count": 0
                    },
                    "wealth": null,
                    "title": null,
                    "guard": {
                        "level": 2,
                        "expired_str": ""
                    },
                    "uhead_frame": null,
                    "guard_leader": null
                },
                "score": 0
            },
            {
                "ruid": 504140200,
                "rank": 5,
                "accompany": 513,
                "uinfo": {
                    "uid": 7816639,
                    "base": {
                        "name": "在这样的时光",
                        "face": "https://i1.hdslb.com/bfs/face/3b0091dda76e095351907e9c708b9571716aa3e1.jpg",
                        "name_color": 0,
                        "is_mystery": false,
                        "risk_ctrl_info": null,
                        "origin_info": {
                            "name": "在这样的时光",
                            "face": "https://i1.hdslb.com/bfs/face/3b0091dda76e095351907e9c708b9571716aa3e1.jpg"
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
                        "name": "软饭兔",
                        "level": 30,
                        "color_start": 2951253,
                        "color_end": 10329087,
                        "color_border": 6809855,
                        "color": 2951253,
                        "id": 0,
                        "typ": 0,
                        "is_light": 1,
                        "ruid": 504140200,
                        "guard_level": 3,
                        "score": 0,
                        "guard_icon": "",
                        "honor_icon": "",
                        "v2_medal_color_start": "#9660E5CC",
                        "v2_medal_color_end": "#9660E5CC",
                        "v2_medal_color_border": "#D47AFFFF",
                        "v2_medal_color_text": "#FFFFFFFF",
                        "v2_medal_color_level": "#6C00A099",
                        "user_receive_count": 0
                    },
                    "wealth": null,
                    "title": null,
                    "guard": {
                        "level": 3,
                        "expired_str": ""
                    },
                    "uhead_frame": null,
                    "guard_leader": null
                },
                "score": 0
            }
        ],
        "top3": [
            {
                "ruid": 504140200,
                "rank": 1,
                "accompany": 306,
                "uinfo": {
                    "uid": 85743027,
                    "base": {
                        "name": "-小fa---",
                        "face": "https://i0.hdslb.com/bfs/face/82b2d0fef27b7b69be0d121b3ef0491504bbaae8.jpg",
                        "name_color": 0,
                        "is_mystery": false,
                        "risk_ctrl_info": null,
                        "origin_info": {
                            "name": "-小fa---",
                            "face": "https://i0.hdslb.com/bfs/face/82b2d0fef27b7b69be0d121b3ef0491504bbaae8.jpg"
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
                        "name": "软饭兔",
                        "level": 30,
                        "color_start": 2951253,
                        "color_end": 10329087,
                        "color_border": 16771156,
                        "color": 2951253,
                        "id": 0,
                        "typ": 0,
                        "is_light": 1,
                        "ruid": 504140200,
                        "guard_level": 2,
                        "score": 0,
                        "guard_icon": "",
                        "honor_icon": "",
                        "v2_medal_color_start": "#9660E5CC",
                        "v2_medal_color_end": "#9660E5CC",
                        "v2_medal_color_border": "#D47AFFFF",
                        "v2_medal_color_text": "#FFFFFFFF",
                        "v2_medal_color_level": "#6C00A099",
                        "user_receive_count": 0
                    },
                    "wealth": null,
                    "title": null,
                    "guard": {
                        "level": 2,
                        "expired_str": ""
                    },
                    "uhead_frame": null,
                    "guard_leader": null
                },
                "score": 0
            },
            {
                "ruid": 504140200,
                "rank": 2,
                "accompany": 1005,
                "uinfo": {
                    "uid": 28601039,
                    "base": {
                        "name": "捏软软的上帝",
                        "face": "https://i2.hdslb.com/bfs/face/1f2a9b20294452d5c6ce9f40c66b186ef57b92e5.jpg",
                        "name_color": 0,
                        "is_mystery": false,
                        "risk_ctrl_info": null,
                        "origin_info": {
                            "name": "捏软软的上帝",
                            "face": "https://i2.hdslb.com/bfs/face/1f2a9b20294452d5c6ce9f40c66b186ef57b92e5.jpg"
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
                        "name": "软饭兔",
                        "level": 29,
                        "color_start": 2951253,
                        "color_end": 10329087,
                        "color_border": 16771156,
                        "color": 2951253,
                        "id": 0,
                        "typ": 0,
                        "is_light": 1,
                        "ruid": 504140200,
                        "guard_level": 2,
                        "score": 0,
                        "guard_icon": "",
                        "honor_icon": "",
                        "v2_medal_color_start": "#9660E5CC",
                        "v2_medal_color_end": "#9660E5CC",
                        "v2_medal_color_border": "#D47AFFFF",
                        "v2_medal_color_text": "#FFFFFFFF",
                        "v2_medal_color_level": "#6C00A099",
                        "user_receive_count": 0
                    },
                    "wealth": null,
                    "title": null,
                    "guard": {
                        "level": 2,
                        "expired_str": ""
                    },
                    "uhead_frame": null,
                    "guard_leader": null
                },
                "score": 0
            },
            {
                "ruid": 504140200,
                "rank": 3,
                "accompany": 95,
                "uinfo": {
                    "uid": 3546834244995088,
                    "base": {
                        "name": "老实逸流-恩师软软riu",
                        "face": "https://i1.hdslb.com/bfs/face/0b1f95d926acfb06c8d7d9c66d2e1fabf3e1a3c4.jpg",
                        "name_color": 0,
                        "is_mystery": false,
                        "risk_ctrl_info": null,
                        "origin_info": {
                            "name": "老实逸流-恩师软软riu",
                            "face": "https://i1.hdslb.com/bfs/face/0b1f95d926acfb06c8d7d9c66d2e1fabf3e1a3c4.jpg"
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
                        "name": "软饭兔",
                        "level": 28,
                        "color_start": 398668,
                        "color_end": 6850801,
                        "color_border": 16771156,
                        "color": 398668,
                        "id": 0,
                        "typ": 0,
                        "is_light": 1,
                        "ruid": 504140200,
                        "guard_level": 2,
                        "score": 0,
                        "guard_icon": "",
                        "honor_icon": "",
                        "v2_medal_color_start": "#4775EFCC",
                        "v2_medal_color_end": "#4775EFCC",
                        "v2_medal_color_border": "#58A1F8FF",
                        "v2_medal_color_text": "#FFFFFFFF",
                        "v2_medal_color_level": "#000B7099",
                        "user_receive_count": 0
                    },
                    "wealth": null,
                    "title": null,
                    "guard": {
                        "level": 2,
                        "expired_str": ""
                    },
                    "uhead_frame": null,
                    "guard_leader": null
                },
                "score": 0
            }
        ],
        "my_follow_info": {
            "accompany_days": 0,
            "auto_renew": 0,
            "renew_remind": {
                "content": "",
                "type": 0,
                "hint": ""
            },
            "rank": 0,
            "ruid": 0,
            "uinfo": null,
            "expired_time": ""
        },
        "guard_warn": {
            "is_warn": 0,
            "warn": "",
            "expired": 0,
            "will_expired": 0,
            "address": ""
        },
        "exist_benefit": false,
        "remind_benefit": "立即上船",
        "ab": {
            "guard_accompany_list": 1
        },
        "remind_msg": "头号粉丝大航海，上船后可上榜",
        "typ": 0,
        "extop": null,
        "guard_leader": null,
        "main_text": "",
        "sub_text": "",
        "btn_type": 1,
        "prompt_text": "头号粉丝大航海，等你来上船"
    }
}
```

</details>


---

## 查询大航海每日排行

> https://api.live.bilibili.com/xlive/general-interface/v1/guard/DailyRank

*请求方式: GET*

认证方式：Cookie（SESSDATA）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| type | str | 排行类型 | 必要 | 如 sail_boat_value |
| area_id | str | 分区ID | 非必要 | 空字符串为全部 |
| page | num | 页数 | 必要 | |
| is_trend | num | 是否显示趋势 | 非必要 | 1: 是 |
| page_size | num | 每页数量 | 非必要 | 默认20 |

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
| list | array | 排行列表 | |
| own | obj | 自己的排名信息 | |
| ratioDesc | str | 比率描述 | 未知 |

`data.list`数组中的对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 用户UID | |
| rank | num | 排名 | |
| isSelf | num | 是否自己 | 0: 否; 1: 是 |
| score | num | 分数 | |
| uname | str | 用户名 | |
| uface | str | 用户头像URL | |
| isMaster | num | 是否主播 | 未知 |
| content | obj | 内容信息 | 未知 |
| type | str | 类型 | |
| trend | num | 趋势 | 未知 |
| roomid | num | 直播间ID | |
| liveStatus | num | 直播状态 | 未知 |
| cover | str | 封面URL | |
| follow_status | num | 关注状态 | 未知 |
| area_parent_id | num | 父分区ID | |
| area_id | num | 子分区ID | |

`data.own`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| uid | num | 用户UID | |
| uname | str | 用户名 | |
| rank | str | 排名 | |
| score | str | 分数 | |
| uface | str | 用户头像URL | |
| isMaster | num | 是否主播 | 未知 |
| type | str | 类型 | |
| content | obj | 内容信息 | 未知 |
| roomid | num | 直播间ID | |
| liveStatus | num | 直播状态 | 未知 |
| is_show_own | num | 是否显示自己的信息 | 未知 |

`data.own.content`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| type | str | 类型 | 未知 |
| value | str | 值 | 未知 |

---

## 查询粉丝团成员


> https://api.live.bilibili.com/xlive/general-interface/v1/rank/getFansMembersRank

*请求方式: GET*

认证方式：无（无需Cookie）

| 参数名    | 类型 | 内容           | 必要性              | 备注                                                                                            |
| --------- | ---- | -------------- | ------------------- | ----------------------------------------------------------------------------------------------- |
| page      | num  | 页数           | 必要                |                                                                                                 |
| ruid      | num  | 主播id         | 必要                |                                                                                                 |
| page_size | num  | 每页返回的数量 | 必要                | 最大30，若超过则作为10处理                                                                      |
| rank_type | num  | 排序方式       | 非必要              | 1：按照粉丝牌还亮着的粉丝团成员的亲密度排序<br> 2：按照**所有**没上过舰的粉丝团成员的亲密度排序 |
| ts        | num  | 13位时间戳     | 当rank_type=2时必要 | 该值>=1000即可                                                                                  |

**json回复：**

根对象：

| 字段    | 类型 | 内容     | 备注    |
| ------- | ---- | -------- | ------- |
| code    | num  | 返回值   | 0：成功 |
| message | str  | 错误信息 |         |
| data    | obj  | 信息本体 |         |

`data`对象：

| 字段         | 类型  | 内容           | 备注 |
| ------------ | ----- | -------------- | ---- |
| item         | array | 内容           |      |
| num          | num   | 粉丝团成员数量 |
| medal_status | num   |                |

`list`对象

| 字段               | 类型 | 内容                                                             | 备注 |
| ------------------ | ---- | ---------------------------------------------------------------- | ---- |
| user_rank          | num  | 排名                                                             |
| uid                | num  | 用户UID                                                          |
| name               | str  | 用户名                                                           |
| face               | str  | 用户头像                                                         |
| score              | num  | 亲密度                                                           |
| medal_name         | str  | 粉丝牌名字                                                       |
| level              | num  | 粉丝牌等级                                                       |
| target_id          | num  | 主播UID                                                          |
| guard_level        | num  | 大航海类型，1，2，3分别为总督，提督，舰长                        |
| medal_color_start  | num  | 粉丝牌渐变起始色                                                 |
| medal_color_end    | num  | 粉丝牌渐变结束色                                                 |
| medal_color_border | num  | 粉丝牌边框颜色                                                   |
| guard_icon         | str  | 大航海图标URL                                                    |
| uinfo_medal        | obj  | 粉丝牌，与[此处](/bilibili-API-collect/docs/user/medals)基本一致 |


**示例：**

查询用户`504140200`的粉丝团成员

```shell
curl  'https://api.live.bilibili.com/xlive/general-interface/v1/rank/getFansMembersRank?ruid=504140200&page_size=10&page=1'
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "item": [
      {
        "user_rank": 1,
        "uid": 85743027,
        "name": "小软兔のfa",
        "face": "https://i0.hdslb.com/bfs/face/bdbcabf8d927844ae4f8f9c65862077e29afb989.jpg",
        "score": 50990540,
        "medal_name": "软饭兔",
        "level": 30,
        "target_id": 504140200,
        "special": "",
        "guard_level": 3,
        "medal_color_start": 2951253,
        "medal_color_end": 10329087,
        "medal_color_border": 6809855,
        "guard_icon": "https://i0.hdslb.com/bfs/live/143f5ec3003b4080d1b5f817a9efdca46d631945.png",
        "honor_icon": "",
        "uinfo_medal": {
          "name": "软饭兔",
          "level": 30,
          "color_start": 2951253,
          "color_end": 10329087,
          "color_border": 6809855,
          "color": 0,
          "id": 0,
          "typ": 0,
          "is_light": 1,
          "ruid": 504140200,
          "guard_level": 3,
          "score": 50990540,
          "guard_icon": "https://i0.hdslb.com/bfs/live/143f5ec3003b4080d1b5f817a9efdca46d631945.png",
          "honor_icon": "",
          "v2_medal_color_start": "#9660E5CC",
          "v2_medal_color_end": "#9660E5CC",
          "v2_medal_color_border": "#D47AFFFF",
          "v2_medal_color_text": "#FFFFFFFF",
          "v2_medal_color_level": "#6C00A099",
          "user_receive_count": 0
        },
        "tag": null,
        "is_pokeable": false
      },
      {
        "user_rank": 2,
        "uid": 7816639,
        "name": "在这样的时光",
        "face": "https://i1.hdslb.com/bfs/face/3b0091dda76e095351907e9c708b9571716aa3e1.jpg",
        "score": 50704568,
        "medal_name": "软饭兔",
        "level": 30,
        "target_id": 504140200,
        "special": "",
        "guard_level": 3,
        "medal_color_start": 2951253,
        "medal_color_end": 10329087,
        "medal_color_border": 6809855,
        "guard_icon": "https://i0.hdslb.com/bfs/live/143f5ec3003b4080d1b5f817a9efdca46d631945.png",
        "honor_icon": "",
        "uinfo_medal": {
          "name": "软饭兔",
          "level": 30,
          "color_start": 2951253,
          "color_end": 10329087,
          "color_border": 6809855,
          "color": 0,
          "id": 0,
          "typ": 0,
          "is_light": 1,
          "ruid": 504140200,
          "guard_level": 3,
          "score": 50704568,
          "guard_icon": "https://i0.hdslb.com/bfs/live/143f5ec3003b4080d1b5f817a9efdca46d631945.png",
          "honor_icon": "",
          "v2_medal_color_start": "#9660E5CC",
          "v2_medal_color_end": "#9660E5CC",
          "v2_medal_color_border": "#D47AFFFF",
          "v2_medal_color_text": "#FFFFFFFF",
          "v2_medal_color_level": "#6C00A099",
          "user_receive_count": 0
        },
        "tag": null,
        "is_pokeable": false
      }
    ],
    "num": 89,
    "medal_status": 1
  }
}
```

</details>
