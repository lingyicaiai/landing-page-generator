import { useMemo, useState } from 'react'
import './App.css'

function buildBlocks(product, audience, value) {
  return {
    heroTitle: `${product}：为${audience}打造的高转化方案`,
    heroSub: `核心卖点：${value}`,
    features: [`更快启动 ${product} 项目`, `面向${audience}的清晰价值表达`, `用数据证明“${value}”`],
    faqQ: `为什么 ${audience} 需要 ${product}？`,
    faqA: `因为它能直接解决“${value}”的问题，且上手成本低。`,
    cta: `立即体验 ${product}`,
  }
}

export default function App() {
  const [product, setProduct] = useState('AI 招聘助手')
  const [audience, setAudience] = useState('中小团队 HR')
  const [value, setValue] = useState('1 小时完成岗位 JD 到候选人初筛')
  const [blocks, setBlocks] = useState(() => buildBlocks(product, audience, value))

  const markdown = useMemo(() => `# ${blocks.heroTitle}\n\n${blocks.heroSub}\n\n## Features\n- ${blocks.features[0]}\n- ${blocks.features[1]}\n- ${blocks.features[2]}\n\n## FAQ\n**Q: ${blocks.faqQ}**\n\nA: ${blocks.faqA}\n\n## CTA\n${blocks.cta}`, [blocks])

  const generate = () => setBlocks(buildBlocks(product, audience, value))
  const copyMd = async () => await navigator.clipboard.writeText(markdown)

  return (
    <main className="container stack">
      <header className="header"><h1>Landing Page Generator</h1><p>输入产品信息，生成可编辑落地页模块并复制 Markdown。</p></header>
      <section className="card stack">
        <div className="grid grid-2">
          <label>产品名<input value={product} onChange={(e) => setProduct(e.target.value)} /></label>
          <label>目标受众<input value={audience} onChange={(e) => setAudience(e.target.value)} /></label>
        </div>
        <label>核心卖点<textarea rows={3} value={value} onChange={(e) => setValue(e.target.value)} /></label>
        <div style={{ display: 'flex', gap: 10 }}><button onClick={generate}>生成模块</button><button className="secondary" onClick={copyMd}>复制 Markdown</button></div>
      </section>
      <section className="grid grid-2">
        <article className="card stack"><span className="badge">Hero</span><input value={blocks.heroTitle} onChange={(e) => setBlocks({ ...blocks, heroTitle: e.target.value })} /><textarea rows={3} value={blocks.heroSub} onChange={(e) => setBlocks({ ...blocks, heroSub: e.target.value })} /></article>
        <article className="card stack"><span className="badge">Feature</span>{blocks.features.map((f, i) => <input key={i} value={f} onChange={(e) => setBlocks({ ...blocks, features: blocks.features.map((x, idx) => idx === i ? e.target.value : x) })} />)}</article>
        <article className="card stack"><span className="badge">FAQ</span><input value={blocks.faqQ} onChange={(e) => setBlocks({ ...blocks, faqQ: e.target.value })} /><textarea rows={3} value={blocks.faqA} onChange={(e) => setBlocks({ ...blocks, faqA: e.target.value })} /></article>
        <article className="card stack"><span className="badge">CTA</span><input value={blocks.cta} onChange={(e) => setBlocks({ ...blocks, cta: e.target.value })} /></article>
      </section>
      <section className="card stack"><span className="badge">Markdown 预览</span><pre>{markdown}</pre></section>
    </main>
  )
}
