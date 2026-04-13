# OTP-v2-GitHubPages-Demo-Codex-Brief

## 1. 文档目标

本文档用于直接给 Codex 作为本轮 demo 的执行边界说明。

本轮不是生产开发，而是：
- 做一版能在 GitHub Pages 上运行
- 能让业务用户通过操作理解正确 workflow
- 能清楚表达双前台、状态、关键校验、主链逻辑

---

## 2. 本轮目标

Codex 本轮需要完成：

### 2.1 平台壳
- 一个 Contract & Billing Operations Platform
- 一个 SCP Workspace
- 两者可通过统一 shell 或明显入口切换

### 2.2 OTP 主题 demo
完成 OTP 主题下的：
- Contract Intake
- Contract Review
- Contract Archive
- Billing MoM Plan
- Billing Execution
- Billing Records
- OTP Home
- Contract Trace
- Billing Trace
- Mapping Review
- Pending Archive Visibility

### 2.3 假数据闭环
用户必须能在 demo 中清楚感知：
- 上传合同 -> AI 提取 -> mapping -> 提交 -> CM 确认 -> formal id -> 待归档 -> 已归档
- 合同归档后 -> 月度计划 -> 到月提醒 -> 开票录入 -> 挂账 -> 余额扣减
- SCP 能看到未归档和已归档的区别

---

## 3. 本轮不做

- 不做真实后端 API
- 不做真实数据库
- 不做真实 OCR / AI，只做占位和模拟结果
- 不打通 Salesforce / PMS / Workon
- 不做 Price 主题细节
- 不做生产级权限、审计、安全
- 不做复杂导入导出
- 不做完整 planning / adjustment 业务逻辑

---

## 4. 对 Codex 的实现要求

### 4.1 页面优先级
先做：
1. 双前台 shell
2. Contract Intake
3. Contract Review
4. Contract Archive
5. Billing Execution
6. OTP Contract Trace / Pending Archive Visibility

后做：
7. Billing MoM Plan
8. Billing Records
9. Billing Trace
10. Mapping Review
11. OTP Home / Review Dashboard

### 4.2 交互要求
- 所有页面必须让用户看得出当前在哪条主链上
- 所有状态必须有 badge
- 页面必须显式展示 next owner / next step
- 关键错误必须即时提示
- 金额校验必须在前端实时反馈
- Salesforce 与 PMS 在界面上必须明确写成“报价依据 / 执行项目”

### 4.3 UI 取向
- 不追求复杂设计语言
- 优先强调信息结构清晰
- 一线业务能快速理解谁该做什么
- 对管理角色要强调状态、阻塞点、下一步

---

## 5. 假数据演示要求

至少提供以下 demo 路径：

### 路径 A：正常合同
AM 上传 -> AI 提取 -> 选项目 -> 分配金额 -> 提交 -> CM 确认 -> CA 通过 -> 双签归档 -> SCP 可见为已生效

### 路径 B：被拒绝合同
AM 上传 -> CM reject -> 填原因 -> AM 重提

### 路径 C：待归档合同
CM 确认 formal id 后未完成归档 -> SCP 在 Pending Archive Visibility 中可见

### 路径 D：开票与余额
归档生效合同 -> 进入本月计划 -> 录入开票事件 -> 挂合同 -> 余额下降

### 路径 E：关账申请
合同未打满 -> CM 发起 close request -> HoD approve -> 合同 closed

---

## 6. 交付定义（DoD）

本轮 demo 完成标准：
- GitHub Pages 可直接打开
- 关键页面可跳转
- 关键状态可见
- 假数据闭环可演示
- 页面上的操作结果符合用户故事主链
- 用户不看文档，也能通过页面理解大致流程

---

## 7. 给 Codex 的工作方式要求

Codex 在实施前必须先：
1. 读取：
   - `docs/CA-Workspace-&-Operations-Platform-Framework.md`
   - `docs/OTP-Management-正向业务维护链路用户故事文档.md`
   - `docs/OTP-Domain-Demo-Data-&-State.md`
   - `docs/OTP-Domain-Demo-Page-Spec.md`
   - `docs/OTP-v2-GitHubPages-Demo-Codex-Brief.md`
2. 先输出 implementation plan
3. 明确本轮页面清单、路由清单、mock data 方案
4. 不要在未给出 plan 前直接开始写代码

实施完成后需同步更新：
- demo 使用说明
- 页面清单
- mock data 说明
