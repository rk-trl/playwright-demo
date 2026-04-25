import { expect, test } from '@playwright/test'
import { captureStepScreenshot } from '../../helpers/screenshot'

test.describe('US006 - Intentional Failure Demo', () => {
  test('page title should match WRONG TITLE (intentional failure)', async ({ page }) => {
    await page.goto('/')

    await captureStepScreenshot(page, 'before-failure.png')

    // This assertion is deliberately wrong to show a failure in the HTML report.
    // The actual page title is "Home", not "WRONG TITLE".
    await expect(page.getByTestId('page-title')).toHaveText('WRONG TITLE')
  })
})
