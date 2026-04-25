const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

function main() {
  const resultsRoot = path.join(process.cwd(), 'test-results')

  if (!fs.existsSync(resultsRoot)) {
    console.error('No test-results directory found. Run tests first.')
    process.exit(1)
  }

  const candidates = fs
    .readdirSync(resultsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('test-result_'))
    .map((entry) => entry.name)
    .sort()

  if (candidates.length === 0) {
    console.error('No timestamped test result directories were found.')
    process.exit(1)
  }

  const latest = candidates[candidates.length - 1]
  const reportPath = path.join(resultsRoot, latest, 'report')

  if (!fs.existsSync(reportPath)) {
    console.error(`Latest run exists but report folder is missing: ${reportPath}`)
    process.exit(1)
  }

  console.log(`Opening report from ${latest}`)
  console.log(
    'Tip: this command serves the report over HTTP so "View trace" works.\n' +
      'Opening report/index.html directly via the file system will break the trace viewer.\n',
  )
  const result = spawnSync('npx', ['playwright', 'show-report', reportPath], {
    stdio: 'inherit',
    shell: true,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

main()
