export default function Hero({ onStart }) {
  return (
    <header className="relative overflow-hidden px-6 pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-glow)]/30 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative">
        <p className="text-[var(--accent)] font-medium text-sm uppercase tracking-widest mb-4">
          RWA · 美债代币化
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-white mb-6">
          Tokenized T-Bills
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10">
          从 KYC、USDC 支付到链上 Mint 的完整申购流程。基于 Solana Token-2022 与 Transfer Hooks 的合规设计。
        </p>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--accent)] text-[#0a0e14] font-semibold hover:bg-[var(--accent-dim)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg)] transition-all duration-200 shadow-lg shadow-[var(--accent-glow)]"
        >
          开始申购流程
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </header>
  )
}
