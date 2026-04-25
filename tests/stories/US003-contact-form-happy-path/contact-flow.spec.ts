import { expect, test } from '@playwright/test'
import { navigateFromNavbar } from '../../helpers/nav'
import { captureStepScreenshot } from '../../helpers/screenshot'
import { ContactPageModel } from '../../pages/contact.page'

test.describe('US003 - Contact Form Happy Path', () => {
  test('user navigates to contact and submits form', async ({ page }) => {
    const contactPage = new ContactPageModel(page)

    await page.goto('/')
    await expect(page.getByTestId('page-title')).toHaveText('Home')
    await captureStepScreenshot(page, 'home.png')

    await navigateFromNavbar(page, 'Contact')
    await expect(page).toHaveURL(/\/contact$/)
    await captureStepScreenshot(page, 'contact-page.png')

    await contactPage.fillForm({
      name: 'Jane Tester',
      email: 'jane.tester@example.com',
      message: 'This is a full flow validation.',
    })
    await captureStepScreenshot(page, 'form-filled.png')

    await contactPage.submit()
    await expect(contactPage.successMessage).toHaveText('Message sent successfully')
    await captureStepScreenshot(page, 'success.png')
  })
})
