import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

const hookDiagramCode = `
sequenceDiagram
    participant Sender as 发送方 (已KYC)
    participant Token as Token-2022 Program
    participant Hook as Transfer Hook 程序
    participant Oracle as Oracle (白名单)

    Sender->>Token: transfer(recipient, amount)
    Token->>Hook: 调用 Hook(sender, recipient, amount)
    Hook->>Oracle: 查询 recipient 是否在白名单
    Oracle->>Hook: 返回 是/否

    alt 接收方在白名单
        Hook->>Token: 返回 Ok
        Token->>Token: 执行扣减与增加余额
        Token->>Sender: 转账成功
    else 接收方不在白名单
        Hook->>Token: 返回 Error (合规拒绝)
        Token->>Sender: 转账回滚，失败
    end
`

export default function TransferHooksSection() {
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
        useMaxWidth: true,
        wrap: true,
      },
    })

    mermaid
      .render('seq-transfer-hook', hookDiagramCode)
      .then(({ svg: result }) => setSvg(result))
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2 text-center">
        Token-2022 Transfer Hooks
      </h2>
      <p className="text-[var(--text-muted)] text-center mb-6 max-w-2xl mx-auto">
        在每次 transfer 时由 Hook 程序校验接收方是否在 Oracle 白名单，实现合规转账限制。
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h3 className="font-display font-semibold text-[var(--accent)] mb-3">为何需要</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            申购阶段通过 KYC 控制「谁可以持有」；若代币可自由转账，未 KYC 地址仍可能通过二级接收持有。因此需在<strong className="text-[var(--text)]">每次转账时</strong>做合规校验，仅允许转入白名单地址。
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h3 className="font-display font-semibold text-[var(--accent)] mb-3">机制简述</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Token-2022 在 <code className="text-[var(--accent)]">transfer</code> / <code className="text-[var(--accent)]">transfer_checked</code> 时先调用开发者指定的 Hook 程序；Hook 返回错误则整笔转账回滚，从而实现「只有通过 Hook 校验的转账才被允许」。
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8 overflow-x-auto">
        <p className="text-[var(--text-muted)] text-sm mb-4 text-center">合规 Transfer 时序（接收方在白名单 / 不在白名单）</p>
        {error && (
          <p className="text-[var(--error)] text-sm">图表渲染失败: {error}</p>
        )}
        {svg && (
          <div className="flex justify-center [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        )}
      </div>
    </div>
  )
}
