import { test, expect } from '@playwright/test';
import { ERROR_INVALID_MEMBER, ERROR_URLS_MISSING } from '../src/exceptions/errors.js';

test('Returns error if dont pass params', async ({ page }) => {
    const [response] = await Promise.all([
        page.waitForResponse(response => response.status() === 400),
        page.goto('http://localhost:3000')
    ]);

    expect(await response.json()).toEqual({ error: ERROR_URLS_MISSING });
});

test('Returns error if pass invalid limit', async ({ page }) => {
    const [response] = await Promise.all([
        page.waitForResponse(response => response.status() === 422),
        page.goto('http://localhost:3000/?urls=https://github.com/alexcastrodev.png&limit=invalid')
    ]);

    expect(await response.json()).toEqual({ error: ERROR_INVALID_MEMBER, attribute: 'limit' });
});
  

test('Returns error if pass invalid columns', async ({ page }) => {
    const [response] = await Promise.all([
        page.waitForResponse(response => response.status() === 422),
        page.goto('http://localhost:3000/?urls=https://github.com/alexcastrodev.png&columns=invalid')
    ]);

    expect(await response.json()).toEqual({ error: ERROR_INVALID_MEMBER, attribute: 'columns' });
});
  
test('Returns error if pass invalid size', async ({ page }) => {
    const [response] = await Promise.all([
        page.waitForResponse(response => response.status() === 422),
        page.goto('http://localhost:3000/?urls=https://github.com/alexcastrodev.png&size=invalid')
    ]);

    expect(await response.json()).toEqual({ error: ERROR_INVALID_MEMBER, attribute: 'size' });
});
  