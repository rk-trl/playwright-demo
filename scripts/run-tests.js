const path = require('node:path')
const fs = require('node:fs')
const { spawnSync } = require('node:child_process')

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}_${pad(date.getHours())}${pad(date.getMinutes())}`
}

const stamp = formatTimestamp(new Date())
const runDir = path.join(process.cwd(), 'test-results', `test-result_${stamp}`)
const screenshotsDir = path.join(runDir, 'screenshots')
const artifactsDir = path.join(runDir, 'artifacts')

fs.mkdirSync(screenshotsDir, { recursive: true })
fs.mkdirSync(artifactsDir, { recursive: true })

const result = spawnSync('npx', ['playwright', 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    TEST_RUN_DIR: runDir,
    SCREENSHOTS_DIR: screenshotsDir,
  },
})

process.exit(result.status ?? 1)
