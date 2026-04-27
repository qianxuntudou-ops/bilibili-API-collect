# 直播间分区

## 获取全部直播间分区列表

> https://api.live.bilibili.com/room/v1/Area/getList

*请求方式：GET*

直播分区共有两级，分别是父分区和子分区

**json回复：**

根对象：

| 字段    | 类型   | 内容       | 备注          |
| ------- | ------ | ---------- | ------------- |
| code    | num    | 返回值     | 0：成功       |
| msg     | str    | 错误信息   | 默认为success |
| message | str    | 错误信息   | 默认为success |
| data    | array | 父分区列表 |               |

`data`数组：

| 项   | 类型 | 内容        | 备注 |
| ---- | ---- | ----------- | ---- |
| 0    | obj  | 父分区1     |      |
| n    | obj  | 父分区(n+1) |      |
| ……   | obj  | ……          | ……   |

`data`数组中的对象：

| 字段 | 类型 | 内容       | 备注 |
| ---- | ---- | ---------- | ---- |
| id   | num  | 父分区id   |      |
| name | name | 父分区名   |      |
| list | list | 子分区列表 |      |

`data`数组中的对象中的`list`数组：

| 项   | 类型 | 内容        | 备注 |
| ---- | ---- | ----------- | ---- |
| 0    | obj  | 子分区1     |      |
| n    | obj  | 子分区(n+1) |      |
| ……   | obj  | ……          | ……   |

`list`数组中的对象：

| 字段        | 类型 | 内容              | 备注             |
| ----------- | ---- | ----------------- | ---------------- |
| id          | str  | 子分区id          |                  |
| parent_id   | str  | 父分区id          |                  |
| old_area_id | str  | 旧分区id          |                  |
| name        | str  | 子分区名          |                  |
| act_id      | str  | 0                 | **作用尚不明确** |
| pk_status   | str  | ？？？            | **作用尚不明确** |
| hot_status  | num  | 是否为热门分区    | 0：否<br />1：是 |
| lock_status | str  | 0                 | **作用尚不明确** |
| pic         | str  | 子分区标志图片url |                  |
| parent_name | str  | 父分区名          |                  |
| area_type   | num  |                   |                  |

**示例：**

如想在`网游`父分区下的`英雄联盟`分区开播，则查到子分区id为`86`

```shell
curl 'https://api.live.bilibili.com/room/v1/Area/getList'
```

<details>
<summary>查看响应示例：</summary>

```json
{
    "code": 0,
    "msg": "success",
    "message": "success",
    "data": [
        {
            "id": 2,
            "name": "网游",
            "list": [
                {
                    "id": "86",
                    "parent_id": "2",
                    "old_area_id": "4",
                    "name": "英雄联盟",
                    "act_id": "0",
                    "pk_status": "0",
                    "hot_status": 1,
                    "lock_status": "0",
                    "pic": "http://i0.hdslb.com/bfs/vc/dcfb14f14ec83e503147a262e7607858b05d7ac0.png",
                    "parent_name": "网游",
                    "area_type": 0
                },
                {
                    "id": "252",
                    "parent_id": "2",
                    "old_area_id": "3",
                    "name": "逃离塔科夫",
                    "act_id": "0",
                    "pk_status": "0",
                    "hot_status": 1,
                    "lock_status": "0",
                    "pic": "http://i0.hdslb.com/bfs/vc/762a7de3dd5fe8165d1d55b232484a017941592f.png",
                    "parent_name": "网游",
                    "area_type": 0
                },
                {
                    "id": "80",
                    "parent_id": "2",
                    "old_area_id": "1",
                    "name": "绝地求生",
                    "act_id": "0",
                    "pk_status": "0",
                    "hot_status": 1,
                    "lock_status": "0",
                    "pic": "http://i0.hdslb.com/bfs/vc/43ca83fdcd10505eaeef1b76cf8ce642a53b94da.png",
                    "parent_name": "网游",
                    "area_type": 0
                },
               …………
            ]
        },
        {
            "id": 3,
            "name": "手游",
            "list": [
                {
                    "id": "35",
                    "parent_id": "3",
                    "old_area_id": "12",
                    "name": "王者荣耀",
                    "act_id": "0",
                    "pk_status": "0",
                    "hot_status": 1,
                    "lock_status": "0",
                    "pic": "http://i0.hdslb.com/bfs/vc/0fefa924760b2dd492a12dddafe179bfa1216918.png",
                    "parent_name": "手游",
                    "area_type": 0
                },
               …………
            ]
        },
        {
            "id": 6,
            "name": "单机",
            "list": [
                {
                    "id": "236",
                    "parent_id": "6",
                    "old_area_id": "1",
                    "name": "主机游戏",
                    "act_id": "0",
                    "pk_status": "0",
                    "hot_status": 1,
                    "lock_status": "0",
                    "pic": "http://i0.hdslb.com/bfs/vc/edb636ee59f902e3134a2790545045bddd70978e.png",
                    "parent_name": "单机",
                    "area_type": 0
                },
               …………
            ]
        },
        {
            "id": 1,
            "name": "娱乐",
            "list": [
                {
                    "id": "21",
                    "parent_id": "1",
                    "old_area_id": "10",
                    "name": "视频唱见",
                    "act_id": "0",
                    "pk_status": "1",
                    "hot_status": 1,
                    "lock_status": "0",
                    "pic": "http://i0.hdslb.com/bfs/vc/72b93ddafdf63c9f0b626ad546847a3c03c92b6f.png",
                    "cate_id": "12",
                    "parent_name": "娱乐",
                    "area_type": 0
                },
                …………
            ]
        },
        {
            "id": 5,
            "name": "电台",
            "list": [
                {
                    "id": "190",
                    "parent_id": "5",
                    "old_area_id": "10",
                    "name": "唱见电台",
                    "act_id": "0",
                    "pk_status": "0",
                    "hot_status": 0,
                    "lock_status": "0",
                    "pic": "http://i0.hdslb.com/bfs/vc/d22d7fafbf9b24e2bc3ce1df5eb9f006e6035e5d.png",
                    "parent_name": "电台",
                    "area_type": 0
                },
                …………
            ]
        }
    ]
}
```

</details>

---

## 获取分区直播间数量

> https://api.live.bilibili.com/room/v1/Area/getLiveRoomCountByAreaID

*请求方式: GET*

认证方式：无（无需Cookie）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| areaId | num | 分区ID | 必要 | 0为全部 |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| msg | str | 错误信息 | |
| message | str | 错误信息 | |
| data | obj | 数据 | |

`data`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| num | num | 直播间数量 | |

---

## 获取分区直播间列表

> https://api.live.bilibili.com/xlive/web-interface/v1/second/getListByArea

*请求方式: GET*

认证方式：WBI签名（需w_rid, wts, w_webid参数）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| sort | str | 排序方式 | 必要 | dynamic: 动态排序; online: 人气排序 |
| page | num | 页数 | 必要 | |
| page_size | num | 每页数量 | 必要 | |
| platform | str | 平台 | 必要 | web |
| web_location | str | Web位置 | 非必要 | |
| w_webid | str/JWT | WBI标识 | 必要 | WBI签名所需 |
| w_rid | str | WBI签名 | 必要 | |
| wts | num | WBI时间戳 | 必要 | 10位时间戳 |

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
| list | array | 直播间列表 | |
| has_more | num | 是否有更多 | 0: 否; 1: 是 |

`data.list`数组中的对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| roomid | num | 直播间ID | |
| uid | num | 主播UID | |
| title | str | 直播间标题 | |
| uname | str | 主播名称 | |
| online | num | 人气值 | |
| user_cover | str | 用户封面URL | |
| user_cover_flag | num | 用户封面标识 | 未知 |
| system_cover | str | 系统封面URL | |
| cover | str | 封面URL | |
| show_cover | str | 展示封面URL | |
| link | str | 直播间链接 | |
| face | str | 主播头像URL | |
| parent_id | num | 父分区ID | |
| parent_name | str | 父分区名称 | |
| area_id | num | 子分区ID | |
| area_name | str | 子分区名称 | |
| area_v2_parent_id | num | V2父分区ID | |
| area_v2_parent_name | str | V2父分区名称 | |
| area_v2_id | num | V2子分区ID | |
| area_v2_name | str | V2子分区名称 | |
| session_id | str | 会话ID | |
| group_id | num | 分组ID | |
| show_callback | str | 展示回调URL | 用于数据埋点 |
| click_callback | str | 点击回调URL | 用于数据埋点 |
| web_pendent | str | Web挂件信息 | |
| pk_id | num | PK标识 | |
| pendant_info | obj | 挂件信息 | |
| verify | obj | 认证信息 | |
| head_box | str/null | 头像框 | |
| head_box_type | num | 头像框类型 | |
| is_auto_play | num | 是否自动播放 | |
| flag | num | 标识位 | |
| watched_show | obj | 观看人数展示 | |
| is_nft | num | 是否NFT | |
| nft_dmark | str | NFT标识 | |
| play_together_goods | null | 一起玩商品信息 | |
| watermark | str | 水印 | |
| trackid | str | 追踪ID | 用于推荐算法 |
| is_ai | bool | 是否AI直播间 | |
| live_key | str | 直播标识 | |
| sub_session_key | str | 子会话标识 | |
