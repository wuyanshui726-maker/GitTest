// 探测 StarUML .mdj 结构：列出所有图，并抽样打印各类视图的 JSON 片段
const fs = require('fs')
const file = process.argv[2]
const mode = process.argv[3] || 'list'
const proj = JSON.parse(fs.readFileSync(file, 'utf8'))

function walk (node, path, out) {
  if (!node) return
  const kids = node.ownedElements || []
  for (const c of kids) {
    const p2 = path + '/' + (c.name || c._type)
    if (/Diagram/.test(c._type)) out.push({ type: c._type, name: c.name, path: p2, views: (c.ownedViews || []).length, node: c })
    walk(c, p2, out)
  }
}
const diagrams = []
walk(proj, '', diagrams)

if (mode === 'list') {
  for (const d of diagrams) console.log(d.type, '|', d.name, '| views:', d.views)
} else {
  // 打印前若干个图的视图样板
  const want = process.argv[4] || 'use'
  const d = diagrams.find(x => x.type.toLowerCase().includes(want)) || diagrams[0]
  console.log('DIAGRAM:', d.type, d.name)
  const sample = JSON.stringify(d.node.ownedViews || [], (k, v) => {
    if (k === 'ownedElements' && Array.isArray(v) && v.length) return v.slice(0, 1)
    return v
  }, 2)
  console.log(sample.length > 12000 ? sample.slice(0, 12000) : sample)
}
