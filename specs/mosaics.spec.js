import { test, expect } from '@playwright/test';

test('Get a single photo in mosaic', async ({ page }) => {
  await page.goto('http://localhost:3000/?urls=https://github.com/alexcastrodev.png');
  const image = await page.screenshot();

  expect(image).toMatchSnapshot();
});


test('Get a two photos in mosaic', async ({ page }) => {
  await page.goto('http://localhost:3000/?urls=https://github.com/alexcastrodev.png,https://github.com/user-attachments/assets/87014d69-6cc7-49fe-a893-4a75f9fc732d');
  const image = await page.screenshot();

  expect(image).toMatchSnapshot();
});
