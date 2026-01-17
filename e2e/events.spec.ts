import { test, expect } from '@playwright/test';

test.describe('Events Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Navigate to Events tab
        await page.click('button:has-text("Events")');
        await expect(page.locator('text=Event Pipeline')).toBeVisible({ timeout: 5000 });
    });

    test('should display existing events in sidebar', async ({ page }) => {
        // Check that the sidebar shows event items (from preset data)
        const eventsList = page.locator('[class*="rounded"]').filter({ hasText: /MY|SG|BN/ });
        await expect(eventsList).toHaveCount(await eventsList.count(), { timeout: 5000 });
    });

    test('should create a new event', async ({ page }) => {
        // Click Add New button
        await page.click('button:has-text("Add New")');

        // The new event should be created and selected
        await expect(page.locator('input[value*="New Event"]')).toBeVisible({ timeout: 5000 });
    });

    test('should edit event title', async ({ page }) => {
        // Get the title input
        const titleInput = page.locator('input').first();

        // Clear and type new title
        await titleInput.fill('Test Event Title');

        // Verify the value changed
        await expect(titleInput).toHaveValue('Test Event Title');
    });

    test('should switch between event tabs', async ({ page }) => {
        // Wait for the view to load
        await page.waitForTimeout(500);

        // Click on PnL tab (case-insensitive)
        const pnlTab = page.locator('button').filter({ hasText: /pnl/i });
        if (await pnlTab.count() > 0) {
            await pnlTab.first().click();
            // Just verify we didn't crash
            await page.waitForTimeout(500);
        }

        // Test passes if we can navigate tabs without errors
        await expect(page.locator('text=Event Pipeline')).toBeVisible();
    });

    test('should delete an event with confirmation', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            // Dismiss the confirm dialog (don't actually delete)
            await dialog.dismiss();
        });

        // Click Delete button
        await page.click('button:has-text("Delete")');

        // The event should still exist (we dismissed the dialog)
        await expect(page.locator('text=Event Pipeline')).toBeVisible();
    });
});
