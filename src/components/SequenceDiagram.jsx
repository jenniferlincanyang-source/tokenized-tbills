import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

const diagramCode = `
sequenceDiagram
    autonumber
    participant User as User
    participant CG as Compliance Gateway
    participant Custodian as Custodian (Off-chain)
    participant Oracle as Oracle
    participant Mint as Minting Contract

    User->>CG: 1. 提交 KYC / 身份信息
    CG->>CG: 2. KYC/AML 校验
    CG->>User: 3. 通过 → 加入白名单

    User->>Custodian: 4. 发起申购 + 转 USDC 至托管账户
    Custodian->>Custodian: 5. 确认 USDC 到账
    Custodian->>CG: 6. 请求合规复核（用户+金额+Reference ID）
    CG->>Oracle: 7. 写入/更新合规信号（可铸造清单）
    CG->>Custodian: 8. 确认合规，允许铸造

    Custodian->>Mint: 9. 调用 mint(user, amount, proof)
    Mint->>Oracle: 10. 查询/验证 proof 或合规状态
    Oracle->>Mint: 11. 返回授权结果
    Mint->>Mint: 12. 校验通过 → Token-2022 Mint
    Mint->>User: 13. 代币入账（用户 SPL 账户）
`

export default function SequenceDiagram() {
  const containerRef = useRef(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#161d28',
        primaryTextColor: '#e6edf5',
        primaryBorderColor: '#252d3a',
        lineColor: '#8b9cb3',
        secondaryColor: '#111820',
        tertiaryColor: '#0a0e14',
        background: '#0a0e14',
        mainBkg: '#161d28',
        secondBkg: '#111820',
        border1: '#252d3a',
        border2: '#c9a227',
        arrowheadColor: '#c9a227',
        fontSize: '14px',
        fontFamily: 'DM Sans, system-ui, sans-serif',
      },
      sequence: {
        actorMargin: 50,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: false,
        useMaxWidth: true,
        wrap: true,
      },
    })

    mermaid
      .render('seq-subscription', diagramCode)
      .then(({ svg: result }) => setSvg(result))
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2 text-center">
        申购流程时序图
      </h2>
      <p className="text-[var(--text-muted)] text-center mb-10">
        User → Compliance Gateway → Custodian → Oracle → Minting Contract
      </p>
      <div
        ref={containerRef}
        className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 overflow-x-auto flex justify-center"
      >
        {error && (
          <p className="text-[var(--error)] text-sm">图表渲染失败: {error}</p>
        )}
        {svg && (
          <div
            className="mermaid-svg [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </div>
  )
}
