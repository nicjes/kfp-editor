import { test, expect } from '@playwright/test';

test.describe('Export a pipeline', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:5173');
  });

  test('should export a pipeline yaml', async ({ page }) => {
    // Add a component to the canvas
    await page.locator('.hub-node').first().dragTo(page.locator('.react-flow__pane'));

    // Wait for a download to start
    const downloadPromise = page.waitForEvent('download');

    // Click the Export button
    await page.getByRole('button', { name: 'Export Pipeline' }).click();

    // Wait for the download to finish
    const download = await downloadPromise;

    // Expect the  download to be truthy
    expect(download).toBeTruthy();
  });
});
