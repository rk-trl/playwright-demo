import { Page } from '@playwright/test'

export async function navigateFromNavbar(page: Page, label: string): Promise<void> {
  await page.getByRole('link', { name: label, exact: true }).click()
}
