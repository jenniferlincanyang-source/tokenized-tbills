# 美债代币化 · 申购流程演示前端

基于 PRD 的可交互前端：Tokenized T-Bills 申购流程（KYC → USDC 支付 → 链上 Mint）与 Token-2022 Transfer Hooks 说明。

## 运行方式

```bash
cd frontend
npm install
npm run dev
```

浏览器打开终端显示的本地地址（如 `http://localhost:5173`）。

## 功能概览

- **首屏**：标题与「开始申购流程」按钮，点击平滑滚动至申购区域。
- **申购流程**：四步可交互卡片——完成 KYC（模拟）→ 输入金额与钱包地址并支付（模拟）→ 链下确认（自动推进）→ 模拟链上 Mint 并展示结果。
- **时序图**：Mermaid 绘制的申购流程 Sequence Diagram（User / Compliance Gateway / Custodian / Oracle / Minting Contract）。
- **参与方表格**：各角色与职责说明。
- **Transfer Hooks**：Token-2022 合规转账说明 + Mermaid 时序图（白名单校验）。

## 技术栈

- Vite + React 18
- Tailwind CSS
- Mermaid（时序图渲染）

https://jenniferlincanyang-source.github.io/tokenized-tbills/
