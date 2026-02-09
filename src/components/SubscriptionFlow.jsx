import { useState } from 'react'

const STEPS = [
  { id: 'kyc', title: 'KYC / 身份认证', desc: '通过 Compliance Gateway 完成身份校验并加入白名单' },
  { id: 'pay', title: '申购与 USDC 支付', desc: '选择金额并转入 Custodian 托管账户' },
  { id: 'confirm', title: '链下确认与 Mint 指令', desc: 'Custodian 确认到账并请求链上铸造' },
  { id: 'mint', title: '链上铸造', desc: 'Minting Contract 校验后 Token-2022 Mint，代币入账' },
]

function StepCard({ step, index, isActive, isDone, children }) {
  return (
        <div
      className={`
        rounded-2xl border transition-all duration-300 overflow-hidden
        ${isActive ? 'border-[var(--accent)] bg-[var(--bg-elevated)] shadow-lg shadow-[var(--accent-glow)] scale-[1.01]' : 'border-[var(--border)] bg-[var(--bg-card)]'}
        ${isDone ? 'opacity-95' : ''}
      `}
    >
      <div className="flex items-center gap-4 p-5 border-b border-[var(--border)]">
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold font-display
            ${isDone ? 'bg-[var(--success-bg)] text-[var(--success)]' : isActive ? 'bg-[var(--accent)] text-[#0a0e14]' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'}
          `}
        >
          {isDone ? '✓' : index + 1}
        </div>
        <div>
          <h3 className="font-display font-semibold text-white">{step.title}</h3>
          <p className="text-sm text-[var(--text-muted)]">{step.desc}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default function SubscriptionFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [kycDone, setKycDone] = useState(false)
  const [amount, setAmount] = useState('10000')
  const [wallet, setWallet] = useState('9WzDX4...pQk2nR')
  const [refId, setRefId] = useState('')
  const [payDone, setPayDone] = useState(false)
  const [mintTx, setMintTx] = useState('')

  const generateRefId = () => {
    const id = 'SUB-' + Math.random().toString(36).slice(2, 10).toUpperCase()
    setRefId(id)
    return id
  }

  const handleKycSubmit = () => {
    setKycDone(true)
    setTimeout(() => setCurrentStep(1), 600)
  }

  const handlePaySubmit = (e) => {
    e.preventDefault()
    if (!refId) generateRefId()
    setPayDone(true)
    setTimeout(() => setCurrentStep(2), 400)
    setTimeout(() => setCurrentStep(3), 2200)
  }

  const handleMintSimulate = () => {
    setMintTx('5' + Math.random().toString(36).slice(2, 15) + '...')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2 text-center">
        申购流程
      </h2>
      <p className="text-[var(--text-muted)] text-center mb-12">
        Subscription Flow · 按步骤完成 KYC、支付与链上铸造
      </p>

      <div className="space-y-6">
        {/* Step 1: KYC */}
        <StepCard
          step={STEPS[0]}
          index={0}
          isActive={currentStep === 0}
          isDone={kycDone}
        >
          {!kycDone ? (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-muted)]">
                模拟向 Compliance Gateway 提交身份信息，通过后加入申购白名单。
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleKycSubmit}
                  className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[#0a0e14] font-semibold hover:bg-[var(--accent-dim)] transition-colors"
                >
                  完成 KYC（模拟）
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-[var(--success)]">
              <span className="text-2xl">✓</span>
              <span>已加入白名单，可进行申购。</span>
            </div>
          )}
        </StepCard>

        {/* Step 2: Pay USDC */}
        <StepCard
          step={STEPS[1]}
          index={1}
          isActive={currentStep === 1}
          isDone={payDone}
        >
          <form onSubmit={handlePaySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">申购金额 (USDC)</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                placeholder="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">接收代币的 Solana 地址</label>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] font-mono text-sm"
                placeholder="9WzDX4...pQk2nR"
              />
            </div>
            {refId && (
              <p className="text-sm text-[var(--text-muted)]">
                Reference ID: <code className="text-[var(--accent)]">{refId}</code>
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[var(--accent)] text-[#0a0e14] font-semibold hover:bg-[var(--accent-dim)] transition-colors"
            >
              {refId ? '确认支付 USDC（模拟）' : '生成 Reference ID 并支付 USDC（模拟）'}
            </button>
          </form>
          {payDone && (
            <div className="flex items-center gap-3 text-[var(--success)] mt-4">
              <span className="text-2xl">✓</span>
              <span>USDC 已转入托管账户，Reference ID: {refId || 'SUB-XXXX'}</span>
            </div>
          )}
        </StepCard>

        {/* Step 3: Custodian confirm */}
        <StepCard
          step={STEPS[2]}
          index={2}
          isActive={currentStep === 2}
          isDone={currentStep >= 3}
        >
          {currentStep < 2 ? (
            <p className="text-sm text-[var(--text-muted)]">请先完成支付。</p>
          ) : currentStep === 2 ? (
            <div className="flex items-center gap-3 text-[var(--accent)]">
              <span className="animate-pulse">⏳</span>
              <span>Custodian 确认到账 → 合规复核 → 向 Minting Contract 发起 Mint 请求…</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-[var(--success)]">
              <span className="text-2xl">✓</span>
              <span>合规通过，Mint 指令已发送至链上。</span>
            </div>
          )}
        </StepCard>

        {/* Step 4: Mint */}
        <StepCard
          step={STEPS[3]}
          index={3}
          isActive={currentStep === 3}
          isDone={!!mintTx}
        >
          {currentStep < 3 ? (
            <p className="text-sm text-[var(--text-muted)]">请先完成前述步骤。</p>
          ) : !mintTx ? (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-muted)]">
                Minting Contract 校验 Oracle 授权后，通过 Token-2022 向您的地址铸造 T-Bill 代币。
              </p>
              <button
                type="button"
                onClick={handleMintSimulate}
                className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[#0a0e14] font-semibold hover:bg-[var(--accent-dim)] transition-colors"
              >
                模拟链上 Mint
              </button>
            </div>
          ) : (
            <div className="rounded-xl bg-[var(--success-bg)] border border-[var(--success)]/30 p-4">
              <p className="text-[var(--success)] font-medium mb-1">代币已铸造并入账</p>
              <p className="text-sm text-[var(--text-muted)]">
                数量: <span className="text-white">{amount} USDC 等值</span> T-Bill 代币
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-1 font-mono">
                模拟 Tx: {mintTx}
              </p>
            </div>
          )}
        </StepCard>
      </div>
    </div>
  )
}
