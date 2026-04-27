# v_voucher 验证

## 简述

当同一接口在短时间内被同一用户/IP/UA多次请求或异常时, 会触发风控, 如接口返回 `code` 为 `-352` 即 `风控校验失败`, 同时 `data` 中出现 `v_voucher` 字段, 响应头出现 `x-bili-gaia-vvoucher`

`v_voucher` 结构为字符串 `voucher_` 尾随一串以 `-` 为分隔符的小写 UUID

`v_voucher` 可用于申请 captcha 验证码, 若无意外发生, 根据验证结果使用 `validate` 接口获取 `grisk_id` 作为被风控接口的 `gaia_vtoken` 与 Cookie 中的 `x-bili-gaia-vtoken`, 即可恢复正常访问

若该情况出现在使用 Wbi 签名的接口中, 建议先检查 Wbi 签名是否正确. 若已检查 Wbi 签名或无需签名, 检查请求头中 `User-Agent` `Referer` 是否正常, 以及 `Cookie` 中 [`bili_ticket`](bili_ticket.md) [`b_nut` `buvid3` `buvid4`](../buvid3_4.md) 等是否存在. 使用 captcha 是最后的选择, 因为 captcha 验证需要用户操作<!--, 且这几天做验证码做的真的要疯了喵-->

参见 [#1067](https://github.com/SocialSisterYi/bilibili-API-collect/issues/1067)

**注意: 不是所有风控都可以使用本方式通过 captcha 解决**

## 风控触发场景

以下情况可能触发风控（返回 `-352` 错误码）：

| 场景 | 说明 | 建议处理方式 |
|------|------|-------------|
| 高频请求 | 同一接口在短时间内被多次请求 | 降低请求频率，添加延时 |
| IP异常 | 同一IP大量请求或IP被标记 | 更换IP或使用代理池 |
| UA异常 | User-Agent为空或不合法 | 设置正常的浏览器UA |
| 签名错误 | Wbi签名计算错误或过期 | 重新计算Wbi签名 |
| Cookie缺失 | 缺少必要的Cookie字段 | 补充 `bili_ticket`、`b_nut`、`buvid3`、`buvid4` 等 |
| Referer异常 | Referer为空或不合法 | 设置正确的Referer |
| 行为异常 | 请求模式被识别为机器人 | 模拟正常用户行为 |

## 风控错误码

| 错误码 | 含义 | 触发条件 |
|--------|------|----------|
| -352 | 风控校验失败 | UA或wbi参数不合法，或触发风控策略 |
| -412 | 请求被拦截 | 客户端IP被服务端风控 |
| -799 | 请求过于频繁 | 请求频率超过限制 |

## 风控相关参数说明

### 请求头参数

| 参数名 | 说明 | 示例值 |
|--------|------|--------|
| `User-Agent` | 浏览器标识 | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36` |
| `Referer` | 来源页面 | `https://www.bilibili.com` |
| `Origin` | 请求来源 | `https://www.bilibili.com` |

### Cookie参数

| 参数名 | 说明 | 作用 |
|--------|------|------|
| `bili_ticket` | B站票据 | 用于验证请求合法性 |
| `b_nut` | 设备指纹 | 用于识别设备 |
| `buvid3` | 设备ID | 用于追踪设备 |
| `buvid4` | 设备ID（新版） | 用于追踪设备 |
| `x-bili-gaia-vtoken` | 风控验证令牌 | 通过验证后设置，用于解除风控 |

### URL参数

| 参数名 | 说明 | 使用场景 |
|--------|------|----------|
| `gaia_vtoken` | 风控验证令牌 | 通过验证后添加到原接口请求 |
| `gaia_source` | 风控来源 | 部分接口需要，如 `view-card`、`pre-load` |
| `v_voucher` | 风控凭证 | 触发风控时返回，用于申请验证 |

## 风控解决流程图

```
触发风控 (code: -352)
    ↓
获取 v_voucher (data.v_voucher 或响应头 x-bili-gaia-vvoucher)
    ↓
调用 /x/gaia-vgate/v1/register 申请验证
    ↓
获取 challenge + token
    ↓
进行极验验证 (滑动/点击)
    ↓
获取 validate + seccode
    ↓
调用 /x/gaia-vgate/v1/validate 获取 grisk_id
    ↓
重新请求原接口:
  - URL参数添加 gaia_vtoken=grisk_id
  - Cookie添加 x-bili-gaia-vtoken=grisk_id
    ↓
恢复正常访问
```

## 操作流程

1. 快速以不正确的姿势请求接口, 直到返回 `v_voucher` 字段如下. 若 `data` 中没有 `v_voucher` 字段, 则检查响应头 `x-bili-gaia-vvoucher`

   ```json
   {
     "code": -352,
     "message": "风控校验失败",
     "ttl": 1,
     "data": {
       "v_voucher": "voucher_84a8c3ce-33f5-4551-9552-9c6b13aa7938"
     }
   }
   ```

2. [请求 `register` 接口](#从-v_voucher-申请-captcha), 请求体传入 `csrf` 及 `v_voucher`, 该接口返回与 [申请captcha验证码](../../login/login_action/readme.md#申请captcha验证码) 部分相同, 记录此处返回的 `token` `challenge`

3. 按照 [验证captcha验证码](../../login/login_action/readme.md#验证captcha验证码) 进行验证, 记下验证结果的 `validate` 与 `seccode`

4. [请求 `validate` 接口](#从验证结果获取-grisk_id), 请求体传入 `challenge` `token` `validate` `seccode` `csrf`, 该接口返回 `grisk_id` 即 `gaia_vtoken` 与 `x-bili-gaia-vtoken`

5. 重新请求原接口, 原 URL 参数加入 `gaia_vtoken`, Cookie 加入 `x-bili-gaia-vtoken`, 即恢复正常

## 接口列表

### 从 v_voucher 申请 captcha

> https://api.bilibili.com/x/gaia-vgate/v1/register

注: 同一有效 `v_voucher` 只能请求一次, 请求完毕请立即 [进行验证](../../login/login_action/readme.md#进行验证) 防止过期失效

*请求方式: POST*

**正文参数(application/x-www-form-urlencoded):**

| 参数名 | 类型 | 内容           | 必要性 | 备注 |
| ------ | ---- | ------- | ------ | ---- |
| csrf   | str  | CSRF Token (位于 Cookie 的 bili_jct) | 非必要   |      |
| v_voucher | str | v_voucher | 必要   |      |

**JSON回复:**

根对象:

| 字段    | 类型 | 内容     | 备注 |
| ----- | ---- | ------ | ---- |
| code  | num  | 返回值   | 0：成功<br />100000: 验证码获取失败 |
| message | str | 错误信息 | 默认为 0 |
| ttl   | num  | 1       |      |
| data  | obj  | 信息本体 |      |

`data` 对象:

| 字段    | 类型 | 内容     | 备注 |
| ----- | ---- | ------ | ---- |
| type  | str  | 验证码类型 | 目前只有 `geetest` |
| token | str  | 验证码 token | 用于验证 |
| geetest | obj | 极验信息 | 若为 null 则说明该风控无法通过 captcha 解除 |
| biliword | null |  |  |
| phone | null |  |  |
| sms | null |  |  |

`geetest` 对象:

| 字段      | 类型  | 内容     | 备注     |
| -------- | ----- | ------ | -------- |
| gt | str | 极验id | 一般为固定值 |
| challenge | str | 极验KEY | 由B站后端产生用于人机验证 |

**示例:**

假设此处 `v_voucher` 为 `voucher_ecca35e6-36da-4f38-bd84-b3f420ea08c1`

```shell
curl -X POST "https://api.bilibili.com/x/gaia-vgate/v1/register" \
--data-urlencode "v_voucher=voucher_ecca35e6-36da-4f38-bd84-b3f420ea08c1"
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "type": "geetest",
    "token": "e7abdb050c3d4609979f1685137e3bc0",
    "geetest": {
      "challenge": "85118f8714875ca4c6d5641bb0ce9ddf",
      "gt": "ac597a4506fee079629df5d8b66dd4fe"
    },
    "biliword": null,
    "phone": null,
    "sms": null
  }
}
```

</details>

## 从验证结果获取 grisk_id

> https://api.bilibili.com/x/gaia-vgate/v1/validate

*请求方式: POST*

**正文参数(application/x-www-form-urlencoded):**

| 参数名 | 类型 | 内容           | 必要性 | 备注 |
| ------ | ---- | ------ | ---- | ---- |
| csrf   | str  | CSRF Token (位于 Cookie 的 bili_jct) | 非必要 | 若登陆则必要 |
| challenge | str | 验证码 challenge | 必要   |      |
| token | str | 验证码 token | 必要   |      |
| validate | str | 验证结果 validate | 必要   |      |
| seccode | str | 验证结果 seccode | 必要   |      |

**JSON回复:**

根对象:

| 字段    | 类型 | 内容     | 备注 |
| ----- | ---- | ------ | ---- |
| code  | num  | 返回值   | 0：成功<br />-111: csrf 校验失败<br />100003: 验证码过期 |
| message | str | 错误信息 | 默认为 0 |
| ttl   | num  | 1       |      |
| data  | obj  | 信息本体 |      |

`data` 对象:

| 字段    | 类型 | 内容     | 备注 |
| ----- | ---- | ------ | ---- |
| is_valid | num | 验证结果 | 1：验证成功 |
| grisk_id | str | gaia_vtoken | 用于恢复正常访问 |

**示例:**

```shell
curl -X POST "https://api.bilibili.com/x/gaia-vgate/v1/validate" \
--data-urlencode "challenge=e4fcb337b8c0427b56320f97e1064210" \
--data-urlencode "csrf=xxxxxxxxxxxxxxx" \
--data-urlencode "seccode=360f7b9cf75c74c68fbb7475416d0e0d|jordan" \
--data-urlencode "token=0e1e58bdff3d4b8aa298e346fed07eeb" \
--data-urlencode "validate=360f7b9cf75c74c68fbb7475416d0e0d"
```

<details>
<summary>查看响应示例:</summary>

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "is_valid": 1,
    "grisk_id": "2e91cf2b67172ca8432fe7c9ab66a5c4"
  }
}
```

</details>
