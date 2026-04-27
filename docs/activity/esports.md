# 电竞信息

## 获取电竞赛事列表

> https://api.bilibili.com/x/esports/component/contests

*请求方式: GET*

认证方式：无（无需Cookie）

**URL参数:**

| 参数名 | 类型 | 内容 | 必要性 | 备注 |
| ------ | ---- | ---- | ------ | ---- |
| sid | num | 赛事ID | 必要 | |
| division | str | 分区 | 非必要 | 空字符串为全部 |

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
| history | array | 已结束赛事列表 | |
| future | array | 即将开始赛事列表 | |
| prev | num | 上一页标识 | 未知 |
| next | num | 下一页标识 | 未知 |

`data.history`数组中的对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| id | num | 赛事ID | |
| start_time | num | 开始时间 | 10位Unix时间戳 |
| end_time | num | 结束时间 | 10位Unix时间戳 |
| title | str | 赛事标题 | |
| status | str | 赛事状态 | 未知 |
| collection_url | str | 收藏页面URL | |
| live_room | num | 直播间ID | |
| play_back | str | 回放URL | |
| data_type | num | 数据类型 | 未知 |
| match_id | num | 比赛ID | |
| season_id | num | 赛季ID | |
| guess_type | num | 竞猜类型 | 未知 |
| series_id | num | 赛系列ID | |
| is_sub | num | 是否订阅 | 未知 |
| is_guess | num | 是否可竞猜 | 未知 |
| home | obj | 主队信息 | |
| away | obj | 客队信息 | |
| series | null | 赛系信息 | |
| contest_status | num | 赛事状态 | 未知 |
| contest_freeze | num | 赛事冻结状态 | 未知 |
| game_state | num | 游戏状态 | 未知 |
| guess_show | num | 竞猜显示 | 未知 |
| home_score | num | 主队得分 | |
| away_score | num | 客队得分 | |
| game_stage | str | 游戏阶段 | |
| season_title | str | 赛季标题 | |
| season_type | num | 赛季类型 | 未知 |
| teams | array | 参赛队伍列表 | |
| hottest_player | obj | 最热选手信息 | |

`data.history[].home`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| (未知) | | | 子对象字段未展开 |

`data.history[].away`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| (未知) | | | 子对象字段未展开 |

`data.history[].hottest_player`对象:

| 字段 | 类型 | 内容 | 备注 |
| ---- | ---- | ---- | ---- |
| (未知) | | | 子对象字段未展开 |
