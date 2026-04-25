import { expect, test } from '@playwright/test'
import { captureStepScreenshot } from '../../helpers/screenshot'

const routes = [
  { path: '/', title: 'Home', screenshot: 'traversal-home.png' },
  { path: '/about', title: 'About', screenshot: 'traversal-about.png' },
  {
    path: '/services',
    title: 'Services',
    screenshot: 'traversal-services.png',
  },
  { path: '/contact', title: 'Contact', screenshot: 'traversal-contact.png' },
  {
    path: '/dashboard',
    title: 'Dashboard',
    screenshot: 'traversal-dashboard.png',
  },
]

test.describe('US002 - Route Traversal', () => {
  for (const route of routes) {
    test(`visits ${route.path} and validates heading`, async ({ page }) => {
      await page.goto(route.path)

      await expect(page).toHaveURL(new RegExp(`${route.path.replace('/', '\\/')}$`))
      await expect(page.getByTestId('page-title')).toHaveText(route.title)
      await captureStepScreenshot(page, route.screenshot)
    })
  }
})
