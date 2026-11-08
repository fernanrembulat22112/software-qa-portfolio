import { mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { marked } from 'marked'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(root, 'public', 'saucedemo', 'docs')
const documents = [
  {
    source: path.join(root, 'docs', 'saucedemo', 'SauceDemo_Manual_QA_Portfolio_Report.md'),
    output: path.join(outputDirectory, 'SauceDemo_Manual_QA_Portfolio_Report.pdf'),
    title: 'SauceDemo Manual QA Portfolio Report',
  },
  {
    source: path.join(root, 'docs', 'saucedemo', 'bug-report.md'),
    output: path.join(outputDirectory, 'SD-BUG-001_Defect_Report.pdf'),
    title: 'SD-BUG-001 Defect Report',
  },
]

const styles = `
  @page { size: A4; margin: 20mm 17mm 19mm; }
  * { box-sizing: border-box; }
  body { margin: 0; color: #17233c; font: 10pt/1.55 Arial, Helvetica, sans-serif; }
  h1, h2, h3, h4 { color: #10254a; line-height: 1.25; break-after: avoid; }
  h1 { margin: 0 0 14pt; padding-bottom: 10pt; border-bottom: 2pt solid #f47b20; font-size: 23pt; }
  h2 { margin: 21pt 0 8pt; padding-bottom: 5pt; border-bottom: 1pt solid #d5deeb; font-size: 15pt; }
  h3 { margin: 16pt 0 6pt; font-size: 12pt; }
  h4 { margin: 12pt 0 5pt; font-size: 10pt; }
  p { margin: 6pt 0 9pt; orphans: 3; widows: 3; }
  ul, ol { margin: 5pt 0 10pt; padding-left: 20pt; }
  li { margin: 2pt 0; }
  table { width: 100%; margin: 10pt 0 14pt; border-collapse: collapse; font-size: 8pt; line-height: 1.4; }
  thead { display: table-header-group; }
  tr { break-inside: avoid; }
  th { background: #eaf0f8; color: #10254a; text-align: left; }
  th, td { padding: 5pt 6pt; border: 1px solid #cbd5e1; vertical-align: top; }
  code { padding: 1pt 3pt; border-radius: 2pt; background: #eef2f7; font: 8.5pt Consolas, monospace; overflow-wrap: anywhere; }
  a { color: #124e9b; text-decoration: underline; overflow-wrap: anywhere; }
  blockquote { margin: 9pt 0; padding: 4pt 10pt; border-left: 3pt solid #f47b20; color: #475569; }
  hr { margin: 16pt 0; border: 0; border-top: 1px solid #cbd5e1; }
  strong { color: #17233c; }
  .doc-label { margin-bottom: 8pt; color: #b64d0b; font-size: 8pt; font-weight: bold; letter-spacing: .08em; text-transform: uppercase; }
`

await mkdir(outputDirectory, { recursive: true })
const browser = await chromium.launch({ headless: true })

try {
  for (const document of documents) {
    const markdown = await readFile(document.source, 'utf8')
    const content = await marked.parse(markdown, { gfm: true })
    const page = await browser.newPage()
    await page.setContent(`<!doctype html>
      <html lang="en"><head><meta charset="utf-8"><title>${document.title}</title>
      <style>${styles}</style></head>
      <body><div class="doc-label">Fernan Rembulat · Independent Practice Project</div>${content}</body></html>`, { waitUntil: 'load' })
    await page.pdf({
      path: document.output,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: '<div style="width:100%;margin:0 17mm;color:#64748b;font:8px Arial,sans-serif;display:flex;justify-content:space-between"><span>SauceDemo Manual QA Practice</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
      margin: { top: '20mm', right: '17mm', bottom: '19mm', left: '17mm' },
    })
    await page.close()
    console.log(`Created ${path.relative(root, document.output)}`)
  }
} finally {
  await browser.close()
}
