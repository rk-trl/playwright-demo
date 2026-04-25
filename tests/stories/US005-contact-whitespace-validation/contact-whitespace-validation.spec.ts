import { expect, test } from '@playwright/test'
import { captureStepScreenshot } from '../../helpers/screenshot'
import { ContactPageModel } from '../../pages/contact.page'

test.describe('US005 - Contact Whitespace Validation', () => {
  test('shows validation errors for whitespace-only input', async ({ page }) => {
    const contactPage = new ContactPageModel(page)
    await page.goto('/contact')

    await contactPage.fillForm({
      name: '   ',
      email: '   ',
      message: '   ',
    })
    await captureStepScreenshot(page, 'contact-whitespace-filled.png')

    await contactPage.submit()

    await expect(contactPage.formErrors).toHaveCount(3)
    await expect(contactPage.successMessage).toBeHidden()
    await captureStepScreenshot(page, 'contact-whitespace-submit.png')
  })
})
