const ROLES = [
  { role: 'User', type: '终端用户', duty: '完成 KYC、发起 USDC 支付、接收 T-Bill 代币' },
  { role: 'Compliance Gateway', type: '链下服务', duty: 'KYC/AML 校验、白名单维护、向 Custodian 与链上授权' },
  { role: 'Custodian (Off-chain)', type: '链下', duty: '接收 USDC、确认资金到账、与 SPV/发行人协调、触发 Mint 指令' },
  { role: 'Minting Contract', type: '链上 (Solana)', duty: '接收 Mint 指令、铸造 T-Bill 代币至用户地址' },
  { role: 'Oracle', type: '链上/链下', duty: '提供合规信号或授权数据，供 Minting Contract 或 Transfer Hook 校验' },
]

export default function RolesTable() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2 text-center">
        参与方与职责
      </h2>
      <p className="text-[var(--text-muted)] text-center mb-10">
        申购流程中的角色与职责简述
      </p>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]">
                <th className="px-6 py-4 font-display font-semibold text-white">角色</th>
                <th className="px-6 py-4 font-display font-semibold text-white">类型</th>
                <th className="px-6 py-4 font-display font-semibold text-white">职责简述</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map((r, i) => (
                <tr
                  key={r.role}
                  className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? 'bg-[var(--bg-card)]' : 'bg-[var(--bg-elevated)]/50'}`}
                >
                  <td className="px-6 py-4">
                    <span className="text-[var(--accent)] font-medium">{r.role}</span>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-muted)]">{r.type}</td>
                  <td className="px-6 py-4 text-[var(--text)]">{r.duty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
