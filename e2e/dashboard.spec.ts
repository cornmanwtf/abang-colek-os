import { test, expect } from '@playwright/test';

test.describe('Dashboard Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load the homepage', async ({ page }) => {
        // Check that the Brand OS loads successfully - look for any visible content
        // The page should have loaded and contain navigable elements
        await expect(page.locator('button:has-text("Events")')).toBeVisible({ timeout: 10000 });
    });

    test('should navigate to Events tab', async ({ page }) => {
        // Click on Events tab
        await page.click('button:has-text("Events")');

        // Verify Events view content appears
        await expect(page.locator('text=Event Pipeline')).toBeVisible({ timeout: 5000 });
    });

    test('should navigate to Dashboard tab', async ({ page }) => {
        // Click on Dashboard tab
        await page.click('button:has-text("Dashboard")');

        // Verify Dashboard view KPI cards appear
        await expect(page.locator('text=Total Revenue')).toBeVisible({ timeout: 5000 });
    });

    test('should navigate to TikTok tab', async ({ page }) => {
        // Click on TikTok tab
        await page.click('button:has-text("TikTok")');

        // Verify TikTok view content appears
        await expect(page.locator('text=Content Engine')).toBeVisible({ timeout: 5000 });
    });

    test('should use keyboard shortcut for search', async ({ page }) => {
        // Press Ctrl+K to open search
        await page.keyboard.press('Control+k');

        // Verify search input is focused
        const searchInput = page.locator('input[placeholder*="Search"]');
        await expect(searchInput).toBeFocused({ timeout: 3000 });
    });
});
