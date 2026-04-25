import { defineConfig, devices } from '@playwright/test'
import path from 'node:path'
import fs from 'node:fs'

function formatTimestamp(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}${month}${day}_${hours}${minutes}`
}

const testRunDir =
  process.env.TEST_RUN_DIR ??
  path.join(
    process.cwd(),
    'test-results',
    `test-result_${formatTimestamp(new Date())}`,
  )

const reportDir = path.join(testRunDir, 'report')
const screenshotsDir = path.join(testRunDir, 'screenshots')
const artifactsDir = path.join(testRunDir, 'artifacts')

process.env.TEST_RUN_DIR = testRunDir
process.env.SCREENSHOTS_DIR = screenshotsDir

fs.mkdirSync(screenshotsDir, { recursive: true })
fs.mkdirSync(artifactsDir, { recursive: true })

export default defineConfig({
  testDir: './tests/stories',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  retries: 1,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: reportDir, open: 'never' }],
  ],
  outputDir: artifactsDir,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:5173',
    headless: true,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
