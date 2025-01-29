const { test, expect } = require("@playwright/test");
const {
  generateRandomString,
  generateRandomEmail,
  generateRandomPassword,
  signIn,
} = require("./helper");

test("TC1.Change user name", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("honytester@gmail.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Testteza2020");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).waitFor(); // Așteaptă să fie vizibil
  await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).hover(); 
  await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).click(); // Click pe buton
  await page.getByRole("link", { name: "My Account" }).click();
  await page.getByRole("link", { name: "Edit", exact: true }).click();
  await page.getByLabel("Last Name").click();
  await page.getByLabel("Last Name").fill("Grab");
  await page.getByRole("button", { name: "Save" }).click();
});
test("TC2.Change user password twice", async ({ page }) => {
    await page.goto("https://magento.softwaretestingboard.com/");
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByLabel("Email", { exact: true }).click();
    await page.getByLabel("Email", { exact: true }).fill("honytester@gmail.com");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("Testteza2020");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).waitFor(); // Așteaptă să fie vizibil
    await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).hover(); 
    await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).click(); // Click pe buton
    await page.getByRole("link", { name: "My Account" }).click();
    await page.getByRole('link', { name: 'Change Password' }).click();
    await page.getByLabel('Current Password').click();
    await page.getByLabel('Current Password').fill('Testteza2020');
    await page.getByLabel('New Password', { exact: true }).click();
    await page.getByLabel('New Password', { exact: true }).fill('Tezatest2025');
    await page.getByLabel('Confirm New Password').click();
    await page.getByLabel('Confirm New Password').fill('Tezatest2025');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByLabel('Email', { exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill('honytester@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Tezatest2025');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('link', { name: 'Change Password' }).click();
    await page.getByLabel('Current Password').click();
    await page.getByLabel('Current Password').fill('Tezatest2025');
    await page.getByLabel('New Password', { exact: true }).click();
    await page.getByLabel('New Password', { exact: true }).fill('Testteza2020');
    await page.getByLabel('Confirm New Password').click();
    await page.getByLabel('Confirm New Password').fill('Testteza2020');
    await page.getByRole('button', { name: 'Save' }).click();
  });

  test.only("TC3.Set a default address", async ({ page }) => {
    const firstName = generateRandomString(7); // Nume random de 7 caractere
    const lastName = generateRandomString(7); // Prenume random de 7 caractere
    const email = generateRandomEmail(); // Email random
    const password = generateRandomPassword(); // Parolă random
  
    // Navighează la pagina principală
    await page.goto("https://magento.softwaretestingboard.com/");
  
    // Crearea unui cont nou
    await page.getByRole('link', { name: 'Create an Account' }).click(); // Navighează la formularul de înregistrare
    await page.getByLabel('First Name').fill(firstName);
    await page.getByLabel('Last Name').fill(lastName);
    await page.getByLabel('Email').fill(email);
    // Selectăm câmpul "Password" specific
    await page.getByLabel('Password', { exact: true }).fill(password);
    // Selectăm câmpul "Confirm Password" folosind ID-ul său unic
    await page.locator('#password-confirmation').fill(password);
    await page.getByRole('button', { name: 'Create an Account' }).click(); // Creează contul
    await page.getByLabel('store logo').click();
    await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).waitFor(); // Așteaptă să fie vizibil
    await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).hover(); 
    await page.getByRole("banner").locator("button").filter({ hasText: "Change" }).click(); // Click pe buton
    await page.getByRole("link", { name: "My Account" }).click();
    await page.getByRole('link', { name: 'Edit Address' }).nth(1).click();
    await page.getByLabel('Company').click();
    await page.getByLabel('Company').fill('Cloud');
    await page.getByLabel('Phone Number').click();
    await page.getByLabel('Phone Number').fill('089077433');
    await page.getByLabel('Street Address: Line 1').click();
    await page.getByLabel('Street Address: Line 1').fill('Stefan cel Mare');
    await page.getByLabel('City').click();
    await page.getByLabel('City').fill('Chisinau');
    await page.getByLabel('Zip/Postal Code').click();
    await page.getByLabel('Zip/Postal Code').fill('20008');
    await page.getByLabel('Country').selectOption('MD');
    await page.getByRole('button', { name: 'Save Address' }).click();
    await page.getByText('You saved the address.').click();
});