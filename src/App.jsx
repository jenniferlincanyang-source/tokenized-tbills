import { useRef } from 'react'
import Hero from './components/Hero'
import SubscriptionFlow from './components/SubscriptionFlow'
import SequenceDiagram from './components/SequenceDiagram'
import TransferHooksSection from './components/TransferHooksSection'
import RolesTable from './components/RolesTable'

function App() {
  const flowRef = useRef(null)
  const diagramRef = useRef(null)

  return (
    <div className="bg-grid min-h-screen">
      <Hero onStart={() => flowRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <section ref={flowRef} className="scroll-m-20">
        <SubscriptionFlow />
      </section>
      <section ref={diagramRef} className="scroll-m-20">
        <SequenceDiagram />
      </section>
      <section>
        <RolesTable />
      </section>
      <section>
        <TransferHooksSection />
      </section>
      <footer className="py-12 text-center text-sm text-[var(--text-muted)] border-t border-[var(--border)]">
        Tokenized T-Bills · 申购流程演示 (模拟) · 基于 PRD 片段
      </footer>
    </div>
  )
}

export default App
