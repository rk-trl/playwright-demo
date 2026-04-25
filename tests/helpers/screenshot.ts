import { Page } from '@playwright/test'
import { screenshotPath } from './paths'

export async function captureStepScreenshot(
  page: Page,
  fileName: string,
): Promise<void> {
  await page.screenshot({
    path: screenshotPath(fileName),
    fullPage: true,
  })
}
