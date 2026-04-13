# CA Workspace & Operations Platform Framework

## 文档定位

本文用于定义 CA 商务数字化平台的上层框架，用来指导 GitHub Pages demo 的产品边界与信息架构。

本轮不是生产系统设计，而是先建立一个足够清晰的产品母体，供后续 Codex 基于统一框架开发 OTP 主题 demo。

---

## 1. 架构提升方向

本次设计不再把系统理解为单一的 OTP 工具，而是提升为：

- 一套共享数据底座
- 按角色组织的执行型平台
- 按职能组织的管理型 Workspace

OTP 只是其中一个主题域，不应被理解为唯一主题。

---

## 2. 管理型 Workspace 的抽象

### SCP Workspace

SCP 的工作不只围绕 OTP，还包括 Price 等其他商业管理主题。

因此长期方向应建立 **SCP Workspace**，统一承载：
- 不同管理主题的数据映射与回溯
- planning
- adjustment
- review / 汇报输出
- 下游分析与数据应用

在该框架下：
- OTP 是一个主题域
- Price 是另一个主题域
- 后续可继续扩展其他 SCP 常用主题

---

## 3. 执行型平台的抽象

### Contract & Billing Operations Platform

合同、开票平台不应被 OTP 独占。

其长期定位应提升为一个通用执行平台，面向 CM 等执行角色，承载：
- 合同出生、审批、归档
- 开票计划、开票执行、挂账、关账
- 证据、审批、通知

该平台不只服务 OTP，也应支持：
- OTP 相关合同 / 开票
- 大货相关合同 / 开票
- 未来其他需要共用合同与开票执行链路的业务场景

不同业务主题之间的差异，主要通过以下方式承载，而不是为每个主题重做一套平台：
- 字段配置
- 模板配置
- 校验规则配置
- 下游消费视图差异

---

## 4. 本轮落地方式

本轮仍以 OTP 场景为主线推进，但 spec 需要显式保留两层视角。

### 层 1：通用平台层
- Contract & Billing Operations Platform
- SCP Workspace Framework
- Shared Database
- 通用 workflow / audit / notification / attachment / master data

### 层 2：OTP 主题层
- OTP Contract Trace
- OTP Billing Trace
- OTP Planning Base
- OTP Adjustment Base
- OTP Review Dashboard

Price 主题本轮不展开具体细节，但必须在架构上预留挂载位置。

---

## 5. 总体架构原则

### 5.1 一套共享数据库
统一承载：
- Salesforce 报价快照数据
- PMS 项目与里程碑数据
- 合同 case / 合同文件 / 结构化字段
- 合同与报价 / 项目的 mapping
- 合同金额分配与 payment node
- 合同审批与归档状态
- 开票计划、开票事件、挂账分配、合同余额
- OTP 下游用于 planning / adjustment / review 的消费视图

### 5.2 两个业务前台

#### A. Contract & Billing Workspace
主角色：CM

目标：
- 承载合同从出生到归档生效的正向维护流
- 承载 CM 的 MoM plan、开票执行与挂账维护
- 管理合同余额、特殊关账、证据与审批

#### B. SCP Workspace
主角色：SCP

目标：
- 读取共享数据库中的正向维护事实
- 追踪合同与开票链路状态
- 承载 planning / adjustment / review 的管理视角
- 支持对未归档但在流转中的 case 做透明追踪

---

## 6. 外部系统边界

### Salesforce
- 只做数据同步来源
- 不在本系统中重建报价流程

### PMS
- 只做数据同步来源
- 不在本系统中重建项目执行流程

### Workon
- 是开票前必须经过的外部审批工具
- 不做系统打通
- 只记录 workon 编号、附件、截图、结构化识别结果等关联信息

---

## 7. 核心业务原则

### 数据同步原则
- Salesforce 与 PMS 数据都应进入共享数据库
- 两个前台共享同一数据底座
- 前台只做不同角色的展示和操作收口

### 报价 / 项目语义原则
- Salesforce 代表报价依据
- PMS 代表执行项目
- 正常情况下，报价应作为根，项目作为叶
- 但由于 EC 项目不一定经过 Salesforce，第一阶段允许两类对象在 mapping / 分配层暂时平级展示
- 平级是现实妥协，不是长期目标

### 合同生效原则
- 合同在客户双签并归档确认前，不算正式生效
- CM 确认正式合同号、CA 单签通过，都不是最终生效点
- 最终生效点是双签归档完成

### OTP 同步原则
- 未归档 mapping 也需要同步给 SCP Workspace
- 但必须强标记为待归档 / 流转中
- 已归档的合同和 mapping 才是正式生效事实

### AI 使用原则
- AI 负责识别、预填、粗筛候选、内容比对
- AI 不替代最终业务判断
- 所有关键识别结果都必须允许人工修正与确认

### 金额守恒原则
- 合同金额分配总和必须等于合同总金额
- 开票挂靠到合同的金额总和不得超过合同当前余额
- 开票金额必须完全分配到合同，不能悬空

### 例外显性化原则
- Others、Reject、内容差异、特殊关账、审批失败，都必须显性记录
- 不允许以口头或系统外默认方式吞掉例外
