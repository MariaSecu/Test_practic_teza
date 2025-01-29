const { test, expect } = require("@playwright/test");
const {
  generateRandomString,
  generateRandomEmail,
  generateRandomPassword,
  signIn,
} = require("./helper");
test("TC1.search an existing item", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("jonytest@gmail.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Tezatest2025");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByPlaceholder("Search entire store here...").click();

  await page.getByPlaceholder("Search entire store here...").fill("hood");
  const firstResult = page.locator("li.product-item").first();
  await expect(firstResult).toBeVisible({ timeout: 10000 });
  const searchResults = page.locator("li.product-item");
  const productTitles = await searchResults
    .locator(".product-item-link")
    .allTextContents();
  console.log("Search results:", productTitles);
  // Filtrăm rezultatele care conțin "hoodie"
  const matchingProducts = productTitles.filter((title) =>
    title.toLowerCase().includes("hoodie")
  );
  // Testul reușește doar dacă există cel puțin un produs relevant
  expect(matchingProducts.length).toBeGreaterThan(0);
});

test("TC2.search an inexisting item", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  const searchField = page.getByPlaceholder("Search entire store here...");
  await searchField.fill("scarf");
  await searchField.press("Enter");
  const noResultsMessage = page.locator(".message.notice"); // Selector pentru mesajul de "no results"
  await expect(noResultsMessage).toBeVisible({ timeout: 5000 });
  await expect(noResultsMessage).toContainText(
    "Your search returned no results."
  );
});

test("TC3.Search an item and aply price filter", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("monicamun@gmail.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Tezatest2020");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByPlaceholder("Search entire store here...").click();
  await page.getByPlaceholder("Search entire store here...").fill("tank");
  await page.getByPlaceholder("Search entire store here...").press("Enter");
  await page.getByLabel("Sort By").selectOption("price");
  await page.goto(
    "https://magento.softwaretestingboard.com/catalogsearch/result/index/?q=tank&product_list_order=price"
  );
  await page.getByRole("link", { name: " Set Ascending Direction" }).click();
  //Scroll pana in josul paginii pentru a vedea rezultatul sortarii
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
});

test("TC4. Search item with special chatacter", async ({ page }) => {
  const firstName = generateRandomString(8); // Nume random de 8 caractere
  const lastName = generateRandomString(8); // Prenume random de 8 caractere
  const email = generateRandomEmail(); // Email random
  const password = generateRandomPassword(); // Parolă random
  // Navighează la pagina principală
  await page.goto("https://magento.softwaretestingboard.com/");
  // Crearea unui cont nou
  await page.getByRole("link", { name: "Create an Account" }).click(); // Navighează la formularul de înregistrare
  await page.getByLabel("First Name").fill(firstName);
  await page.getByLabel("Last Name").fill(lastName);
  await page.getByLabel("Email").fill(email);
  // Selectăm câmpul "Password" specific
  await page.getByLabel("Password", { exact: true }).fill(password);
  // Selectăm câmpul "Confirm Password" folosind ID-ul său unic
  await page.locator("#password-confirmation").fill(password);
  await page.getByRole("button", { name: "Create an Account" }).click();
  await page.getByPlaceholder("Search entire store here...").click();
  await page.getByPlaceholder("Search entire store here...").fill("Jak3t");
  await page.getByPlaceholder("Search entire store here...").press("Enter");
  const noResultsMessage = await page.locator('//*[contains(text(), "Your search returned no results.")]');
  await expect(noResultsMessage).toBeVisible();
  const noCompareItemsMessage = await page.locator('//*[contains(text(), "You have no items to compare.")]');
  await expect(noCompareItemsMessage).toBeVisible();
  await page.waitForTimeout(2000);
});

test('TC5.', async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("monicamun@gmail.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Tezatest2020");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByPlaceholder('Search entire store here...').click();
  await page.getByPlaceholder('Search entire store here...').fill('j');
  await page.getByPlaceholder('Search entire store here...').press('Enter');
  await page.getByText('Minimum Search query length is 3').click();
  await page.getByPlaceholder('Search entire store here...').click();
  await page.getByPlaceholder('Search entire store here...').fill('7');
  await page.getByPlaceholder('Search entire store here...').press('Enter');
  await page.getByText('Minimum Search query length is 3').click();
  await page.waitForTimeout(2000);
});