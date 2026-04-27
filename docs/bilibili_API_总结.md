# Bilibili API 总结文档

本文档汇总了 Bilibili 各类 API 的作用和功能，方便快速查阅。

## 目录

- [视频相关 (video)](#视频相关-video)
- [登录相关 (login)](#登录相关-login)
- [用户相关 (user)](#用户相关-user)
- [直播相关 (live)](#直播相关-live)
- [评论相关 (comment)](#评论相关-comment)
- [动态相关 (dynamic)](#动态相关-dynamic)
- [搜索相关 (search)](#搜索相关-search)
- [文章相关 (article)](#文章相关-article)
- [音频相关 (audio)](#音频相关-audio)
- [收藏相关 (fav)](#收藏相关-fav)
- [消息相关 (message)](#消息相关-message)
- [番剧相关 (bangumi)](#番剧相关-bangumi)
- [会员相关 (vip)](#会员相关-vip)
- [钱包相关 (wallet)](#钱包相关-wallet)
- [弹幕相关 (danmaku)](#弹幕相关-danmaku)

---

## 视频相关 (video)

### 视频信息查询

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/web-interface/view` | GET | 获取视频详细信息（通过 aid 或 bvid） |
| `/x/web-interface/view/detail` | GET | 获取视频超详细信息（含标签、热评、推荐等） |

### 视频流播放

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/player/wbi/playurl` | GET | 获取视频播放流 URL（支持多种清晰度和格式） |
| `/x/player/wbi/playurl` | GET | 获取视频流 URL（WBI 签名认证） |

**清晰度代码说明：**
- `6` - 240P
- `16` - 360P
- `32` - 480P
- `64` - 720P
- `74` - 720P60
- `80` - 1080P
- `112` - 1080P+
- `116` - 1080P60
- `120` - 4K
- `125` - HDR
- `126` - 杜比视界
- `127` - 8K
- `129` - HDR Vivid

**格式代码说明：**
- `1` - MP4
- `16` - DASH
- `64` - HDR
- `128` - 4K
- `256` - 杜比
- `512` - 杜比视界
- `1024` - 8K
- `2048` - AV1

**编码代码说明：**
- `7` - AVC
- `12` - HEVC
- `13` - AV1

---

## 登录相关 (login)

### 用户登录信息

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/web-interface/nav` | GET | 获取导航栏用户信息（登录状态、用户基本信息） |
| `/account.bilibili.com/home/userInfo` | GET | 获取登录用户详细信息（已弃用） |
| `/app.bilibili.com/x/v2/account/myinfo` | GET | 获取 APP 端登录用户信息 |
| `/x/web-interface/nav/stat` | GET | 获取登录用户统计信息（关注、粉丝、动态数等） |
| `/account.bilibili.com/site/getCoin` | GET | 获取用户硬币数量 |
| `/x/captcha/user` | POST | 获取人机验证 |
| `/x/safecenter/sec_code` | GET | 获取短信验证码 |
| `/x/passport-login/oauth2/login` | POST | 用户名密码登录 |
| `/x/passport-login/oauth2/sms_login` | POST | 短信验证码登录 |
| `/x/passport-login/web/qrcode/generate` | GET | 生成二维码登录 |
| `/x/passport-login/web/qrcode/poll` | GET | 轮询二维码登录状态 |
| `/x/passport-login/web/logout/v2` | POST | 退出登录 |
| `/x/safecenter/renew` | POST | 刷新 Cookie（延长登录有效期） |
| `/member/api/getInfo` | GET | 获取登录通知信息 |

---

## 用户相关 (user)

### 用户信息查询

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/space/wbi/acc/info` | GET | 获取用户空间详细信息（WBI 签名） |
| `/x/web-interface/card` | GET | 获取用户卡片信息 |
| `/x/space/myinfo` | GET | 获取登录用户空间信息 |
| `/x/polymer/pc-electron/v1/user/cards` | GET | 批量获取用户详细信息（方法1） |
| `/api.vc.bilibili.com/account/v1/user/cards` | GET | 批量获取用户详细信息（方法2） |
| `/api.vc.bilibili.com/x/im/user_infos` | GET | 批量获取用户详细信息（方法3） |
| `/x/relation/fans` | GET | 查询用户粉丝明细（新版） |
| `/x/relation/followers` | GET | 查询用户粉丝明细（旧版） |
| `/line3-h5-mobile-api.biligame.com/game/center/h5/user/relationship/follower_list` | GET | 查询用户粉丝明细（游戏端） |
| `/x/relation/followers/unread/count` | GET | 获取自己粉丝列表的未读状态 |
| `/x/relation/followings` | GET | 查询用户关注明细 |
| `/app.biliapi.net/x/v2/relation/followings` | GET | 查询用户关注明细（APP版） |
| `/line3-h5-mobile-api.biligame.com/game/center/h5/user/relationship/following_list` | GET | 查询用户关注明细（游戏端） |
| `/x/relation/followings/search` | GET | 搜索关注明细 |
| `/x/relation/same/followings` | GET | 查询共同关注明细 |
| `/x/relation/friends` | GET | 查询互相关注明细 |
| `/x/relation/blacks` | GET | 查询黑名单明细 |

### 用户关系操作

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/relation/modify` | POST | 操作用户关系（关注、取关、拉黑等） |
| `/x/relation/batch/modify` | POST | 批量操作用户关系（仅支持关注和拉黑） |

**操作代码说明：**
- `1` - 关注
- `2` - 取关
- `3` - 悄悄关注（已下线）
- `4` - 取消悄悄关注
- `5` - 拉黑
- `6` - 取消拉黑
- `7` - 踢出粉丝

### 用户关系查询

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/relation` | GET | 查询用户与自己关系（仅关注） |
| `/x/space/wbi/acc/relation` | GET | 查询用户与自己关系（互相关系）WBI |
| `/x/web-interface/relation` | GET | 查询用户与自己关系（互相关系） |
| `/x/relation/relations` | GET | 批量查询用户与自己关系 |

### 关注分组管理

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/relation/tags` | GET | 查询关注分组列表 |
| `/x/relation/tag` | GET | 查询关注分组明细 |
| `/x/relation/tag/user` | GET | 查询目标用户所在的分组 |
| `/x/relation/tag/special` | GET | 查询所有特别关注 mid |
| `/x/relation/tag/create` | POST | 创建分组 |
| `/x/relation/tag/update` | POST | 重命名分组 |
| `/x/relation/tag/del` | POST | 删除分组 |
| `/x/relation/tags/addUsers` | POST | 修改分组成员 |
| `/x/relation/tags/copyUsers` | POST | 复制关注到分组 |
| `/x/relation/tags/moveUsers` | POST | 移动关注到分组 |

**分组 ID 特殊值：**
- `0` - 默认分组
- `-10` - 特别关注
- `-20` - 所有

---

## 直播相关 (live)

### 直播间信息

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/room/v1/Room/get_info` | GET | 获取直播间信息 |
| `/room/v1/Room/getRoomInfoOld` | GET | 获取用户直播间状态 |
| `/room/v1/Room/room_init` | GET | 获取房间初始化信息 |
| `/live_user/v1/Master/info` | GET | 获取主播信息 |
| `/xlive/web-room/v1/index/getRoomBaseInfo` | GET | 获取房间基本信息 |
| `/room/v1/Room/get_status_info_by_uids` | GET | 批量查询房间状态 |
| `/xlive/web-room/v1/dM/gethistory` | GET | 获取近期弹幕 |
| `/xlive/web-room/v2/index/getRoomPlayInfo` | GET | 获取房间播放信息 |
| `/live_user/v1/UserInfo/get_anchor_in_room` | GET | 获取房间内主播信息 |

### 直播礼物

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/xlive/web-room/v1/giftPanel/roomGiftList` | GET | 获取直播间内礼物列表 |
| `/xlive/general-interface/v1/blindFirstWin/getInfo` | GET | 获取盲盒概率 |

### 直播弹幕

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/xlive/web-room/v1/dM/GetDMConfigByGroup` | GET | 获取当前用户直播间可发弹幕配置 |
| `/xlive/web-room/v1/dM/AjaxSetConfig` | POST | 设置弹幕样式 |
| `/msg/send` | POST | 发送直播弹幕 |

---

## 评论相关 (comment)

### 评论区查询

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/v2/reply` | GET | 获取主评论区内容 |
| `/x/v2/reply` | GET | 获取子评论区内容（设置 root 参数） |

---

## 动态相关 (dynamic)

### 动态信息

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/polymer/web-dynamic/v1/feed/nav` | GET | 获取动态导航信息 |
| `/x/polymer/web-dynamic/v1/feed/all` | GET | 获取综合动态列表 |
| `/x/polymer/web-dynamic/v1/feed/space` | GET | 获取指定用户动态列表 |
| `/x/polymer/web-dynamic/v1/feed/detail` | GET | 获取动态详情 |
| `/x/polymer/web-dynamic/v1/topic/detail` | GET | 获取话题详情 |
| `/x/polymer/web-dynamic/v1/topic/ops/details` | GET | 获取话题运营详情 |
| `/x/polymer/web-dynamic/v1/feed/banner` | GET | 获取动态 Banner 信息 |
| `/x/polymer/web-dynamic/v1/feed/atlist` | GET | 获取 @ 列表 |

### 动态操作

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/polymer/web-dynamic/v1/dynamic/status/set` | POST | 发布动态 |

---

## 搜索相关 (search)

### 搜索功能

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/all/v1/Trending/getTrending` | GET | 获取搜索推荐话题 |
| `/search/defaultkeywords` | GET | 获取默认搜索关键词 |
| `/suggestion` | GET | 获取搜索建议 |
| `/x/web-interface/search/type` | GET | 搜索内容（视频、用户、文章等） |

**搜索类型说明：**
- `video` - 视频
- `media_bangumi` - 番剧
- `media_ft` - 影视
- `live` - 直播
- `article` - 专栏
- `topic` - 话题
- `user` - 用户
- `bili_user` - 用户
- `photo` - 图集

---

## 文章相关 (article)

### 文章信息

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/article/category/list` | GET | 获取专栏分区列表 |
| `/x/article/cards` | GET | 获取专栏卡片信息 |
| `/x/article/list` | GET | 获取用户专栏列表 |
| `/x/article/viewinfo` | GET | 获取专栏详情 |
| `/x/article/upinfo` | GET | 获取专栏作者信息 |

---

## 音频相关 (audio)

### 音频信息

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/audio/music-service-c/songs/playing` | GET | 获取音频信息 |
| `/audio/music-service-c/web/song/info` | GET | 获取音频详细信息 |
| `/audio/music-service-c/web/song/upper` | GET | 获取音频UP主信息 |
| `/audio/music-service-c/web/stat` | GET | 获取音频统计数据 |
| `/audio/music-service-c/web/song/hot` | GET | 获取热门音频 |
| `/audio/music-service-c/web/song/url` | GET | 获取音频流 URL |

---

## 收藏相关 (fav)

### 收藏夹管理

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/v3/fav/folder/created/list-all` | GET | 获取用户创建的收藏夹列表 |
| `/x/v3/fav/folder/collected/list-all` | GET | 获取用户收藏的收藏夹列表 |
| `/x/v3/fav/resource/list` | GET | 获取收藏夹内容列表 |
| `/x/v3/fav/resource/infos` | GET | 批量获取收藏内容信息 |
| `/x/v3/fav/folder/add` | POST | 创建收藏夹 |
| `/x/v3/fav/folder/delete` | POST | 删除收藏夹 |
| `/x/v3/fav/folder/modify` | POST | 修改收藏夹 |
| `/x/v3/fav/resource/deal` | POST | 收藏/取消收藏 |

---

## 消息相关 (message)

### 消息功能

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/msgfeed/unread` | GET | 获取未读消息数 |
| `/x/msgfeed/at` | GET | 获取@消息列表 |
| `/x/msgfeed/reply` | GET | 获取回复消息列表 |
| `/x/msgfeed/like` | GET | 获取点赞消息列表 |
| `/x/msgfeed/sys_msg` | GET | 获取系统消息列表 |
| `/x/msgfeed/whisper` | GET | 获取私信消息列表 |
| `/x/msgfeed/whisper/query_list` | GET | 获取私信会话列表 |
| `/x/msgfeed/whisper/get_msg` | GET | 获取私信详情 |
| `/x/msgfeed/whisper/send` | POST | 发送私信 |

---

## 番剧相关 (bangumi)

### 番剧信息

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/pgc/view/web/season` | GET | 获取番剧详细信息 |
| `/pgc/web/season/section` | GET | 获取番剧集数信息 |
| `/pgc/web/timeline` | GET | 获取番剧时间线 |
| `/pgc/view/v2/follow/add` | POST | 追加番剧 |

---

## 会员相关 (vip)

### 会员特权

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/vip/privilege/my` | GET | 获取大会员卡券状态查询 |
| `/x/vip/privilege/receive` | POST | 兑换卡券 |
| `/x/vip/point/today/exp` | POST | 每日领取10经验 |
| `/x/vip/web/center/info` | GET | 获取大会员中心信息 |
| `/x/vip/web/card/big` | GET | 获取大会员卡券信息 |
| `/x/vip/elec/daily` | POST | 大会员每日打卡 |

---

## 钱包相关 (wallet)

### 钱包功能

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/paywallet/wallet/getUserWallet` | POST | 获取用户钱包（B币、优惠券余额） |

---

## 弹幕相关 (danmaku)

### 弹幕功能

| API 端点 | 方法 | 作用 |
|---------|------|------|
| `/x/v2/dm/list` | GET | 获取视频弹幕列表 |
| `/x/v2/dm/view` | GET | 获取视频弹幕信息 |
| `/x/v2/dm/history/index` | GET | 获取历史弹幕 |
| `/x/v2/dm/thumbup/add` | POST | 点赞弹幕 |
| `/x/v2/dm/web/view` | GET | 获取视频弹幕视图 |

---

## 认证方式说明

### Cookie 认证
使用 Cookie 中的 `SESSDATA` 字段进行身份认证

### WBI 签名
部分 API 需要 WBI 签名认证，详见 [WBI 签名文档](./bilibili-API-collect-master/docs/misc/sign/wbi.md)

### APP Key 认证
APP 端使用 `access_key` 进行认证

---

## 错误代码说明

| 错误代码 | 含义 |
|---------|------|
| `0` | 成功 |
| `-101` | 账号未登录 |
| `-102` | 账号被封停 |
| `-111` | CSRF 校验失败 |
| `-400` | 请求错误 |
| `-404` | 资源不存在 |
| `-403` | 权限不足 |
| `22001` | 不能对自己进行此操作 |
| `22002` | 因对方隐私设置，你还不能关注 |
| `22003` | 关注失败，请将该用户移除黑名单之后再试 |
| `22008` | 黑名单达到上限 |
| `22009` | 关注失败，已达关注上限 |
| `22013` | 账号已注销，无法完成操作 |
| `22014` | 已经关注用户，无法重复关注 |
| `22118` | 由于该用户隐私设置，粉丝列表不可见 |
| `22120` | 重复加入黑名单 |
| `40061` | 用户不存在 |

---

## 注意事项

1. 大部分 API 需要登录认证（Cookie 或 access_key）
2. 部分 API 有频率限制
3. 部分接口有隐私限制（如粉丝列表、关注列表）
4. 视频流 URL 获取需要 WBI 签名
5. 高清晰度视频流需要大会员权限
6. 部分接口需要正确的 Referer 和 User-Agent 请求头

---

*本文档基于 bilibili-API-collect 项目整理，仅供参考学习使用*
