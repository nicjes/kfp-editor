import { test, expect } from '@playwright/test';

test.describe('Drag & Drop functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:5173');
  });

  test('should add a component to the canvas', async ({ page }) => {
    // Drag YAML component from the sidebar to the canvas
    await page.locator('.hub-node.yaml').dragTo(page.locator('.react-flow__pane'));

    // Expect the YAML component to exist on the canvas
    await expect(page.locator('.react-flow__node-yamlComponent')).toBeVisible();
  });

  test('should add three components to the canvas', async ({ page }) => {
    // Get the initial number of Components on the Canvas
    const initialNodeCount = await page.locator('.react-flow__node').count();

    // Drag three components from the sidebar to the canvas
    for (const i of [0, 1, 2]) {
      await page.locator('.hub-node').nth(i).dragTo(page.locator('.react-flow__pane'));
    }

    // Get the updated number of components on the canvas
    const updatedNodeCount = await page.locator('.react-flow__node').count();

    // Expect the updated number of components on the canvas to be three more than before
    await expect(updatedNodeCount).toBe(initialNodeCount + 3);
  });
});
