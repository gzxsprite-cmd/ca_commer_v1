# OTP-Domain-Demo-Page-Spec

## 1. 文档目标

本文档定义本轮 demo 的页面、页面目标、核心区块和关键动作。

要求页面以用户任务流为中心，而不是以旧系统模块名为中心。

---

## 2. 前台一：Contract & Billing Operations Platform

### 2.1 Home / My Tasks
目标：让 CM 一进入系统就知道：
- 我有哪些待处理合同
- 哪些待 CA
- 哪些待归档
- 本月有哪些待开票任务

主要区块：
- Pending Contract Cases
- Pending Archive
- This Month Billing Tasks
- Close Requests Needing Attention

关键动作：
- 进入 Contract Review
- 进入 Contract Archive
- 进入 Billing Execution

---

### 2.2 Contract Intake
目标：让 AM 上传合同、检查 AI 提取、完成 mapping 和金额分配。

页面区块：
1. 上传合同文件
2. AI 提取结果检查区
3. 合同基础字段区
4. 项目类型选择区
5. 报价依据选择区（Salesforce）
6. 执行项目选择区（PMS）
7. Others 区
8. Payment Nodes 区
9. 金额校验与提交区

关键交互：
- 上传后显示“AI 提取完成，请检查”
- Salesforce 与 PMS 分开展示标题，不混成同类对象
- 实时显示分配金额校验结果
- 提交成功后显示 dummy contract id 和 next owner

---

### 2.3 Contract Review
目标：让 CM 审核合同信息、mapping 和金额分配，并执行 confirm / reject。

页面区块：
1. 合同原文预览
2. 结构化字段摘要
3. Mapping Summary
4. Allocation Summary
5. Workflow Status + Next Step
6. 操作区（Confirm / Reject）

关键交互：
- Confirm 后生成 formal contract id
- 显示二维码/条码/唯一码占位
- Reject 弹窗必须填原因

---

### 2.4 Contract Archive
目标：让 CM 上传双签文件、比对差异、确认归档。

页面区块：
1. 合同版本区（草稿/正式/双签）
2. 差异比对结果区
3. Archive confirm 操作区
4. 审计轨迹区

关键交互：
- 上传双签文件
- 显示“内容一致 / 存在差异”
- 允许“接受差异后归档”
- 成功后状态变 `archived_effective`

---

### 2.5 Billing MoM Plan
目标：让 CM 维护月度计划，供系统月度触发提醒。

页面区块：
- 合同列表
- 月度计划编辑区
- 本月 / 下月视图切换

关键交互：
- 按合同录入 planned billing month + amount
- 保存后状态可见

---

### 2.6 Billing Execution
目标：让 CM 执行本月待开票任务，录入开票事件并挂靠合同。

页面区块：
1. 本月待开票合同列表
2. Business confirmation 提示区
3. Workon 信息区
4. Billing Event 表单区
5. Contract Allocation 区
6. Remaining Balance 区

关键交互：
- 支持上传 workon 截图 / pdf 触发 AI 预填（占位即可）
- 支持一笔开票分配到多个合同
- 实时显示余额扣减预览

---

### 2.7 Billing Records
目标：让 CM 查询历史开票事件与挂账结果。

页面区块：
- Billing event list
- Filter bar
- Detail drawer / detail page

关键交互：
- 查看某次开票挂到了哪些合同
- 查看该次开票后各合同余额变化

---

### 2.8 Close Requests / Exceptions
目标：让 CM 发起特殊关账，让 HoD 审批。

页面区块：
- Close request list
- Request detail
- Approval status

关键交互：
- 录入 reason + evidence
- HoD approve 后合同状态 closed

---

## 3. 前台二：SCP Workspace（OTP Domain）

### 3.1 OTP Home
目标：让 SCP 看到 OTP 主题当前关键进展概况。

页面区块：
- In-flight contracts
- Archived contracts
- Billing in progress
- Quick links to trace pages

---

### 3.2 Contract Trace
目标：让 SCP 从管理视角追踪合同主链状态，而不是做执行录入。

页面区块：
- Contract trace list
- Status filters
- Current owner / next step
- Archive visibility badge

关键交互：
- 清楚区分 in-flight 与 effective
- 可进入 detail 但不做执行修改

---

### 3.3 Billing Trace
目标：让 SCP 看到开票进度、挂账结果、余额消耗。

页面区块：
- Billing trace list
- Contract balance view
- Billing status filter

---

### 3.4 Mapping Review
目标：让 SCP 看合同与报价 / 项目的映射结果，而不是自己维护它。

页面区块：
- Contract -> SF/PMS/Others mapping table
- Filter bar
- Status / exception badges

---

### 3.5 Planning Base
目标：作为后续 planning 的基础数据页，本轮只做占位级可读页面。

页面区块：
- Open contracts
- Partial billed contracts
- Planned billing base

---

### 3.6 Adjustment Base
目标：作为后续 adjustment 的基础数据页，本轮只做占位级可读页面。

---

### 3.7 Review Dashboard
目标：给 SCP 一个高层管理看板，本轮只需要 OTP 主题基础版。

页面区块：
- Contract stage summary
- Billing stage summary
- In-flight vs effective
- Contract balance buckets

---

### 3.8 Pending Archive Visibility
目标：专门展示“不是没推进，而是卡在流转中”的合同。

页面区块：
- Pending CM
- Pending CA
- Pending Archive
- owner + blocker reason
