import { expect, test } from '@playwright/test'
import { navigateFromNavbar } from '../../helpers/nav'
import { captureStepScreenshot } from '../../helpers/screenshot'

const routes = [
  { label: 'Home', path: '/', title: 'Home', screenshot: 'home.png' },
  { label: 'About', path: '/about', title: 'About', screenshot: 'about.png' },
  {
    label: 'Services',
    path: '/services',
    title: 'Services',
    screenshot: 'services.png',
  },
  {
    label: 'Contact',
    path: '/contact',
    title: 'Contact',
    screenshot: 'contact.png',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    screenshot: 'dashboard.png',
  },
]

test.describe('US001 - Home Navigation', () => {
  test('navigates to all routes from navbar', async ({ page }) => {
    await page.goto('/')

    for (const route of routes) {
      if (route.path !== '/') {
        await navigateFromNavbar(page, route.label)
      }

      await expect(page).toHaveURL(new RegExp(`${route.path.replace('/', '\\/')}$`))
      await expect(page.getByTestId('page-title')).toHaveText(route.title)
      await captureStepScreenshot(page, route.screenshot)
    }
  })
})
