// 极简 asar 提取器：列出/导出 app.asar 内的文件
const fs = require('fs');
const path = require('path');

const asar = process.argv[2];
const mode = process.argv[3] || 'list';
const pattern = process.argv[4] || '.mdj';
const outDir = process.argv[5];

const fd = fs.openSync(asar, 'r');
const head = Buffer.alloc(16);
fs.readSync(fd, head, 0, 16, 0);
const headerSize = head.readUInt32LE(4);
const headerBuf = Buffer.alloc(headerSize);
fs.readSync(fd, headerBuf, 0, headerSize, 8);
const header = JSON.parse(headerBuf.toString('utf8').slice(headerBuf.toString('utf8').indexOf('{')));
const contentStart = 8 + headerSize + 4;

const results = [];
function walk(node, prefix) {
  for (const [name, info] of Object.entries(node.files || {})) {
    const full = prefix + '/' + name;
    if (info.files) walk(info, full);
    else if (name.endsWith('.' + pattern) || (pattern !== '.' && full.includes(pattern))) {
      results.push({ full, size: info.size, offset: Number(info.offset) });
    }
  }
}
if (mode === 'list') {
  // 列出所有文件，便于按名称检索
  const all = [];
  (function walkAll(node, prefix) {
    for (const [name, info] of Object.entries(node.files || {})) {
      const full = prefix + '/' + name;
      if (info.files) walkAll(info, full);
      else all.push(full + ' ' + info.size);
    }
  })(header, '');
  console.log(all.join('\n'));
} else {
  walk(header, '');
  console.log('matches:', results.length);
  for (const r of results) {
    console.log(r.full, r.size);
    if (mode === 'extract' && outDir) {
      const buf = Buffer.alloc(r.size);
      fs.readSync(fd, buf, 0, r.size, contentStart + r.offset);
      const target = path.join(outDir, r.full.replace(/^\//, '').replace(/\\/g, '/'));
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, buf);
    }
  }
}
fs.closeSync(fd);
