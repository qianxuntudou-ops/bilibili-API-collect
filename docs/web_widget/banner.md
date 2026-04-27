# 横幅轮播图

## 获取各分区的轮播图_web端

> https://api.bilibili.com/x/web-show/region/banner

*请求方式: GET*

需要请求头参数 User-Agent

鉴权方式：Wbi 签名 (可选)

**URL参数:**

| 字段      | 类型  | 内容      | 必要性   |  备注          |
| -------   | ---- | --------  | ------- | -------------- |
| region_id | num  | 目标分区id | 必要    | 参见[视频分区一览v2](../video/video_zone_v2.md) |
| w_rid     | str  | Wbi 签名   | 非必要  | 详见 [Wbi 签名](../misc/sign/wbi.md) |
| wts       | num  | 当前时间戳	 | 非必要  | 详见 [Wbi 签名](../misc/sign/wbi.md) |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| -- | -- | -- | -- |
| code | num | 返回值 | 0: 成功 |
| message | str | 错误信息 | 默认为 0 |
| ttl | str | 1 | |
| data | obj | 信息本体 | |

`data` 对象:

| 字段 | 类型 | 内容 | 备注 |
| -- | -- | -- | -- |
| region_banner_list | array | 存储轮播图的对象 | |

`data` 对象里的 `region_banner_list` 数组:

| 项 | 类型 | 内容 | 备注 |
| -- | -- | -- | -- | 
| 0 | obj | 第一个轮播图对象 | |
| n | obj | 第 (n+1) 轮播图对象 | |
| …… | obj | …… | |

`region_banner_list` 数组里的对象:

| 字段 | 类型 | 内容 | 备注 |
| -- | -- | -- | -- |
| image | str | 封面资源路径 | |
| title | str | 封面标题 | |
| sub_title | str | 封面子标题 | 空 |
| url | str | 点击封面后指向的链接 | 可能为视频地址，也有可能是活动地址 |
| rid | num | 分区参见[视频分区一览v2](../video/video_zone_v2.md) | |

**示例:**

获取 `音乐区` 时刻为 `Wed, 06 Aug 2025 01:41:35 GMT` 的 B 站轮播图 [音乐区地址](https://www.bilibili.com/c/music/)

```shell
curl -G "https://api.bilibili.com/x/web-show/region/banner" \
      --data-urlencode "region_id=1003" \
      -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko Chrome/58.0.3029.110 Safari/537.36"
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "region_banner_list": [
      {
        "image": "http://i0.hdslb.com/bfs/app/61e4bf3bba74f7d975342ae9d6ec7b0a2ea7c83f.jpg",
        "title": "舞力全开派对首测共创活动上线啦！",
        "sub_title": "",
        "url": "https://www.bilibili.com/blackboard/era/wzjckpevcdCgf4Rv.html",
        "rid": 1003
      },
      {
        "image": "http://i0.hdslb.com/bfs/app/a7d63dc78d10f769bd80c6c27ba6cc337b00d9d9.jpg",
        "title": "玛莎拉达带着他的一系列爆款术曲来了！",
        "sub_title": "",
        "url": "https://www.bilibili.com/video/BV1Tbtjz1Ehv",
        "rid": 1003
      },
      {
        "image": "http://i0.hdslb.com/bfs/app/01beb60c493f98eea6844cc2efcbde7315ce6224.jpg",
        "title": "陶喆Alin合作曲MV首播！",
        "sub_title": "",
        "url": "https://www.bilibili.com/video/BV1w1tnznEMw/?spm_id_from=333.337.search-card.all.click",
        "rid": 1003
      },
      {
        "image": "http://i0.hdslb.com/bfs/app/64060527172b03292b860e43532ff56faabdbe2d.jpg",
        "title": "四种语言版《AMANI》：愿世界和平",
        "sub_title": "",
        "url": "https://www.bilibili.com/video/BV1WTgVzHE2S/",
        "rid": 1003
      },
      {
        "image": "http://i0.hdslb.com/bfs/app/cbc4469b10c041702c49e847552301afeea323cd.jpg",
        "title": "孙亦航来B站啦！",
        "sub_title": "",
        "url": "https://www.bilibili.com/video/BV1RHtFzLEUA",
        "rid": 1003
      },
      {
        "image": "http://i0.hdslb.com/bfs/app/134cede692acbbe3080dc2a2ecc920db1f4f7498.jpg",
        "title": "潘玮柏狂爱《Yes I Do》",
        "sub_title": "",
        "url": "https://www.bilibili.com/video/BV1RAtcz7EJX/?spm_id_from=333.337.search-card.all.click",
        "rid": 1003
      }
    ]
  }
}
```
</details>

* Tip: 可以使用 [图片格式化](../misc/picture.md)中 获取主色调的方式获取轮播图封面的主色调

## 获取资源位内容

> https://api.bilibili.com/x/web-show/res/locs

*请求方式：GET*

鉴权方式：Wbi 签名 (可选)

**url参数：**

| 参数名        | 类型 | 内容               | 必要性 | 备注                                    |
| ------------- | ---- | ------------------ | ------ | --------------------------------------- |
| pf            | num  | 平台标识           | 非必要 | 0：pc                                   |
| ids           | str  | 资源位id（逗号分隔） | 必要   | 如 "3449"，可同时请求多个，逗号分隔      |
| web_location  | str  | 页面定位标识       | 非必要 |                                         |
| w_rid         | str  | Wbi 签名           | 非必要 | 详见 [Wbi 签名](../misc/sign/wbi.md)    |
| wts           | num  | 当前时间戳         | 非必要 | 详见 [Wbi 签名](../misc/sign/wbi.md)    |

**json回复：**

根对象：

| 字段         | 类型  | 内容         | 备注     |
| ------------ | ----- | ------------ | -------- |
| ads_control  | obj   | 广告控制信息 |          |
| code         | num   | 返回值       | 0：成功  |
| count        | num   | 资源位数量   |          |
| data         | obj   | 信息本体     |          |
| message      | str   | 错误信息     | 默认为OK |

`ads_control`对象：

| 字段                            | 类型  | 内容               | 备注 |
| ------------------------------- | ----- | ------------------ | ---- |
| has_danmu                       | num   | 是否有弹幕         |      |
| under_player_scroller_seconds   | num   | 播放器下方滚动秒数 |      |
| has_live_booking_ad             | bool  | 是否有直播预约广告 |      |

`data`对象：

键为资源位id（字符串），值为该资源位下的内容数组。

`data`数组中的对象：

| 字段           | 类型  | 内容         | 备注                  |
| -------------- | ----- | ------------ | --------------------- |
| id             | num   | 资源内容id   |                       |
| contract_id    | str   | 合同id       |                       |
| res_id         | num   | 资源id       |                       |
| pos_num        | num   | 位置编号     |                       |
| name           | str   | 名称         |                       |
| pic            | str   | 封面URL      |                       |
| url            | str   | 跳转链接     |                       |
| litpic         | str   | 小图URL      |                       |
| style          | num   | 样式         |                       |
| agency         | str   | 代理信息     |                       |
| label          | str   | 标签         |                       |
| intro          | str   | 介绍         |                       |
| creative_type  | num   | 创意类型     |                       |
| src_id         | num   | 来源id       |                       |
| area           | num   | 区域         |                       |
| is_ad_loc      | bool  | 是否广告位   |                       |
| ad_cb          | str   | 广告回调     |                       |
| title          | str   | 标题         |                       |
| server_type    | num   | 服务器类型   |                       |
| cm_mark        | num   | 广告标记     |                       |
| stime          | num   | 开始时间     | 秒级时间戳            |
| mid            | str   | 用户mid      |                       |
| activity_type  | num   | 活动类型     |                       |

<details>
<summary>查看响应示例：</summary>

```json
{
    "ads_control": {
        "has_danmu": 0,
        "under_player_scroller_seconds": 0,
        "has_live_booking_ad": false
    },
    "code": 0,
    "count": 1,
    "data": {
        "3449": [
            {
                "id": 1753178,
                "contract_id": "rec_video",
                "res_id": 3450,
                "pos_num": 1,
                "name": "【预告】15点直播 春季赛第四周 小组赛",
                "pic": "https://i0.hdslb.com/bfs/live-key-frame/keyframe04161406001921272912bqsw2c.jpg",
                "url": "https://live.bilibili.com/1921272912",
                "litpic": "",
                "style": 0,
                "agency": "",
                "label": "",
                "intro": "",
                "creative_type": 0,
                "src_id": 3450,
                "area": 1,
                "is_ad_loc": false,
                "ad_cb": "",
                "title": "",
                "server_type": 0,
                "cm_mark": 0,
                "stime": 1776322800,
                "mid": "8126584",
                "activity_type": 0
            }
        ]
    },
    "message": "OK"
}
```

</details>

## 获取资源位内容（Wbi签名版）

> https://api.bilibili.com/x/web-show/wbi/res/locs

*请求方式：GET*

鉴权方式：Wbi 签名 (推荐)

**url参数：**

| 参数名        | 类型 | 内容               | 必要性 | 备注                                    |
| ------------- | ---- | ------------------ | ------ | --------------------------------------- |
| pf            | num  | 平台标识           | 非必要 | 0：pc                                   |
| ids           | str  | 资源位id（逗号分隔） | 必要   | 如 "2837,2836,2870"                     |
| web_location  | str  | 页面定位标识       | 非必要 |                                         |
| w_rid         | str  | Wbi 签名           | 推荐   | 详见 [Wbi 签名](../misc/sign/wbi.md)    |
| wts           | num  | 当前时间戳         | 推荐   | 详见 [Wbi 签名](../misc/sign/wbi.md)    |

**json回复：**

与 [获取资源位内容](#获取资源位内容) 接口格式一致。

<details>
<summary>查看响应示例：</summary>

```json
{
    "ads_control": {
        "has_danmu": 0,
        "under_player_scroller_seconds": 0,
        "has_live_booking_ad": false
    },
    "code": 0,
    "count": 1,
    "data": {
        "2836": null,
        "2837": null,
        "2870": null,
        "2953": null,
        "2954": null,
        "2955": null,
        "2956": null,
        "5672": null
    },
    "message": "OK"
}
```

</details>
