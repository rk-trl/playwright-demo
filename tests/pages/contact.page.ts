import { Locator, Page } from '@playwright/test'

export class ContactPageModel {
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly messageInput: Locator
  readonly submitButton: Locator
  readonly successMessage: Locator
  readonly formErrors: Locator

  constructor(private readonly page: Page) {
    this.nameInput = page.getByTestId('name-input')
    this.emailInput = page.getByTestId('email-input')
    this.messageInput = page.getByTestId('message-input')
    this.submitButton = page.getByTestId('submit-button')
    this.successMessage = page.getByTestId('success-message')
    this.formErrors = page.getByTestId('form-error')
  }

  async fillForm(values: { name: string; email: string; message: string }): Promise<void> {
    await this.nameInput.fill(values.name)
    await this.emailInput.fill(values.email)
    await this.messageInput.fill(values.message)
  }

  async submit(): Promise<void> {
    await this.submitButton.click()
  }
}
