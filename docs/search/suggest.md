# 搜索建议

## 获取搜索建议关键词（web端）

> https://s.search.bilibili.com/main/suggest

*请求方式：GET*

搜索建议最多提供10个候选关键词

搜索建议内容可为任意语言（中 英 日等....），中文拼音支持全拼联想词

**url参数：**

| 参数名          | 类型 | 内容                   | 必要性 | 备注                     |
| --------------- | ---- | ---------------------- | ------ | ------------------------ |
| term            | str  | 需要获得建议的输入内容 | 必要   |                          |
| main_ver        | str  | v1                     | 非必要 | 默认为 `v1`              |
| highlight       | str  | 任意, 无明显作用       | 非必要 | 默认为空                 |
| func            | str  | 函数?                  | 非必要 | 默认为 `suggest`         |
| suggest_type    | str  | 建议类型?              | 非必要 | 默认为 `accurate`        |
| sub_type        | str  | 子类型?                | 非必要 | 默认为 `tag`             |
| userid          | num  | 本用户 mid             | 非必要 | 可能用于个性化推荐       |
| bangumi_acc_num | num  | 番剧累积数?            | 非必要 | 默认为 `1`               |
| special_acc_num | num  | 特殊累积数?            | 非必要 | 默认为 `1`               |
| topic_acc_num   | num  | 话题累积数?            | 非必要 | 默认为 `1`               |
| upuser_acc_num  | num  | UP主累积数?            | 非必要 | 默认为 `1`               |
| tag_num         | num  | Tag 数?                | 非必要 | 默认为 `10`              |
| special_num     | num  | 特殊推荐数?            | 非必要 | 默认为 `10`              |
| bangumi_num     | num  | 番剧推荐数?            | 非必要 | 默认为 `10`              |
| upuser_num      | num  | UP主推荐数?            | 非必要 | 默认为 `3`               |
| rnd             | num  | 一个随机浮点数         | 非必要 | 由 `Math.random()` 生成? |
| buvid           | str  | 同 Cookie 中 buvid3    | 非必要 |                          |
| spmid           | str  | 333.1007               | 非必要 |                          |

**json回复：**

根对象：

| 字段        | 类型 | 内容         | 备注         |
| ----------- | ---- | ------------ | ------------ |
| exp_str     | str  | 实验字符串?  | 作用尚不明确 |
| code        | num  | 返回值       | 0：成功      |
| result      | obj  | 搜索建议结果 |              |
| stoken      | str  | ？？？       | 作用尚不明确 |

`result`对象：

| 字段 | 类型  | 内容     | 备注 |
| ---- | ----- | -------- | ---- |
| tag  | array | 套了个娃 |      |

`result`中的`tag`数组：

| 项   | 类型 | 内容                | 备注                   |
| ---- | ---- | ------------------- | ---------------------- |
| 0    | obj  | 第1建议关键词       |                        |
| n    | obj  | 第（n+1）建议关键词 | 按照相关程度与热度顺序 |
| 9    | obj  | 第10建议关键词      | 最后一项               |

`tag`数组中的对象：

| 字段  | 类型 | 内容       | 备注                                               |
| ----- | ---- | ---------- | -------------------------------------------------- |
| value | str  | 关键词内容 |                                                    |
| ref   | num  | 0          | 作用尚不明确                                       |
| name  | str  | 显示内容   | 带有 `<em class="suggest_high_light">` 的 XML 标签 |
| spid  | num  | 5          | 作用尚不明确                                       |
| type  | str  | 空         |                                                    |

**示例：**

获取关于 `洛天依` 的搜索建议

```shell
curl -G 'https://s.search.bilibili.com/main/suggest' \
--data-urlencode 'term=洛天依'
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "exp_str": "106301_106700",
  "code": 0,
  "result": {
    "tag": [
      {
        "value": "洛天依",
        "term": "洛天依",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依十二周年",
        "term": "洛天依十二周年",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>十二周年",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依演唱会",
        "term": "洛天依演唱会",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>演唱会",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依手办",
        "term": "洛天依手办",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>手办",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依歌曲",
        "term": "洛天依歌曲",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>歌曲",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依童话镇",
        "term": "洛天依童话镇",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>童话镇",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依东京不太热",
        "term": "洛天依东京不太热",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>东京不太热",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依霜雪千年",
        "term": "洛天依霜雪千年",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>霜雪千年",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依生日会",
        "term": "洛天依生日会",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>生日会",
        "spid": 5,
        "type": ""
      },
      {
        "value": "洛天依生日",
        "term": "洛天依生日",
        "ref": 0,
        "name": "<em class=\"suggest_high_light\">洛天依</em>生日",
        "spid": 5,
        "type": ""
      }
    ]
  },
  "stoken": "4020133863501304726"
}
```

</details>

## 获取搜索搜索关键词联想（web端API）

> https://api.bilibili.com/x/web-interface/suggest

*请求方式：GET*

搜索联想最多提供10个候选关键词

**url参数：**

| 参数名        | 类型 | 内容                   | 必要性 | 备注                     |
| ------------- | ---- | ---------------------- | ------ | ------------------------ |
| term          | str  | 需要获得联想的输入内容 | 必要   |                          |
| highlight     | num  | 是否高亮关键词         | 非必要 | 0：不高亮<br />1：高亮   |
| spmid         | str  | 页面定位id             | 非必要 | 如 `333.337`             |
| web_location  | str  | 页面位置               | 非必要 |                          |

**json回复：**

根对象：

| 字段         | 类型 | 内容         | 备注         |
| ------------ | ---- | ------------ | ------------ |
| code         | num  | 返回值       | 0：成功      |
| message      | str  | 错误信息     | 默认为 OK    |
| ttl          | num  | 1            |              |
| exp_str      | str  | 实验字符串   |              |
| data         | obj  | 搜索联想结果 |              |
| stoken       | str  | 令牌         |              |
| total_count  | num  | 联想结果数量 |              |

`data`对象：

| 字段    | 类型  | 内容         | 备注 |
| ------- | ----- | ------------ | ---- |
| result  | obj   | 搜索结果     |      |

`data.result`对象：

| 字段 | 类型  | 内容     | 备注 |
| ---- | ----- | -------- | ---- |
| tag  | array | 联想列表 |      |

`result.tag`数组中的对象：

| 字段     | 类型 | 内容                | 备注                                               |
| -------- | ---- | ------------------- | -------------------------------------------------- |
| value    | str  | 关键词内容          | 纯文本                                             |
| term     | str  | 原始关键词          |                                                    |
| ref      | num  | 引用标识            | 一般为 0                                            |
| name     | str  | 显示内容            | 开启highlight时带有 `<em class="suggest_high_light">`高亮标签 |
| spid     | num  | 分类id              | 一般为 5 (搜索标签分类)                             |
| type     | str  | 类型                |                                                    |

<details>
<summary>查看响应示例：</summary>

```json
{
    "code": 0,
    "message": "OK",
    "ttl": 1,
    "data": {
        "exp_str": "59860101_63948102_64861103_64986104_65013106_65181101_65367101_65679101",
        "code": 0,
        "result": {
            "tag": [
                {
                    "value": "食贫道",
                    "term": "食贫道",
                    "ref": 0,
                    "name": "<em class=\"suggest_high_light\">食贫道</em>",
                    "spid": 5,
                    "type": ""
                },
                {
                    "value": "食贫道菲律宾",
                    "term": "食贫道菲律宾",
                    "ref": 0,
                    "name": "<em class=\"suggest_high_light\">食贫道</em>菲律宾",
                    "spid": 5,
                    "type": ""
                },
                {
                    "value": "食贫道 泰国",
                    "term": "食贫道 泰国",
                    "ref": 0,
                    "name": "<em class=\"suggest_high_light\">食贫道</em> 泰国",
                    "spid": 5,
                    "type": ""
                }
            ]
        },
        "stoken": "13468361776216325300",
        "total_count": 10
    }
}
```

</details>
