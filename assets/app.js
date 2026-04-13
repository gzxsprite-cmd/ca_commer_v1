const store = {
  sfSnapshots: [
    { id: "SF-001", pid: "PID-1001", customer: "Tesla", config: "Model Y 2026", gate: "SE3" },
    { id: "SF-002", pid: "PID-1002", customer: "BYD", config: "Han L", gate: "SE4" },
    { id: "SF-003", pid: "PID-1003", customer: "NIO", config: "ET9", gate: "SE3" }
  ],
  pmsProjects: [
    { id: "PMS-201", pid: "PID-1001", name: "Model Y 量产导入", pjm: "Leo", status: "执行中" },
    { id: "PMS-202", pid: "PID-2008", name: "EC 快速支持", pjm: "Ivy", status: "执行中" },
    { id: "PMS-203", pid: "PID-1003", name: "ET9 SOP 准备", pjm: "Mina", status: "计划中" }
  ],
  contracts: [
    {
      caseId: "CASE-001",
      contractTitle: "Tesla Model Y OTP 新项目合同",
      contractType: "new_project",
      customer: "Tesla",
      totalAmount: 1000000,
      dummyId: "D1000001",
      formalId: "F9000001",
      workflowStatus: "archived_effective",
      otpVisibility: "effective_archived",
      currentOwner: "系统",
      nextOwner: "CM（开票计划）",
      nextStep: "维护月度开票计划",
      signedFile: "Tesla_双签.pdf",
      allocations: [
        { type: "salesforce", ref: "SF-001", amount: 600000 },
        { type: "pms", ref: "PMS-201", amount: 400000 }
      ],
      workflowEvents: [
        { at: "2026-03-01 10:00", action: "合同上传", owner: "AM", detail: "上传原始合同文件" },
        { at: "2026-03-01 10:03", action: "AI提取", owner: "系统", detail: "完成关键字段预填" },
        { at: "2026-03-01 11:00", action: "提交CM", owner: "AM", detail: "生成 dummy 合同号 D1000001" },
        { at: "2026-03-02 09:30", action: "CM确认", owner: "CM", detail: "转正式合同号 F9000001" },
        { at: "2026-03-03 16:20", action: "CA单签", owner: "CA", detail: "单签完成" },
        { at: "2026-03-05 15:40", action: "归档确认", owner: "CM", detail: "双签归档完成，合同正式生效" }
      ]
    },
    {
      caseId: "CASE-002",
      contractTitle: "BYD EC 合同",
      contractType: "ec",
      customer: "BYD",
      totalAmount: 300000,
      dummyId: "D1000002",
      formalId: "",
      workflowStatus: "submitted_to_cm",
      otpVisibility: "in_flight_pending_cm",
      currentOwner: "CM",
      nextOwner: "CM",
      nextStep: "审核并确认/驳回",
      signedFile: "",
      allocations: [{ type: "pms", ref: "PMS-202", amount: 300000 }],
      workflowEvents: [
        { at: "2026-04-06 09:10", action: "合同上传", owner: "AM", detail: "EC 合同上传" },
        { at: "2026-04-06 09:12", action: "AI提取", owner: "系统", detail: "识别到EC类型" },
        { at: "2026-04-06 10:05", action: "提交CM", owner: "AM", detail: "无 Salesforce，PMS-only" }
      ]
    },
    {
      caseId: "CASE-003",
      contractTitle: "NIO 混合合同",
      contractType: "mixed",
      customer: "NIO",
      totalAmount: 500000,
      dummyId: "D1000003",
      formalId: "",
      workflowStatus: "cm_rejected",
      otpVisibility: "in_flight_pending_cm",
      currentOwner: "AM",
      nextOwner: "AM",
      nextStep: "按驳回原因修改后重提",
      rejectReason: "Others 缺少证据附件",
      signedFile: "",
      allocations: [
        { type: "salesforce", ref: "SF-003", amount: 200000 },
        { type: "pms", ref: "PMS-203", amount: 250000 },
        { type: "others", ref: "渠道差异", amount: 50000, reason: "历史价差" }
      ],
      workflowEvents: [
        { at: "2026-04-01 09:00", action: "合同上传", owner: "AM", detail: "混合合同上传" },
        { at: "2026-04-01 09:04", action: "AI提取", owner: "系统", detail: "识别混合类型" },
        { at: "2026-04-01 10:00", action: "提交CM", owner: "AM", detail: "分配金额完成" },
        { at: "2026-04-02 14:30", action: "CM驳回", owner: "CM", detail: "驳回原因：Others 缺少证据附件" }
      ]
    },
    {
      caseId: "CASE-004",
      contractTitle: "Xpeng 新项目合同",
      contractType: "new_project",
      customer: "Xpeng",
      totalAmount: 700000,
      dummyId: "D1000004",
      formalId: "F9000004",
      workflowStatus: "pending_archive",
      otpVisibility: "in_flight_pending_archive",
      currentOwner: "CM",
      nextOwner: "CM",
      nextStep: "上传双签文件并确认归档",
      signedFile: "",
      diffDetected: true,
      allocations: [
        { type: "salesforce", ref: "SF-002", amount: 300000 },
        { type: "pms", ref: "PMS-203", amount: 400000 }
      ],
      workflowEvents: [
        { at: "2026-03-28 11:20", action: "提交CM", owner: "AM", detail: "提交审核" },
        { at: "2026-03-29 09:50", action: "CM确认", owner: "CM", detail: "生成正式合同号 F9000004" },
        { at: "2026-03-30 15:10", action: "CA单签", owner: "CA", detail: "单签完成，待双签归档" }
      ],
      blockerReason: "客户尚未回传双签版本"
    }
  ],
  balances: [
    { contractRef: "F9000001", original: 1000000, billed: 400000, remaining: 600000, status: "open" },
    { contractRef: "F9000004", original: 700000, billed: 0, remaining: 700000, status: "open" },
    { contractRef: "F9000007", original: 450000, billed: 450000, remaining: 0, status: "closed" }
  ],
  billingEvents: [
    {
      id: "BE-001",
      workonNo: "WO-8881",
      invoiceNo: "INV-3001",
      amount: 400000,
      status: "allocated",
      allocations: [{ contractRef: "F9000001", amount: 400000 }]
    }
  ],
  closeRequests: [
    {
      id: "CR-001",
      contractRef: "F9000099",
      reason: "客户项目提前终止",
      evidence: "终止邮件截图",
      status: "pending_hod"
    }
  ]
};

const labels = {
  workflow: {
    draft: "草稿",
    ai_extracted_pending_check: "AI待人工检查",
    submitted_to_cm: "已提交CM",
    cm_rejected: "CM驳回",
    cm_confirmed_formalized: "CM已确认正式编号",
    pending_ca_approval: "待CA审批",
    ca_single_signed: "CA单签完成",
    pending_archive: "待归档",
    archived_effective: "已归档生效",
    archived_with_diff_accepted: "接受差异后归档",
    closed: "已关闭"
  },
  visibility: {
    in_flight_pending_cm: "流转中-待CM",
    in_flight_pending_ca: "流转中-待CA",
    in_flight_pending_archive: "流转中-待归档",
    effective_archived: "已生效",
    billing_in_progress: "开票进行中",
    closed: "已关闭"
  }
};

function badge(text, type = "default") {
  return `<span class="badge ${type}">${text}</span>`;
}

function getStatusType(status) {
  if (["cm_rejected"].includes(status)) return "danger";
  if (["pending_archive", "submitted_to_cm", "pending_ca_approval"].includes(status)) return "warning";
  if (["archived_effective", "archived_with_diff_accepted"].includes(status)) return "success";
  return "default";
}

function shell(active) {
  return `
  <header>
    <h1>CA 商务协同平台（OTP 主题 Demo）</h1>
    <nav>
      <a href="#/" ${active === "landing" ? 'class="active"' : ""}>入口</a>
      <a href="#/ops/home" ${active.startsWith("ops") ? 'class="active"' : ""}>合同与开票作业平台</a>
      <a href="#/scp/otp-home" ${active.startsWith("scp") ? 'class="active"' : ""}>SCP 管理工作台</a>
    </nav>
  </header>`;
}

function layout(active, content) {
  document.getElementById("app").innerHTML = `${shell(active)}<main>${content}</main>`;
}

function renderLanding() {
  layout(
    "landing",
    `<section class="card">
      <h2>请选择演示前台</h2>
      <p>本 Demo 用于展示 OTP 业务主链路，不是生产系统。</p>
      <div class="grid two">
        <a class="btn primary" href="#/ops/home">进入 合同与开票作业平台</a>
        <a class="btn" href="#/scp/otp-home">进入 SCP 管理工作台</a>
      </div>
    </section>`
  );
}

function opsTabs(route) {
  return `<div class="tabs">
    <a href="#/ops/home" ${route === "home" ? 'class="active"' : ""}>工作台首页</a>
    <a href="#/ops/contract-intake" ${route === "intake" ? 'class="active"' : ""}>合同录入</a>
    <a href="#/ops/contract-review" ${route === "review" ? 'class="active"' : ""}>合同审核</a>
    <a href="#/ops/contract-archive" ${route === "archive" ? 'class="active"' : ""}>合同归档</a>
    <a href="#/ops/billing-execution" ${route === "billing" ? 'class="active"' : ""}>开票执行</a>
  </div>`;
}

function scpTabs(route) {
  return `<div class="tabs">
    <a href="#/scp/otp-home" ${route === "home" ? 'class="active"' : ""}>OTP 首页</a>
    <a href="#/scp/contract-trace" ${route === "trace" ? 'class="active"' : ""}>合同追踪</a>
    <a href="#/scp/mapping-review" ${route === "mapping" ? 'class="active"' : ""}>映射审查</a>
    <a href="#/scp/pending-archive-visibility" ${route === "pending" ? 'class="active"' : ""}>待归档可见性</a>
  </div>`;
}

function workflowPanel(c) {
  return `
    <div class="meta">
      <p><b>当前状态：</b>${badge(labels.workflow[c.workflowStatus] || c.workflowStatus, getStatusType(c.workflowStatus))}</p>
      <p><b>当前处理人：</b>${c.currentOwner || "-"}</p>
      <p><b>下一步处理人：</b>${c.nextOwner || "-"}</p>
      <p><b>下一步动作：</b>${c.nextStep || "-"}</p>
      <p><b>阻塞原因：</b>${c.blockerReason || c.rejectReason || "无"}</p>
    </div>
  `;
}

function timeline(events = []) {
  return `<ul class="timeline">${events
    .map(
      (e) => `<li><b>${e.at}</b>｜${e.action}｜处理人：${e.owner}<br/><span>${e.detail}</span></li>`
    )
    .join("")}</ul>`;
}

function renderOpsHome() {
  const pendingReview = store.contracts.filter((c) => ["submitted_to_cm", "cm_rejected"].includes(c.workflowStatus));
  const pendingArchive = store.contracts.filter((c) => c.workflowStatus === "pending_archive");
  layout(
    "ops",
    `${opsTabs("home")}
    <section class="grid two">
      <article class="card"><h2>待处理合同</h2>${pendingReview
        .map((c) => `<p>${c.caseId} - ${c.contractTitle} ${badge(labels.workflow[c.workflowStatus], getStatusType(c.workflowStatus))}</p>`)
        .join("")}</article>
      <article class="card"><h2>待归档</h2>${pendingArchive
        .map((c) => `<p>${c.formalId} - ${c.contractTitle} ${badge("待归档", "warning")}</p>`)
        .join("")}</article>
      <article class="card"><h2>本月开票任务</h2><p>1 笔开票事件待录入，2 份合同可挂靠。</p></article>
      <article class="card"><h2>关账例外</h2><p>${store.closeRequests.length} 条特殊关账申请待关注。</p></article>
    </section>`
  );
}

function renderContractIntake() {
  layout(
    "ops",
    `${opsTabs("intake")}
    <section class="card">
      <h2>合同录入（AM）</h2>
      <p class="helper">流程提示：合同上传 → AI提取占位 → 报价依据/执行项目映射 → 金额分配 → 提交 CM。</p>
      <div class="grid two">
        <label>合同标题<input id="in-title" value="示例新合同"/></label>
        <label>合同总金额<input id="in-total" type="number" value="100000"/></label>
      </div>
      <label>上传合同文件<input id="in-file" type="file"/></label>
      <p id="ai-msg" class="helper">请先上传文件触发 AI 提取占位。</p>
      <div class="grid three">
        <label>合同类型
          <select id="in-type"><option value="new_project">new_project</option><option value="ec">ec</option><option value="mixed">mixed</option></select>
        </label>
        <label>报价依据（Salesforce）金额<input id="in-sf" type="number" value="60000"/></label>
        <label>执行项目（PMS）金额<input id="in-pms" type="number" value="40000"/></label>
      </div>
      <div class="grid two">
        <label>Others 金额<input id="in-others" type="number" value="0"/></label>
        <label>Others 原因<input id="in-others-reason" placeholder="若有 Others 必填"/></label>
      </div>
      <div class="grid two">
        <label><input id="in-select-sf" type="checkbox" checked/> 已选择至少一个报价依据（Salesforce）</label>
        <label><input id="in-select-pms" type="checkbox" checked/> 已选择至少一个执行项目（PMS）</label>
      </div>
      <h3>当前流转提示</h3>
      ${workflowPanel({
        workflowStatus: "draft",
        currentOwner: "AM",
        nextOwner: "AM",
        nextStep: "完成映射与金额分配后提交 CM",
        blockerReason: "若未上传文件或校验不通过则无法提交"
      })}
      <button class="btn primary" id="in-submit">提交合同到 CM</button>
      <p id="in-result" class="helper"></p>
    </section>`
  );

  document.getElementById("in-file").addEventListener("change", () => {
    document.getElementById("ai-msg").textContent = "AI 提取完成，请检查字段与映射后再提交。";
  });

  document.getElementById("in-submit").addEventListener("click", () => {
    const total = Number(document.getElementById("in-total").value || 0);
    const sf = Number(document.getElementById("in-sf").value || 0);
    const pms = Number(document.getElementById("in-pms").value || 0);
    const others = Number(document.getElementById("in-others").value || 0);
    const type = document.getElementById("in-type").value;
    const hasFile = document.getElementById("in-file").files.length > 0;
    const hasSf = document.getElementById("in-select-sf").checked;
    const hasPms = document.getElementById("in-select-pms").checked;
    const othersReason = document.getElementById("in-others-reason").value.trim();
    const result = document.getElementById("in-result");

    if (!hasFile) return (result.textContent = "校验失败：未上传合同文件，不能提交。");
    if (sf + pms + others !== total) return (result.textContent = "校验失败：分配金额总和必须等于合同总金额。\n");
    if (["new_project", "mixed"].includes(type) && !hasSf) return (result.textContent = "校验失败：new_project / mixed 必须选择报价依据（Salesforce）。");
    if (!hasPms) return (result.textContent = "校验失败：所有合同类型必须选择执行项目（PMS）。");
    if (others > 0 && !othersReason) return (result.textContent = "校验失败：填写 Others 金额时必须填写原因。");

    const newCaseId = `CASE-${String(store.contracts.length + 1).padStart(3, "0")}`;
    const dummyId = `D1${String(Math.floor(Math.random() * 900000) + 100000)}`;
    store.contracts.unshift({
      caseId: newCaseId,
      contractTitle: document.getElementById("in-title").value,
      contractType: type,
      customer: "Demo Customer",
      totalAmount: total,
      dummyId,
      formalId: "",
      workflowStatus: "submitted_to_cm",
      otpVisibility: "in_flight_pending_cm",
      currentOwner: "CM",
      nextOwner: "CM",
      nextStep: "CM 审核合同",
      allocations: [
        { type: "salesforce", ref: "SF-001", amount: sf },
        { type: "pms", ref: "PMS-201", amount: pms },
        ...(others > 0 ? [{ type: "others", ref: "手工补充", amount: others, reason: othersReason }] : [])
      ],
      workflowEvents: [
        { at: new Date().toLocaleString("zh-CN"), action: "合同上传并提交", owner: "AM", detail: `生成 dummy 合同号 ${dummyId}` }
      ]
    });
    result.textContent = `提交成功：已生成 ${dummyId}，下一步处理人：CM。`;
  });
}

function renderContractReview() {
  const options = store.contracts
    .filter((c) => ["submitted_to_cm", "cm_rejected"].includes(c.workflowStatus))
    .map((c) => `<option value="${c.caseId}">${c.caseId}｜${c.contractTitle}</option>`)
    .join("");

  layout(
    "ops",
    `${opsTabs("review")}
    <section class="card">
      <h2>合同审核（CM）</h2>
      <label>选择合同 Case<select id="rv-case">${options}</select></label>
      <div id="rv-detail"></div>
      <div class="actions">
        <button class="btn primary" id="rv-confirm">确认并生成正式合同号</button>
        <input id="rv-reason" placeholder="驳回原因（驳回必填）"/>
        <button class="btn danger" id="rv-reject">驳回</button>
      </div>
      <p id="rv-msg" class="helper"></p>
    </section>`
  );

  const renderDetail = () => {
    const caseId = document.getElementById("rv-case").value;
    const c = store.contracts.find((x) => x.caseId === caseId);
    if (!c) return;
    document.getElementById("rv-detail").innerHTML = `
      <p>${badge(labels.workflow[c.workflowStatus], getStatusType(c.workflowStatus))} ${badge(labels.visibility[c.otpVisibility] || c.otpVisibility, "info")}</p>
      <p>Dummy 合同号：${c.dummyId || "-"}；Formal 合同号：${c.formalId || "-"}</p>
      ${workflowPanel(c)}
      <h3>流程时间线</h3>
      ${timeline(c.workflowEvents)}
    `;
  };

  document.getElementById("rv-case").addEventListener("change", renderDetail);
  renderDetail();

  document.getElementById("rv-confirm").addEventListener("click", () => {
    const caseId = document.getElementById("rv-case").value;
    const c = store.contracts.find((x) => x.caseId === caseId);
    const msg = document.getElementById("rv-msg");
    if (!c) return;
    c.formalId = c.formalId || `F9${String(Math.floor(Math.random() * 900000) + 100000)}`;
    c.workflowStatus = "pending_archive";
    c.otpVisibility = "in_flight_pending_archive";
    c.currentOwner = "CM";
    c.nextOwner = "CM";
    c.nextStep = "上传双签文件并确认归档";
    c.workflowEvents.push({ at: new Date().toLocaleString("zh-CN"), action: "CM确认", owner: "CM", detail: `转正式合同号 ${c.formalId}` });
    msg.textContent = `确认成功：${c.caseId} 已转正式合同号 ${c.formalId}，SCP 可见状态=流转中-待归档。`;
    renderDetail();
  });

  document.getElementById("rv-reject").addEventListener("click", () => {
    const caseId = document.getElementById("rv-case").value;
    const c = store.contracts.find((x) => x.caseId === caseId);
    const reason = document.getElementById("rv-reason").value.trim();
    const msg = document.getElementById("rv-msg");
    if (!reason) return (msg.textContent = "校验失败：驳回必须填写原因。");
    c.workflowStatus = "cm_rejected";
    c.rejectReason = reason;
    c.currentOwner = "AM";
    c.nextOwner = "AM";
    c.nextStep = "根据驳回原因修改后重提";
    c.workflowEvents.push({ at: new Date().toLocaleString("zh-CN"), action: "CM驳回", owner: "CM", detail: `驳回原因：${reason}` });
    msg.textContent = "已驳回并通知 AM 修改重提。";
    renderDetail();
  });
}

function renderContractArchive() {
  const candidates = store.contracts.filter((c) => c.workflowStatus === "pending_archive");
  const options = candidates.map((c) => `<option value="${c.caseId}">${c.formalId}｜${c.contractTitle}</option>`).join("");
  layout(
    "ops",
    `${opsTabs("archive")}
    <section class="card">
      <h2>合同归档（CM）</h2>
      <p class="helper">流程提示：CA 单签完成后，CM 上传客户双签文件并完成归档确认。</p>
      <label>待归档合同<select id="ar-case">${options || "<option>暂无</option>"}</select></label>
      <label>上传双签文件<input id="ar-file" type="file"/></label>
      <label><input type="checkbox" id="ar-accept-diff"/> 若存在差异，接受差异后归档</label>
      <div id="ar-detail"></div>
      <button class="btn primary" id="ar-confirm">确认归档</button>
      <p id="ar-msg" class="helper"></p>
    </section>`
  );

  const renderDetail = () => {
    const c = store.contracts.find((x) => x.caseId === document.getElementById("ar-case").value);
    if (!c) return;
    document.getElementById("ar-detail").innerHTML = `
      <p>差异比对结果：${c.diffDetected ? badge("存在差异", "warning") : badge("内容一致", "success")}</p>
      ${workflowPanel(c)}
      ${timeline(c.workflowEvents)}
    `;
  };

  if (candidates.length) {
    document.getElementById("ar-case").addEventListener("change", renderDetail);
    renderDetail();
  }

  document.getElementById("ar-confirm").addEventListener("click", () => {
    const msg = document.getElementById("ar-msg");
    const c = store.contracts.find((x) => x.caseId === document.getElementById("ar-case").value);
    if (!c) return;
    if (document.getElementById("ar-file").files.length === 0) return (msg.textContent = "校验失败：必须先上传双签文件。");
    if (c.diffDetected && !document.getElementById("ar-accept-diff").checked) {
      return (msg.textContent = "校验失败：存在差异时，需勾选“接受差异后归档”。");
    }
    c.workflowStatus = c.diffDetected ? "archived_with_diff_accepted" : "archived_effective";
    c.otpVisibility = "effective_archived";
    c.currentOwner = "系统";
    c.nextOwner = "CM";
    c.nextStep = "进入开票计划与执行";
    c.workflowEvents.push({ at: new Date().toLocaleString("zh-CN"), action: "归档确认", owner: "CM", detail: "双签归档完成" });
    msg.textContent = `归档成功：${c.formalId} 已进入已生效状态。`;
    renderDetail();
  });
}

function renderBillingExecution() {
  const allocContracts = store.balances.filter((b) => b.remaining > 0 && b.status !== "closed");
  layout(
    "ops",
    `${opsTabs("billing")}
    <section class="card">
      <h2>开票执行（CM）</h2>
      <p class="helper">路径提示：已归档合同 → 月计划 → 开票事件 → 分配到合同 → 余额扣减。</p>
      <div class="grid three">
        <label>Workon 编号<input id="be-workon" value="WO-9999"/></label>
        <label>发票号<input id="be-invoice" value="INV-NEW"/></label>
        <label>开票金额<input id="be-amount" type="number" value="120000"/></label>
      </div>
      <p>可分配合同（仅展示余额>0且非closed）：</p>
      ${allocContracts
        .map(
          (b, i) => `<label>${b.contractRef} 剩余 ${b.remaining}<input class="be-alloc" data-ref="${b.contractRef}" data-rem="${b.remaining}" type="number" value="${i === 0 ? 120000 : 0}"/></label>`
        )
        .join("")}
      <p class="helper">校验提示：单合同分配金额不能超过该合同剩余余额；开票金额必须全部分配。</p>
      <button class="btn primary" id="be-save">保存开票并分配</button>
      <hr/>
      <h3>特殊关账申请</h3>
      <div class="grid two">
        <label>合同号<input id="cr-contract" placeholder="如 F9000004"/></label>
        <label>申请原因<input id="cr-reason" placeholder="必须填写"/></label>
      </div>
      <button class="btn" id="cr-submit">发起关账申请</button>
      <p id="be-msg" class="helper"></p>
    </section>`
  );

  document.getElementById("be-save").addEventListener("click", () => {
    const amount = Number(document.getElementById("be-amount").value || 0);
    const inputs = Array.from(document.querySelectorAll(".be-alloc"));
    const allocated = inputs.reduce((sum, el) => sum + Number(el.value || 0), 0);
    const msg = document.getElementById("be-msg");

    for (const input of inputs) {
      if (Number(input.value || 0) > Number(input.dataset.rem)) {
        return (msg.textContent = `校验失败：${input.dataset.ref} 分配金额超过剩余余额。`);
      }
    }
    if (allocated !== amount) return (msg.textContent = "校验失败：开票金额必须全部分配到合同。");

    const eventId = `BE-${String(store.billingEvents.length + 1).padStart(3, "0")}`;
    const allocations = inputs
      .map((i) => ({ contractRef: i.dataset.ref, amount: Number(i.value || 0) }))
      .filter((a) => a.amount > 0);
    store.billingEvents.push({ id: eventId, workonNo: document.getElementById("be-workon").value, invoiceNo: document.getElementById("be-invoice").value, amount, status: "allocated", allocations });
    allocations.forEach((a) => {
      const bal = store.balances.find((b) => b.contractRef === a.contractRef);
      if (bal) {
        bal.billed += a.amount;
        bal.remaining -= a.amount;
      }
    });
    msg.textContent = `保存成功：${eventId} 已完成分配并更新合同余额。`;
  });

  document.getElementById("cr-submit").addEventListener("click", () => {
    const reason = document.getElementById("cr-reason").value.trim();
    const contractRef = document.getElementById("cr-contract").value.trim();
    const msg = document.getElementById("be-msg");
    if (!reason) return (msg.textContent = "校验失败：关账申请必须填写原因。");
    store.closeRequests.push({ id: `CR-${String(store.closeRequests.length + 1).padStart(3, "0")}`, contractRef, reason, evidence: "演示证据", status: "pending_hod" });
    msg.textContent = "关账申请已提交，等待 HoD 审批。";
  });
}

function renderScpHome() {
  layout(
    "scp",
    `${scpTabs("home")}
    <section class="grid two">
      <article class="card"><h2>OTP 概览</h2><p>流转中合同：${store.contracts.filter((c) => c.otpVisibility.includes("in_flight")).length}</p><p>已生效合同：${store.contracts.filter((c) => c.otpVisibility === "effective_archived").length}</p></article>
      <article class="card"><h2>快速入口</h2><p><a href="#/scp/contract-trace">合同追踪</a> / <a href="#/scp/mapping-review">映射审查</a></p></article>
    </section>`
  );
}

function renderContractTrace() {
  layout(
    "scp",
    `${scpTabs("trace")}
    <section class="card">
      <h2>合同追踪（SCP）</h2>
      <p class="helper">清晰区分 in-flight 与 effective，SCP仅查看不执行维护。</p>
      <table>
        <thead><tr><th>Case</th><th>合同标题</th><th>状态</th><th>可见性</th><th>当前处理人</th><th>下一步</th><th>阻塞原因</th></tr></thead>
        <tbody>
          ${store.contracts
            .map(
              (c) => `<tr><td>${c.caseId}</td><td>${c.contractTitle}</td><td>${badge(labels.workflow[c.workflowStatus], getStatusType(c.workflowStatus))}</td><td>${badge(labels.visibility[c.otpVisibility] || c.otpVisibility, "info")}</td><td>${c.currentOwner}</td><td>${c.nextOwner}：${c.nextStep}</td><td>${c.blockerReason || c.rejectReason || "-"}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    </section>`
  );
}

function renderMappingReview() {
  const filter = new URLSearchParams(location.hash.split("?")[1] || "").get("status") || "all";
  const rows = store.contracts.filter((c) => filter === "all" || c.otpVisibility === filter);
  layout(
    "scp",
    `${scpTabs("mapping")}
    <section class="card">
      <h2>映射审查（轻量版）</h2>
      <p class="helper">SCP 关注：映射对象、当前状态、是否流转中/已生效、阻塞点。</p>
      <label>状态筛选
        <select id="mp-filter">
          <option value="all" ${filter === "all" ? "selected" : ""}>全部</option>
          <option value="in_flight_pending_archive" ${filter === "in_flight_pending_archive" ? "selected" : ""}>流转中-待归档</option>
          <option value="effective_archived" ${filter === "effective_archived" ? "selected" : ""}>已生效</option>
        </select>
      </label>
      <div class="grid two">
      ${rows
        .map((c) => {
          const sf = c.allocations.filter((a) => a.type === "salesforce").map((a) => `${a.ref}/${a.amount}`).join("；") || "无";
          const pms = c.allocations.filter((a) => a.type === "pms").map((a) => `${a.ref}/${a.amount}`).join("；") || "无";
          const others = c.allocations.filter((a) => a.type === "others").map((a) => `${a.ref}/${a.amount}`).join("；") || "无";
          const inflight = c.otpVisibility.startsWith("in_flight");
          return `<article class="card">
            <h3>${c.caseId}｜${c.contractTitle}</h3>
            <p><b>映射关系：</b>报价依据（Salesforce）→ ${sf}；执行项目（PMS）→ ${pms}；Others → ${others}</p>
            <p><b>状态：</b>${badge(labels.workflow[c.workflowStatus] || c.workflowStatus, getStatusType(c.workflowStatus))} ${badge(labels.visibility[c.otpVisibility] || c.otpVisibility, "info")}</p>
            <p><b>流转判断：</b>${inflight ? badge("仍在流转中", "warning") : badge("已生效", "success")}</p>
            <p><b>当前处理人：</b>${c.currentOwner} ｜ <b>下一步处理人：</b>${c.nextOwner}</p>
            <p><b>下一步动作：</b>${c.nextStep}</p>
            <p><b>阻塞原因：</b>${c.blockerReason || c.rejectReason || "无"}</p>
          </article>`;
        })
        .join("")}
      </div>
    </section>`
  );

  document.getElementById("mp-filter").addEventListener("change", (e) => {
    location.hash = `#/scp/mapping-review?status=${e.target.value}`;
  });
}

function renderPendingArchive() {
  const pendingCm = store.contracts.filter((c) => c.otpVisibility === "in_flight_pending_cm");
  const pendingCa = store.contracts.filter((c) => c.otpVisibility === "in_flight_pending_ca");
  const pendingAr = store.contracts.filter((c) => c.otpVisibility === "in_flight_pending_archive");
  layout(
    "scp",
    `${scpTabs("pending")}
    <section class="grid three">
      <article class="card"><h2>待 CM</h2>${pendingCm.map((c) => `<p>${c.caseId}｜${c.nextStep}</p>`).join("") || "<p>无</p>"}</article>
      <article class="card"><h2>待 CA</h2>${pendingCa.map((c) => `<p>${c.caseId}｜${c.nextStep}</p>`).join("") || "<p>无</p>"}</article>
      <article class="card"><h2>待归档</h2>${pendingAr.map((c) => `<p>${c.caseId}｜阻塞：${c.blockerReason || "待上传双签文件"}</p>`).join("") || "<p>无</p>"}</article>
    </section>`
  );
}

function route() {
  const hash = location.hash || "#/";
  const path = hash.split("?")[0];
  const handlers = {
    "#/": renderLanding,
    "#/ops/home": renderOpsHome,
    "#/ops/contract-intake": renderContractIntake,
    "#/ops/contract-review": renderContractReview,
    "#/ops/contract-archive": renderContractArchive,
    "#/ops/billing-execution": renderBillingExecution,
    "#/scp/otp-home": renderScpHome,
    "#/scp/contract-trace": renderContractTrace,
    "#/scp/mapping-review": renderMappingReview,
    "#/scp/pending-archive-visibility": renderPendingArchive
  };

  (handlers[path] || renderLanding)();
}

window.addEventListener("hashchange", route);
route();
