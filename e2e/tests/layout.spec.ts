import { expect, test } from '@playwright/test';

test.describe('layout', () => {
  test('should display the header', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should display the footer', async ({ page }) => {
    await page.goto('/');
    const footerLocator = page.locator('footer');
    await expect(footerLocator).toBeVisible();
  });

  test('footer should contain github link, version and copyright', async ({
    page,
  }) => {
    await page.goto('/');
    const footer = page.locator('footer');

    const githubLink = footer.getByRole('link', { name: /github/i });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/acidarchive',
    );

    const versionText = footer.getByText(/v/);
    await expect(versionText).toBeVisible();

    const year = new Date().getFullYear();
    const copyrightText = footer.getByText(`© ${year} Acid Archive`);
    await expect(copyrightText).toBeVisible();
  });
});
