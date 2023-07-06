import { test, expect } from '@playwright/test';

test.describe.serial('Save and restore a pipeline', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:5173');
  });

  test('should save a pipeline', async ({ page }) => {
    // Add a component to the canvas
    await page.locator('.hub-node').first().dragTo(page.locator('.react-flow__pane'));

    // Wait for a download to start
    const downloadPromise = page.waitForEvent('download');

    // Click the Save button
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for the download to finish
    const download = await downloadPromise;

    // Expect the  download to be truthy
    expect(download).toBeTruthy();

    // Temporarily save the downloaded file
    await download.saveAs('/temp/pipeline.json');
  });

  test('should restore a pipeline', async ({ page }) => {
    // Expect the saved component to not exist on the canvas
    expect(page.locator('.react-flow__node-yamlComponent')).not.toBeVisible();

    // Click the label element for input element with id="restore"
    await page.locator('label[for="restore"]').click();

    // Input the path of the download into the input element with id="restore"
    await page.locator('#restore').setInputFiles('/temp/pipeline.json');

    // Expect the saved component to exist on the canvas
    await expect(page.locator('.react-flow__node-yamlComponent')).toBeVisible();
  });
});

