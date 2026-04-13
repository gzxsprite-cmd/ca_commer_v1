# OTP-Domain-Demo-Data-&-State

## 1. 文档目标

本文档只定义 demo 必需的业务对象、关键字段、核心状态和页面校验语义。

目标不是建立完整技术数据模型，而是保证：
- Codex 知道页面需要展示哪些对象
- Codex 知道哪些字段必须出现
- Codex 知道哪些状态 badge 必须可见
- Codex 知道页面操作后应该呈现什么结果

---

## 2. Demo 核心对象

### 2.1 上游同步对象
- `sf_snapshots`
- `pms_projects`

### 2.2 合同主链对象
- `contract_cases`
- `contract_documents`
- `contract_allocations`
- `contract_payment_nodes`
- `contract_workflow_events`

### 2.3 开票主链对象
- `billing_plans_mom`
- `billing_events`
- `billing_contract_allocations`
- `contract_balances`
- `close_requests`

### 2.4 SCP 消费对象
- `otp_contract_trace_views`
- `otp_billing_trace_views`

说明：
- demo 不必把这些对象拆成真实后端表，只要前端 mock data 结构上能表达这些概念即可
- 一些对象可以在代码里合并实现，但在产品语义上不能丢失

---

## 3. 核心字段（只列 demo 必需项）

### 3.1 Salesforce Snapshot
- snapshot_id
- pid
- acquisition_customer
- sales_project_name
- configuration_name
- pdcl_name
- gate
- gate_status
- customer_dos
- customer_sop
- year
- otp_amount
- otc_amount
- line_item_or_service
- linked_se4_status
- am

### 3.2 PMS Project
- pms_project_id
- customer
- pms_project_name
- product_category
- project_status
- system_project_type
- mcrl0
- pid
- quotation_status
- pjm

### 3.3 Contract Case
- case_id
- dummy_contract_id
- formal_contract_id
- customer
- contract_title
- contract_type (`new_project | ec | mixed`)
- product_name
- contract_total_amount
- currency
- source_file_name
- ai_extraction_status
- workflow_status
- current_owner
- otp_sync_visibility_status
- last_updated_at

### 3.4 Contract Allocation
- allocation_id
- case_id
- allocation_target_type (`salesforce | pms | others`)
- allocation_target_ref
- allocation_percent
- allocation_amount
- note_or_reason
- evidence_text_or_file

### 3.5 Contract Payment Node
- payment_node_id
- case_id
- node_name
- year
- ratio
- amount
- sequence

### 3.6 Billing Plan (MoM)
- mom_plan_id
- contract_ref
- customer
- planned_billing_month
- planned_billing_amount
- owner_cm
- status

### 3.7 Billing Event
- billing_event_id
- workon_no
- invoice_no
- pdcl
- billing_amount
- billing_date
- billing_status
- owner_cm

### 3.8 Billing Contract Allocation
- billing_allocation_id
- billing_event_id
- contract_ref
- allocation_percent
- allocation_amount

### 3.9 Contract Balance
- contract_ref
- original_amount
- allocated_billing_amount
- remaining_amount
- remaining_percent
- contract_balance_status (`open | fully_consumed | close_requested | closed`)

---

## 4. Demo 必须体现的状态

### 4.1 合同状态
- `draft`
- `ai_extracted_pending_check`
- `submitted_to_cm`
- `cm_rejected`
- `cm_confirmed_formalized`
- `pending_ca_approval`
- `ca_single_signed`
- `pending_archive`
- `archived_effective`
- `archived_with_diff_accepted`
- `closed`

### 4.2 开票状态
- `planned`
- `triggered`
- `pending_business_confirmation`
- `pending_workon`
- `billing_recorded`
- `allocated`
- `closed`

### 4.3 SCP 可见性状态
- `in_flight_pending_cm`
- `in_flight_pending_ca`
- `in_flight_pending_archive`
- `effective_archived`
- `billing_in_progress`
- `closed`

要求：
- 所有状态都必须有清晰 badge 文案
- 用户在页面上能看出“这份合同现在卡在哪一步、下一步是谁处理”

---

## 5. Demo 核心校验（前端演示级）

### 5.1 合同录入页
- 未上传文件不可提交
- 金额分配总和不等于合同总金额时不可提交
- `others` 若填写，必须带原因
- `new_project / mixed` 未选 Salesforce snapshot 不可提交
- 所有类型未选 PMS 项目不可提交

### 5.2 CM 审核页
- reject 必须填写原因
- confirm 后 dummy 合同号变 formal 合同号
- confirm 后 OTP 可见状态更新为 `in_flight_pending_archive`

### 5.3 归档页
- 上传双签文件后才能执行 archive confirm
- 若存在差异，需要用户显式点“接受差异后归档”

### 5.4 开票页
- 开票金额必须全部分配到合同
- 合同分配金额不能超过剩余余额
- 余额为 0 或状态为 closed 的合同不可再被选择
- close request 必须填写原因

---

## 6. Demo 假数据覆盖要求

至少准备以下场景：
- 1 个新项目合同 case：正常走完到 `archived_effective`
- 1 个 EC 合同 case：无 Salesforce，仅 PMS
- 1 个 mixed 合同 case：有 Salesforce + PMS + Others
- 1 个被 CM reject 的合同 case
- 1 个 pending archive 的合同 case（SCP 可见）
- 1 个已有开票事件、余额被部分消耗的合同
- 1 个发起 close request 的合同
