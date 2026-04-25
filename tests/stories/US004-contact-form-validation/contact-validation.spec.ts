import { expect, test } from '@playwright/test'
import { captureStepScreenshot } from '../../helpers/screenshot'
import { ContactPageModel } from '../../pages/contact.page'

test.describe('US004 - Contact Form Validation', () => {
  test('shows errors on empty submit and invalid email', async ({ page }) => {
    const contactPage = new ContactPageModel(page)
    await page.goto('/contact')

    await contactPage.submit()
    await expect(contactPage.formErrors).toHaveCount(3)
    await expect(contactPage.successMessage).toBeHidden()
    await captureStepScreenshot(page, 'contact-empty-submit.png')

    await contactPage.fillForm({
      name: 'Tester',
      email: 'invalid-email',
      message: 'Trying invalid input.',
    })
    await contactPage.submit()

    await expect(contactPage.formErrors).toHaveCount(1)
    await expect(contactPage.formErrors.first()).toContainText(
      'Enter a valid email address.',
    )
    await expect(contactPage.successMessage).toBeHidden()
    await captureStepScreenshot(page, 'contact-invalid-email.png')
  })
})
