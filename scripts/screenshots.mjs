import { chromium } from 'playwright'

const BASE = 'http://localhost:3000'
const OUT = 'screenshots'

async function shot(page, name, url) {
  console.log(`📸 ${name}...`)
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(3000) // wait for animations + MSW
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false })
  console.log(`   ✅ ${name}.png`)
}

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

  await shot(page, 'dashboard', `${BASE}/dashboard`)
  await shot(page, 'monitoring', `${BASE}/monitoring`)
  await shot(page, 'sales', `${BASE}/sales`)

  await browser.close()
  console.log('Done!')
}

main().catch(err => { console.error(err); process.exit(1) })
