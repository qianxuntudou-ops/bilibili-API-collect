# 直播首页相关接口

## 获取首页中心入口显示状态

> https://api.live.bilibili.com/xlive/mcn-interface/v1/homePage/CenterEntryIsShow

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| 无 | | | | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| ttl | num | 1 | |
| data | obj | 信息本体 | |

`data`对象：

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| activity_card_v2 | obj | 活动卡片V2 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| navbar | bool | 是否显示导航栏 | |
| sidebar | bool | 是否显示侧边栏 | |
| footer | bool | 是否显示页脚 | |
| url | str | 中心入口URL | |

**示例:**

```shell
curl 'https://api.live.bilibili.com/xlive/mcn-interface/v1/homePage/CenterEntryIsShow'
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "navbar": true,
    "sidebar": true,
    "footer": true,
    "url": "https://live.bilibili.com/galaxy"
  }
}
```

</details>

---

## 获取新版排行榜顶部

> https://api.live.bilibili.com/room/v2/Index/getNewRankTop

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| type | str | 排行榜类型 | 非必要 | 如: guard |
| web_location | str | Web位置 | 非必要 | 如: 444.7 |
| w_rid | str | WBI签名 | 非必要 | |
| wts | num | 时间戳 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | array | 排行榜数据 | |

`data`数组中的对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| room_id | num | 直播间ID | |
| uid | num | 主播UID | |
| online | num | 在线人数 | |
| title | str | 直播间标题 | |
| flag | num | 标志 | |
| watched_show | obj | 观看数据显示 | |
| face | str | 主播头像 | |
| uname | str | 主播昵称 | |
| is_verify | num | 是否认证 | |
| is_nft | num | 是否NFT | |
| nft_dmark | str | NFT标识 | |
| room_head_box | str | 房间头像框 | |
| box_type | num | 框类型 | |

**示例:**

```shell
curl -G 'https://api.live.bilibili.com/room/v2/Index/getNewRankTop' \
--data-urlencode 'type=guard'
```

---

## 获取导航信息

> https://api.live.bilibili.com/room/v2/Index/getNavigate

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
| data | array | 导航数据 | |

---

## 获取热门排行榜

> https://api.live.bilibili.com/xlive/web-interface/v1/index/getHotRankList

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| w_rid | str | WBI签名 | 非必要 | |
| wts | num | 时间戳 | 非必要 | |
| web_location | str | Web位置 | 非必要 | 如: 444.7 |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 信息本体 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| list | array | 排行榜列表 | |
| count | num | 总数 | |

`list`数组中的对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| roomid | num | 直播间ID | |
| uid | num | 主播UID | |
| uname | str | 主播昵称 | |
| face | str | 主播头像 | |
| title | str | 直播间标题 | |
| area_v2_id | num | 分区ID | |
| area_v2_name | str | 分区名称 | |
| area_v2_parent_name | str | 父分区名称 | |
| area_v2_parent_id | num | 父分区ID | |
| online | num | 在线人数 | |
| live_status | num | 直播状态 | 1: 直播中 |
| rank | num | 排名 | |
| user_num | num | 助力人数 | |
| user_num_text | str | 助力人数文本 | |
| score | num | 分数 | |
| score_text | str | 分数文本 | |
| head_box | obj | 头像框信息 | |
| head_box_type | num | 头像框类型 | |

---

## 获取Web分区列表

> https://api.live.bilibili.com/xlive/web-interface/v1/index/getWebAreaList

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
| data | array | 分区列表 | |
| expid | num | 实验ID | 未知 |

---

## 获取直播列表

> https://api.live.bilibili.com/xlive/web-interface/v1/index/getList

*请求方式: GET*

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| web_location | str | Web位置 | 非必要 | |
| w_rid | str | WBI签名 | 非必要 | |
| wts | num | 时间戳 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | |
| data | obj | 信息本体 | |

---

## 获取分区遮罩

> https://api.live.bilibili.com/xlive/web-interface/v1/index/getAreaMask

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
| data | obj | 遮罩信息 | |
