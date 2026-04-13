# OTP Management 正向业务维护链路用户故事文档

**版本**：v1.0  
**用途**：作为后续设计、评审与改动核对的业务基线  
**适用范围**：覆盖 OTP 相关正向业务维护流；不展开 planning / adjustment / review 的详细管理逻辑

---

## 1. 文档目标

本文档用于统一 OTP management 当前已澄清的真实业务故事线，作为后续功能设计、页面定义、数据结构调整和流程评审时的核对基线。

本文档不是最终 UI 设计稿，也不是最终 API 设计稿。目标是先把业务主链、角色边界、状态边界、关键对象和设计原则定清楚。

---

## 2. 系统定位与边界

### A. Contract & Billing Operations Platform
主角色：CM  
定位：执行型平台  
目标：承载合同从出生到归档生效、开票计划、开票执行、挂账、关账的正向维护流

### B. SCP Workspace
主角色：SCP  
定位：管理型 Workspace  
目标：消费合同/开票平台沉淀下来的正向事实和 mapping 关系，做追踪、planning、adjustment、review

### C. Shared Database
合同平台与 SCP Workspace 共用同一套共享数据底座，统一承载：
- Salesforce 报价快照数据
- PMS 项目与里程碑数据
- 合同 case、合同文件、结构化字段
- 合同与报价 / 项目的 mapping
- 合同金额分配与 payment node
- 合同审批与归档状态
- 开票计划、开票事件、挂账关系、合同余额
- OTP 下游消费视图

### 外部系统边界
- Salesforce：只作为报价数据同步来源
- PMS：只作为项目数据同步来源
- Workon：开票前必须经过的外部审批工具；本系统只记录其编号、附件、截图、识别结果等关联信息

---

## 3. 角色与职责

### AM
- 上传合同原文
- 检查 AI 提取结果
- 完成合同与报价 / 项目的 mapping
- 完成合同金额分配
- 收到 reject 后修改并重新提交

### CM
- 审核合同信息与 mapping
- 将 dummy 合同号转为正式合同号
- 生成带正式唯一码的确认版 PDF
- 跟进 CA 单签与客户双签归档
- 维护 MoM plan
- 维护开票事件、挂账关系、合同余额
- 发起特殊关账申请并提交证据

### CA
- 合同审批 / 单签确认
- 通过系统直接确认，或由 CM 上传回传文件后确认已单签

### SCP
- 在 SCP Workspace 中查看合同与开票链路事实
- 跟踪未归档但在流转中的合同
- 基于正向维护事实做后续 planning / adjustment / review

### CM HoD
- 审批特殊关账请求

### PjM
- 作为项目确认与节点沟通对象存在
- 不直接维护合同主链
- PMS 数据由外部同步进入系统

---

## 4. 核心业务原则

- Salesforce 与 PMS 数据都进入共享数据库
- Salesforce 代表报价依据，PMS 代表执行项目
- 第一阶段允许 Salesforce 与 PMS 在 mapping / 分配层暂时平级展示，但这是现实妥协，不是长期目标
- 合同在客户双签并归档确认前，不算正式生效
- 未归档 mapping 也需要同步给 SCP Workspace，但必须强标记为流转中
- AI 只做识别、预填、候选缩小、内容比对，不替代最终业务判断
- 合同金额分配总和必须等于合同总金额
- 开票挂靠到合同的金额总和不得超过合同当前余额
- Others、Reject、内容差异、特殊关账、审批失败都必须显性记录

---

## 5. 业务主链总览

### 第一段：上游数据同步
- Salesforce 报价快照同步
- PMS 项目与节点同步

### 第二段：合同主链
- 销售上传合同
- AI 预提取
- 人工修正
- 合同与报价 / 项目的 mapping
- 金额分配
- CM 审核与正式编号
- CA 单签
- 客户双签归档
- 正式生效并同步 OTP

### 第三段：开票主链
- MoM plan
- 本月触发提醒
- 业务确认是否可开票
- Workon 外部审批
- 开票事件录入
- 发票挂靠合同
- 合同余额扣减
- 特殊关账处理

---

## 6. 用户故事一：上游数据同步层

### 6.1 Salesforce 数据同步
业务目标：为合同 mapping 提供候选报价依据。  
颗粒度：`PID - Configuration`

关键字段：
- PID
- Acquisition Customer
- Sales Project Name
- Configuration Name
- PDCL Name
- Gate
- Gate Status
- Customer DoS
- Customer SOP
- Year
- OTP
- OTC
- Line Item Name / Service
- linked SE4 status
- AM

关键规则：
- 只看 SE3 不足以识别最终有效版本
- 若某 configuration 后续被标记为 SE4，需要把“已过 SE4”的状态回显到该 configuration
- 同一 PID 下可能存在多个 configuration / scenario，不应假设唯一有效项

### 6.2 PMS 数据同步
业务目标：为合同 mapping 提供项目执行载体。  
颗粒度：`PMSID - MCRL0 - PID`

关键字段：
- Customer
- PMS Project Name
- Product Category
- Project Status
- System Project Type
- MCRL0
- PID
- Quotation Status
- PjM

透明化要求：
- 若某个 PMS 项目上的 PID 能在 Salesforce 中找到对应报价记录，则标记“PID 已过 SE3 / 已过 SE4”

---

## 7. 用户故事二：合同从出生到归档生效

### 7.1 销售上传合同并触发 AI 预提取
- 销售进入“发起合同审批”页面新建合同 case
- 上传 PDF 或 Word
- 系统触发 AI workflow 预提取合同关键信息
- 页面提示“AI 提取完成，请检查内容是否正确”
- 销售可以直接修正所有字段

### 7.2 销售完成 mapping 与金额分配
项目类型：
- 新项目
- EC
- 混合

规则：
- 新项目：必须选择至少一个 Salesforce SE3 snapshot
- EC：Salesforce snapshot 选填
- 混合：必须选择至少一个 Salesforce SE3 snapshot
- 所有类型都必须至少选择一个 PMS 项目

候选缩小逻辑：
- 先按合同识别出的客户名、产品名粗筛
- 用户可输入 PID 进一步缩小范围
- PMS 还可用 MCRL0、System Project Type、Project Status、PjM 做精筛

金额分配规则：
- Salesforce snapshot、PMS project、Others 暂时平级展示
- 支持按百分比或绝对金额分配
- Others 必须填写金额、原因、证据
- 分配金额总和必须等于合同总金额
- 合同录入阶段还需要具备 payment node、year、分期比例

### 7.3 生成 dummy 合同号并提交 CM
- 系统执行必填检查、金额守恒检查、规则校验
- 若无问题则生成 dummy 合同号（预计 8 位，D 开头）
- 页面提示后续流程和下一步责任人

### 7.4 CM 审核并正式编号
CM 可见：
- 合同原文
- 结构化字段
- 合同与报价 / 项目的 mapping
- 总金额分配情况

确认通过时：
- dummy 合同号转正式合同号（预计 8 位，F 开头）
- 生成正式合同唯一码 + 条形码 / 二维码
- 生成确认版 PDF
- 合同进入“合同归档待办”
- mapping 同步到 OTP，但状态标记为待归档 / 流转中

拒绝时：
- CM 必须填写 reject 原因
- 销售收到提醒后修改重提

### 7.5 CA 单签审批
- CA 收到邮件或 Teams 提醒后进入详情页
- 查看合同唯一码、原文和 highlight 信息
- 可直接审批，或由 CM 在线下签完后上传回传文件并标记单签完成
- 两种路径都等价于“系统必须知道 CA 单签已经完成”

### 7.6 双签归档并正式生效
- CM 上传客户双签后的电子化合同文件
- 系统触发二次识别与内容比对
- 若存在差异则高亮提示
- 一致或差异被接受后，确认归档成功
- AM、SCP 收到通知
- 合同与项目 mapping 正式同步到 SCP Workspace，状态更新为已归档 / 已生效

---

## 8. 用户故事三：合同生效后的开票维护链路

### 8.1 MoM plan 维护
- CM 或 CM team leader 维护 MoM plan 总表
- 当前先以人工维护计划为主
- 后续可讨论是否结合 PMS 节点自动推算开票时间

### 8.2 到月自动触发提醒
- 系统按自然月与 MoM plan 识别本月待开票合同及金额
- 通过邮件 / Teams 提醒 CM 执行

### 8.3 开票执行
CM 在开票管理模块中：
- 查看本月待开票合同、金额、项目节点状态
- 与客户 / PjM 确认是否到达可开票时机
- 执行 Workon 外部流程

### 8.4 开票事件录入
- CM 录入或 AI 预填：PDCL、Workon 号、发票号、开票金额
- 支持上传 Workon pdf / 截图 触发 AI 识别占位

### 8.5 发票挂靠合同
- 可通过客户名、产品、合同唯一码筛选合同集合
- 支持将一笔开票事件按百分比或绝对金额分配到多个合同
- 保存时自动生成开票时间并写入开票流水
- 系统自动扣减合同余额并计算未开百分比

### 8.6 特殊关账
- 若合同未被 100% 开票消耗，但业务上需关闭，CM 可发起 close request
- 必须填写原因并上传 evidence
- 必须经 CM HoD 批准
- 批准后合同逻辑等同于 100% closed，不再允许被挂账
