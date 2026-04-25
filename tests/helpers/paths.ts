import fs from 'node:fs'
import path from 'node:path'

export function screenshotPath(fileName: string): string {
  const screenshotsDir =
    process.env.SCREENSHOTS_DIR ??
    path.join(
      process.env.TEST_RUN_DIR ??
        path.join(process.cwd(), 'test-results', 'test-result_manual'),
      'screenshots',
    )
  fs.mkdirSync(screenshotsDir, { recursive: true })
  return path.join(screenshotsDir, fileName)
}
