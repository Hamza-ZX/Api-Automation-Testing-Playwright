# Playwright API Automation Testing

This repository contains API automation tests written using **Playwright Test**.  
It demonstrates how to perform **GET, POST, and authenticated API calls** with various public APIs.

## Project Overview

This project automates multiple API endpoints from several demo APIs:
- Ecommerce API — `https://api.escuelajs.co/api/v1`
- Dummy JSON Auth API — `https://dummyjson.com`
- Pokémon API — `https://pokeapi.co`
- USGS Earthquake API — `https://earthquake.usgs.gov/fdsnws/event/1/`
- Simple Books API — `https://simple-books-api.click`

The purpose of this project is to:
- Learn **API automation** with Playwright.
- Handle **authentication tokens (JWT)**.
- Work with **query parameters**, **status assertions**, and **response validations**.
- Structure tests clearly in Playwright (grouping, setup, teardown).

## Tech Stack

- **Playwright** — for API and UI testing  
- **Node.js** — JavaScript runtime  
- **Playwright Test** — assertion and test runner  
- **JavaScript (ES6)** — scripting language  

## 🚀 Running the Tests

To set up and run your API tests, follow these commands:

| Command | Description |
| :--- | :--- |
| `npm install` | Installs all necessary Playwright dependencies. |
| `npx playwright test` | Executes all tests in your project. |
| `npx playwright test tests/booksApi.spec.js` | Runs tests from a specific file. |
| `test.only()` | Marks a single test to run exclusively (useful for debugging). |

---

## 💻 Syntax & Concepts

### Import Statements

The basic structure for every test file.

```javascript
const { test, expect } = require('@playwright/test');

// 'test' defines a test block or suite.
// 'expect' is used for making assertions.

const response = await page.request.get('[https://simple-books-api.click/books](https://simple-books-api.click/books)');
expect(await response.status()).toBe(200);
console.log(await response.json());

