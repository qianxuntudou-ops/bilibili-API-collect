# Web前端接口

## 获取AB测试信息

> https://api.bilibili.com/x/web-frontend/ab/getabtestinfo

*请求方式: GET*

认证方式：无（无需Cookie）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| varlist | str | 测试变量列表 | 必要 | 逗号分隔的AB测试变量名 |
| mid | num | 用户UID | 非必要 | |
| buvid | str | 设备标识 | 非必要 | |

**JSON回复:**

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | 0: 成功 |
| result | array | AB测试结果列表 | |

`result`数组中的对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| name | str | 测试变量名 | |
| value | str | 测试变量值 | |
| type | str | 变量类型 | 未知 |
| groupID | num | 分组ID | 未知 |

---

## 获取KV命名空间数据

> https://api.bilibili.com/x/kv-frontend/namespace/data

*请求方式: GET*

认证方式：无（无需Cookie）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| appKey | str | 应用标识 | 必要 | 如 333.1339 |
| nscode | num | 命名空间编码 | 必要 | |
| versionId | num | 版本ID | 必要 | 13位毫秒时间戳 |
| unlimit | bool | 是否无限制 | 非必要 | |

**JSON回复:**

> **注意:** 此接口在正常请求时返回 `304 Not Modified`，仅当数据有更新时返回完整数据。目前捕获到的响应仅有缓存命中状态，完整响应体未知。

根对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| code | num | 返回值 | -304: 未修改 |
| message | str | 错误信息 | 如 "Not Modified" |
