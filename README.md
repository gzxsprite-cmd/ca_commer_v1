# ca_commer_v1

## OTP Domain GitHub Pages Demo（Phase 1）

这是一个 **前端演示系统**，用于帮助业务用户理解 OTP 正向维护链路。

- 无真实后端 API
- 无真实数据库
- 无真实 OCR / AI / 外部系统打通

## 本地运行

直接用任意静态服务器打开根目录即可，例如：

```bash
python3 -m http.server 8080
```

然后访问：`http://localhost:8080`

## Phase 1 页面

### 入口页
- `/`（hash 路由 `#/`）
  - 进入 Contract & Billing Operations Platform
  - 进入 SCP Workspace

### Contract & Billing Operations Platform
- `#/ops/home` 工作台首页
- `#/ops/contract-intake` 合同录入
- `#/ops/contract-review` 合同审核
- `#/ops/contract-archive` 合同归档
- `#/ops/billing-execution` 开票执行

### SCP Workspace（OTP）
- `#/scp/otp-home` OTP 首页（轻量）
- `#/scp/contract-trace` 合同追踪
- `#/scp/mapping-review` 映射审查（轻量）
- `#/scp/pending-archive-visibility` 待归档可见性

## Demo 重点

- 全页面以中文为主（保留必要英文 ID / 枚举值）
- 全流程状态使用 badge
- 显示当前处理人、下一步处理人、下一步动作
- 每个关键合同 case 含流程事件时间线
- 校验规则可在前端直接触发并可见

