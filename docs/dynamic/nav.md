# 获取导航栏动态

## 获取导航栏动态列表

> https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/nav

*请求方式: GET*

认证方式：Cookie(SESSDATA)

**URL参数:**

| 参数名          | 类型 | 内容       | 必要性 | 备注                    |
| --------------- | ---- | ---------- | ------ | ----------------------- |
| update_baseline | num  | 更新基线   | 非必要 | 获取新动态时使用        |
| offset          | num  | 分页偏移量 | 非必要 | 翻页时使用              |

**JSON回复:**

根对象：

| 字段    | 类型 | 内容     | 备注                       |
| ------- | ---- | -------- | -------------------------- |
| code    | num  | 返回值   | 0: 成功 <br />-101: 未登录 |
| message | str  | 错误信息 | 默认为0                    |
| ttl     | num  | 1        |                            |
| data    | obj  | 信息本体 |                            |

`data`对象:

| 字段            | 类型  | 内容                         | 备注                                               |
| --------------- | ----- | ---------------------------- | -------------------------------------------------- |
| has_more        | bool  | 是否有更多数据               |                                                    |
| items           | array | 数据数组                     |                                                    |
| offset          | str   | 偏移量                       | 等于`items`中最后一条记录的id<br/>获取下一页时使用 |
| update_baseline | str   | 更新基线                     | 等于`items`中第一条记录的id_str                    |
| update_num      | num   | 本次获取获取到了多少条新动态 | 在更新基线以上的动态条数                           |

`data`对象中`items`数组中的对象:

| 字段     | 类型 | 内容     | 备注                         |
| -------- | ---- | -------- | ---------------------------- |
| author   | obj  | UP主     | 参考 [MODULE_TYPE_AUTHOR](../opus/features.md#module-type-author) |
| cover    | str  | 封面URL  |                              |
| id_str   | str  | 动态id   |                              |
| pub_time | str  | 发布时间 | 文字表述的相对时间           |
| rid      | num  | 关联id   | 视频即aid                    |
| title    | str  | 标题     |                              |
| type     | num  | 动态类型 | 8: 视频                      |
| visible  | bool | 是否可见 | true：可见<br/>false：不可见 |

**示例:**

获取导航栏动态列表

```shell
curl "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/nav" \
  -b "SESSDATA=xxx"
```

<details>
<summary>查看响应示例：</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "has_more": true,
    "items": [
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/2b9ee4a9c99f1006f3c800c1317f7850ad6f3d0d.jpg",
          "jump_url": "//space.bilibili.com/485703766/dynamic",
          "mid": 485703766,
          "name": "英伟达GeForce",
          "official": {
            "desc": "",
            "role": 3,
            "title": "英伟达GeForce官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 2000563200000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/adb599797dd171e2d3d6d012f448b49679258344.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/sGu57N6pgK.png",
              "label_theme": "ten_annual_vip",
              "path": "",
              "text": "十年大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 7,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 1
          }
        },
        "cover": "http://i2.hdslb.com/bfs/archive/d38b239af580eb199b4bbe55d2388cb603f6e917.jpg",
        "id_str": "954636836111646759",
        "jump_url": "//www.bilibili.com/video/BV181421k7bu/",
        "pub_time": "1小时前",
        "rid": 1556082150,
        "title": "《异环》首曝丨即将支持 NVIDIA DLSS & 光线追踪技术",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i2.hdslb.com/bfs/archive/a220f26856924287c9dc4fa59c67ff38a2fcd20c.jpg",
        "id_str": "954616624230433048",
        "jump_url": "//www.bilibili.com/video/BV1RW421R7pE/",
        "pub_time": "2小时前",
        "rid": 1856122369,
        "title": "【夏色祭×可波】《カタオモイ》请感受这份传达给你的心意【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/1b7e4eaf6696038bb96ff38c6d13a6b3778d6a7c.jpg",
        "id_str": "954616624230432996",
        "jump_url": "//www.bilibili.com/video/BV15Z421u7MX/",
        "pub_time": "2小时前",
        "rid": 1156047704,
        "title": "Ready for my show！中日16位实力舞见高燃开场《唱》【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/5f22e930d0683b5e8d7a81f75b48fdb0c3a0f2e7.jpg",
        "id_str": "954616624229384275",
        "jump_url": "//www.bilibili.com/video/BV1hz421q7xP/",
        "pub_time": "2小时前",
        "rid": 1356132445,
        "title": "阿梓×尔东和小明倾情演出《暁の車》带你重温高达经典旋律【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i2.hdslb.com/bfs/archive/04b46154e833ea1349c3302f9b9c188a45b016e9.jpg",
        "id_str": "954616624228335667",
        "jump_url": "//www.bilibili.com/video/BV1LS421R7sr/",
        "pub_time": "2小时前",
        "rid": 1506089543,
        "title": "【Vox Akuma】声之恶魔低音爵士，深情演绎世界名曲【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i0.hdslb.com/bfs/archive/819d73ca191235e89a03c62889073d526b552fc2.jpg",
        "id_str": "954616624033300612",
        "jump_url": "//www.bilibili.com/video/BV1qM4m127wD/",
        "pub_time": "2小时前",
        "rid": 1306194854,
        "title": "【RAB】全 部 逮 捕！萝 莉 控 的 末 日【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i2.hdslb.com/bfs/archive/01dd21a65db17705479ee4ee550a79856847264e.jpg",
        "id_str": "954616624020717623",
        "jump_url": "//www.bilibili.com/video/BV1rZ421K7yT/",
        "pub_time": "2小时前",
        "rid": 1156076206,
        "title": "【可波×夏色祭】对你一见钟情啦！《5201314》开启绝赞告白【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/d79b28afc3273d5edb211d03ddc70c45999d57f7.jpg",
        "fold": {
          "ids": [
            "954616624019669009"
          ],
          "statement": "展开1条相关动态",
          "type": 3,
          "users": []
        },
        "id_str": "954616624019669032",
        "jump_url": "//www.bilibili.com/video/BV1oE421c7XV/",
        "pub_time": "2小时前",
        "rid": 1656233700,
        "title": "【洛天依】来自2024的《霜雪千年》还记否这一曲喜悲霜雪【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/93b809e050e639c9d8e8e379da96a4c2216ae755.jpg",
          "jump_url": "//space.bilibili.com/36081646/dynamic",
          "mid": 36081646,
          "name": "洛天依",
          "official": {
            "desc": "",
            "role": 2,
            "title": "2023年度原创音乐、洛天依官方账号",
            "type": 0
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1764777600000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/d79b28afc3273d5edb211d03ddc70c45999d57f7.jpg",
        "id_str": "954616624019669009",
        "jump_url": "//www.bilibili.com/video/BV1oE421c7XV/",
        "pub_time": "2小时前",
        "rid": 1656233700,
        "title": "【洛天依】来自2024的《霜雪千年》还记否这一曲喜悲霜雪【BML2024单品】",
        "type": 8,
        "visible": false
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/cbbbb6e35c7680261a8a1fb3f582e04de14cbb50.jpg",
        "id_str": "954616624002891844",
        "jump_url": "//www.bilibili.com/video/BV1Fb421H7YQ/",
        "pub_time": "2小时前",
        "rid": 1806140865,
        "title": "【ChiliChill】《我的悲伤是水做的》，描绘雨天的淡蓝色心情【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/b1f8744db9bad8a4a89bd9fa3fab0d128b347edb.jpg",
        "id_str": "954616623998697505",
        "jump_url": "//www.bilibili.com/video/BV12m421g759/",
        "pub_time": "2小时前",
        "rid": 1606234911,
        "title": "成为挣脱《Cage》的小鸟，露米Lumi深情吟唱人类希望之歌【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i2.hdslb.com/bfs/archive/52e82dc68f3cbbb598d27437c33e996718e07924.jpg",
        "id_str": "954616623995552002",
        "jump_url": "//www.bilibili.com/video/BV181421k74U/",
        "pub_time": "2小时前",
        "rid": 1556081716,
        "title": "型月组曲优雅串烧《若能看到明月》🌙🌙🌙【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i0.hdslb.com/bfs/archive/8558fe6746c43182b25f6a590f47b9673d47ba67.jpg",
        "id_str": "954616623994503209",
        "jump_url": "//www.bilibili.com/video/BV1jW421d7ce/",
        "pub_time": "2小时前",
        "rid": 1856192192,
        "title": "Finana Ryugu超甜演绎童年回忆《プレパレード》最清纯的恋爱预演~【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i2.hdslb.com/bfs/archive/1ebd8cbd38eb9db9451df9978b20bee445d8fea0.jpg",
        "id_str": "954616623993454708",
        "jump_url": "//www.bilibili.com/video/BV1cw4m1Y7Zs/",
        "pub_time": "2小时前",
        "rid": 1106145687,
        "title": "元气补给站《MORE!JUMP!MORE!》在BML舞台起跳！【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/bc1de2b7e27a5385e3e913fc552b86b744b49fb8.jpg",
        "id_str": "954616623990308904",
        "jump_url": "//www.bilibili.com/video/BV1QH4y1w7hC/",
        "pub_time": "2小时前",
        "rid": 1056107813,
        "title": "【星瞳】华丽演绎《迷宮バタフライ》🦋一曲重温童年之梦【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i0.hdslb.com/bfs/archive/63617f9210ab2e996f75e8e2fb46c5dc73aeed35.jpg",
        "id_str": "954616623980871832",
        "jump_url": "//www.bilibili.com/video/BV1L1421b7XJ/",
        "pub_time": "2小时前",
        "rid": 1556117158,
        "title": "奏响《葬送的破阵曲》，按捺不住战斗的心了！【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i1.hdslb.com/bfs/face/7cabb9c9576b4be8d52004d8a3a5450e5e062070.jpg",
          "jump_url": "//space.bilibili.com/403748305/dynamic",
          "mid": 403748305,
          "name": "BML制作指挥部",
          "official": {
            "desc": "",
            "role": 3,
            "title": "Bilibili Macro Link官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1750176000000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i0.hdslb.com/bfs/archive/c3c470e309acef1d8c8f2ce79ed753f9bca50879.jpg",
        "id_str": "954616623979823254",
        "jump_url": "//www.bilibili.com/video/BV1uy411B7Ca/",
        "pub_time": "2小时前",
        "rid": 1956028036,
        "title": "【猫MEME】转生成只能用MEME讲话的平凡上班族【BML2024单品】",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i0.hdslb.com/bfs/face/978ea07f22e54c2e62f01def8e815b59adacc5d0.jpg",
          "jump_url": "//space.bilibili.com/407045223/dynamic",
          "mid": 407045223,
          "name": "二次元的中科院物理所",
          "official": {
            "desc": "",
            "role": 6,
            "title": "中国科学院物理研究所官方账号",
            "type": 1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 1745769600000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
              "label_theme": "annual_vip",
              "path": "",
              "text": "年度大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 3,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 1626364800,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/056db2ac79801d853bebcd41c247788d8ccdb795.jpg",
        "id_str": "954609313946533894",
        "jump_url": "//www.bilibili.com/video/BV1Wz421q7n5/",
        "pub_time": "3小时前",
        "rid": 1356075945,
        "title": "暑期不失约！第六季《科学公开课》震撼来袭！",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i0.hdslb.com/bfs/face/7efb679569b2faeff38fa08f6f992fa1ada5e948.webp",
          "jump_url": "//space.bilibili.com/686127/dynamic",
          "mid": 686127,
          "name": "籽岷",
          "official": {
            "desc": "",
            "role": 1,
            "title": "2023百大UP主、知名游戏UP主",
            "type": 0
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {},
              "icon_type": 1
            },
            "avatar_subscript": 1,
            "avatar_subscript_url": "",
            "due_date": 4845196800000,
            "label": {
              "bg_color": "#FB7299",
              "bg_style": 1,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/c16005a5b39164b3536cbd45618a5edd597a1c51.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/Pzrd8zmpQD.png",
              "label_theme": "hundred_annual_vip",
              "path": "",
              "text": "百年大会员",
              "text_color": "#FFFFFF",
              "use_img_label": true
            },
            "nickname_color": "#FB7299",
            "role": 15,
            "status": 1,
            "theme_type": 0,
            "tv_due_date": 1692288000,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 2,
            "vip_pay_type": 1
          }
        },
        "cover": "http://i1.hdslb.com/bfs/archive/170237c4589a086afd7d62823765de1cc7306555.jpg",
        "id_str": "954478850029387784",
        "jump_url": "//www.bilibili.com/video/BV1Jz421q7JH/",
        "pub_time": "11小时前",
        "rid": 1356097140,
        "title": "我的世界 冷门原版生物娘化 材质包",
        "type": 8,
        "visible": true
      },
      {
        "author": {
          "face": "https://i0.hdslb.com/bfs/face/22e6b4f3c9199b6f4397f0d8df916872d677557b.jpg",
          "jump_url": "//space.bilibili.com/625267185/dynamic",
          "mid": 625267185,
          "name": "零度解说",
          "official": {
            "desc": "",
            "role": 0,
            "title": "",
            "type": -1
          },
          "vip": {
            "avatar_icon": {
              "icon_resource": {}
            },
            "avatar_subscript": 0,
            "avatar_subscript_url": "",
            "due_date": 0,
            "label": {
              "bg_color": "",
              "bg_style": 0,
              "border_color": "",
              "img_label_uri_hans": "",
              "img_label_uri_hans_static": "https://i0.hdslb.com/bfs/vip/d7b702ef65a976b20ed854cbd04cb9e27341bb79.png",
              "img_label_uri_hant": "",
              "img_label_uri_hant_static": "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/KJunwh19T5.png",
              "label_theme": "",
              "path": "",
              "text": "",
              "text_color": "",
              "use_img_label": true
            },
            "nickname_color": "",
            "role": 0,
            "status": 0,
            "theme_type": 0,
            "tv_due_date": 0,
            "tv_vip_pay_type": 0,
            "tv_vip_status": 0,
            "type": 0,
            "vip_pay_type": 0
          }
        },
        "cover": "http://i0.hdslb.com/bfs/archive/6f0397b546ba4da15fcd9a2e06cbcc1f68e5545c.jpg",
        "id_str": "954376956212674594",
        "jump_url": "//www.bilibili.com/video/BV141421b7sf/",
        "pub_time": "昨天 20:30",
        "rid": 1556122058,
        "title": "快速提升上网速度！免费又好用，适用 Windows 10 /11，非常简单！！（2024） | 零度解说",
        "type": 8,
        "visible": true
      }
    ],
    "offset": "954376956212674594",
    "update_baseline": "954659517801431040",
    "update_num": 0
  }
}
```

</details>

## 获取正在直播的已关注UP主列表

> https://api.bilibili.com/x/polymer/web-dynamic/v1/live-up

*请求方式：GET*

认证方式：Cookie (SESSDATA)

**url参数：**

| 参数名        | 类型 | 内容         | 必要性 | 备注 |
| ------------- | ---- | ------------ | ------ | ---- |
| web_location  | str  | 页面定位标识 | 非必要 |      |

**json回复：**

根对象：

| 字段    | 类型 | 内容     | 备注          |
| ------- | ---- | -------- | ------------- |
| code    | num  | 返回值   | 0：成功       |
| message | str  | 错误信息 | 默认为 0      |
| ttl     | num  | 1        |               |
| data    | obj  | 信息本体 |               |

`data`对象：

| 字段   | 类型  | 内容             | 备注         |
| ------ | ----- | ---------------- | ------------ |
| count  | num   | 正在直播的UP主数 |              |
| items  | array | 直播UP主列表     |              |

`data`中的`items`数组中的对象：

| 字段              | 类型  | 内容         | 备注                     |
| ----------------- | ----- | ------------ | ------------------------ |
| face              | str   | UP主头像URL  |                          |
| is_reserve_recall | bool  | 是否预约回放 |                          |
| link              | str   | 直播间链接   |                          |
| mid               | num   | UP主mid      |                          |
| uname             | str   | UP主名称     |                          |

<details>
<summary>查看响应示例：</summary>

```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "count": 1,
        "items": [
            {
                "face": "https://i0.hdslb.com/bfs/face/d0516b7382fd0199232cd60fab540fb3a2688e19.jpg",
                "is_reserve_recall": false,
                "link": "https://live.bilibili.com/1029",
                "mid": 43536,
                "uname": "黑桐谷歌"
            }
        ]
    }
}
```

</details>

## 获取动态入口信息

> https://api.bilibili.com/x/web-interface/dynamic/entrance

*请求方式：GET*

认证方式：Cookie (SESSDATA)

**url参数：**

| 参数名            | 类型 | 内容             | 必要性 | 备注 |
| ----------------- | ---- | ---------------- | ------ | ---- |
| alltype_offset    | num  | 全类型偏移量     | 非必要 |      |
| video_offset      | num  | 视频类型偏移量   | 非必要 |      |
| article_offset    | num  | 文章类型偏移量   | 非必要 |      |
| web_location      | str  | 页面定位标识     | 非必要 |      |

**json回复：**

根对象：

| 字段    | 类型 | 内容     | 备注          |
| ------- | ---- | -------- | ------------- |
| code    | num  | 返回值   | 0：成功       |
| message | str  | 错误信息 | 默认为 OK     |
| ttl     | num  | 1        |               |
| data    | obj  | 信息本体 |               |

`data`对象：

| 字段            | 类型  | 内容           | 备注 |
| --------------- | ----- | -------------- | ---- |
| entrance        | obj   | 入口信息       |      |
| update_info     | obj   | 更新信息       |      |
| dyn_basic_infos | array | 动态基础信息   |      |

`data`中的`entrance`对象：

| 字段  | 类型 | 内容          | 备注                  |
| ----- | ---- | ------------- | --------------------- |
| icon  | str  | 入口头像URL   |                       |
| mid   | num  | UP主mid       |                       |
| type  | str  | 入口类型      | dyn：动态             |

`data`中的`update_info`对象：

| 字段 | 类型 | 内容     | 备注                  |
| ---- | ---- | -------- | --------------------- |
| type | str  | 更新类型 | count：计数           |
| item | obj  | 更新详情 |                       |

`update_info`中的`item`对象：

| 字段  | 类型 | 内容         | 备注 |
| ----- | ---- | ------------ | ---- |
| count | num  | 新动态数量   |      |

<details>
<summary>查看响应示例：</summary>

```json
{
    "code": 0,
    "message": "OK",
    "ttl": 1,
    "data": {
        "entrance": {
            "icon": "https://i0.hdslb.com/bfs/face/48469a84187484653a3fb913c7c4ca01df3d1fd7.jpg",
            "mid": 59550906,
            "type": "dyn"
        },
        "update_info": {
            "type": "count",
            "item": {
                "count": 1
            }
        },
        "dyn_basic_infos": []
    }
}
```

</details>

## 动态发布初始化检查

> https://api.bilibili.com/x/dynamic/feed/create/init_check

*请求方式：GET*

认证方式：Cookie (SESSDATA)

**url参数：**

| 参数名                  | 类型 | 内容         | 必要性 | 备注 |
| ----------------------- | ---- | ------------ | ------ | ---- |
| scene                   | num  | 场景值       | 非必要 | 1    |
| web_location            | str  | 页面定位标识 | 非必要 |      |
| x-bili-device-req-json  | str  | 设备信息JSON | 非必要 |      |

**json回复：**

根对象：

| 字段    | 类型 | 内容     | 备注     |
| ------- | ---- | -------- | -------- |
| code    | num  | 返回值   | 0：成功  |
| message | str  | 错误信息 | 默认为OK |
| ttl     | num  | 1        |          |
| data    | obj  | 信息本体 |          |

`data`对象：

| 字段        | 类型 | 内容     | 备注 |
| ----------- | ---- | -------- | ---- |
| settings    | obj  | 发布设置 |      |
| permissions | obj  | 发布权限 |      |

`data`中的`settings`对象：

| 字段                         | 类型 | 内容             | 备注 |
| ---------------------------- | ---- | ---------------- | ---- |
| max_upload_size              | num  | 最大上传大小     |      |
| max_content_length           | num  | 最大内容长度     |      |
| max_at_count                 | num  | 最大@人数        |      |
| max_draft_count              | num  | 最大草稿数       |      |
| max_pic_count_type           | num  | 最大图片数量类型 |      |
| max_title_length             | num  | 最大标题长度     |      |
| max_content_length_onlyfans  | num  | 专属粉丝最大长度 |      |

`data`中的`permissions`对象：

| 字段              | 类型 | 内容         | 备注 |
| ----------------- | ---- | ------------ | ---- |
| archive           | obj  | 视频投稿权限 |      |
| control_comment   | obj  | 评论控制权限 |      |
| choose_comment    | obj  | 精选评论权限 |      |
| live_reserve      | obj  | 直播预约权限 |      |
| public_pub        | obj  | 公开发布权限 |      |
| private_pub       | obj  | 私密发布权限 |      |
| aigc              | obj  | AIGC相关权限 |      |

`permissions`各子对象：

| 字段       | 类型 | 内容         | 备注 |
| ---------- | ---- | ------------ | ---- |
| title      | str  | 权限标题     |      |
| desc       | str  | 权限描述     |      |
| allowable  | bool | 是否允许     |      |

<details>
<summary>查看响应示例：</summary>

```json
{
    "code": 0,
    "message": "OK",
    "ttl": 1,
    "data": {
        "settings": {
            "max_upload_size": 8388608,
            "max_content_length": 2000,
            "max_at_count": 10,
            "max_draft_count": 50,
            "max_pic_count_type": 9,
            "max_title_length": 20,
            "max_content_length_onlyfans": 2000
        },
        "permissions": {
            "archive": {
                "title": "视频投稿",
                "allowable": true
            },
            "control_comment": {
                "title": "评论管理",
                "desc": "可开启评论精选",
                "allowable": true
            },
            "choose_comment": {
                "title": "精选评论",
                "desc": "",
                "allowable": true
            },
            "live_reserve": {
                "title": "直播预约",
                "allowable": true
            },
            "public_pub": {
                "allowable": true
            },
            "private_pub": {
                "allowable": true
            },
            "aigc": {
                "title": "AIGC声明",
                "desc": "",
                "allowable": true
            }
        }
    }
}
```

</details>

## 获取定时动态数量

> https://api.bilibili.com/x/dynamic/feed/timing_dyn/count

*请求方式：GET*

认证方式：Cookie (SESSDATA)

**url参数：**

| 参数名        | 类型 | 内容         | 必要性 | 备注 |
| ------------- | ---- | ------------ | ------ | ---- |
| web_location  | str  | 页面定位标识 | 非必要 |      |

**json回复：**

根对象：

| 字段    | 类型 | 内容     | 备注     |
| ------- | ---- | -------- | -------- |
| code    | num  | 返回值   | 0：成功  |
| message | str  | 错误信息 | 默认为OK |
| ttl     | num  | 1        |          |
| data    | obj  | 信息本体 |          |

<details>
<summary>查看响应示例：</summary>

```json
{
    "code": 0,
    "message": "OK",
    "ttl": 1,
    "data": {}
}
```

</details>

## 获取动态卡片类型

> https://api.bilibili.com/x/web-interface/dynamic/card/type

*请求方式：GET*

认证方式：Cookie (SESSDATA)

**url参数：**

| 参数名        | 类型 | 内容         | 必要性 | 备注 |
| ------------- | ---- | ------------ | ------ | ---- |
| web_location  | str  | 页面定位标识 | 非必要 |      |

**json回复：**

根对象：

| 字段    | 类型 | 内容     | 备注     |
| ------- | ---- | -------- | -------- |
| code    | num  | 返回值   | 0：成功  |
| message | str  | 错误信息 | 默认为OK |
| ttl     | num  | 1        |          |
| data    | null | 信息本体 |          |

<details>
<summary>查看响应示例：</summary>

```json
{
    "code": 0,
    "message": "OK",
    "ttl": 1,
    "data": null
}
```

</details>
