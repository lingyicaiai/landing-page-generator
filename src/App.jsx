import { useMemo, useState } from 'react'
import './App.css'

export default function App() {
  const [product, setProduct] = useState('AI 面试助手')
  const [audience, setAudience] = useState('校招生')
  const [value, setValue] = useState('3 分钟生成定制化面试题与反馈')

  const blocks = useMemo(() => ({
    hero: `${product}：让${audience}更快拿到 offer`,
    sub: value,
    cta: '立即免费试用'
  }), [product, audience, value])

  return (
    <main className="container">
      <h1>Landing Page Generator</h1>
      <input value={product} onChange={e => setProduct(e.target.value)} />
      <input value={audience} onChange={e => setAudience(e.target.value)} />
      <input value={value} onChange={e => setValue(e.target.value)} />
      <section className="card"><h2>{blocks.hero}</h2><p>{blocks.sub}</p><button>{blocks.cta}</button></section>
    </main>
  )
}
