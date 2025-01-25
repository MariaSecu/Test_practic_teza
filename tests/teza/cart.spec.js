const { test, expect } = require("@playwright/test");
const {
  generateRandomString,
  generateRandomEmail,
  generateRandomPassword,
  signIn,
} = require("./helper");

test("Add product in shopping cart", async ({ page }) => {
  // Generarea datelor random
  const firstName = generateRandomString(7); // Nume random de 7 caractere
  const lastName = generateRandomString(7); // Prenume random de 7 caractere
  const email = generateRandomEmail(); // Email random
  const password = generateRandomPassword(); // Parolă random
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.getByRole("link", { name: "Create an Account" }).click();
  await page.getByLabel("First Name").fill(firstName);
  await page.getByLabel("Last Name").fill(lastName);
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByRole("textbox", { name: "Password*", exact: true }).fill(password);
  await page.getByLabel("Confirm Password").fill(password);
  await page.getByRole("button", { name: "Create an Account" }).click();
 // Selectarea unui produs și adăugarea în coș
 await page.getByLabel("store logo").click();
 await page.locator('li').filter({ hasText: 'Breathe-Easy Tank Rating: 70' }).getByLabel('XS').click();
 await page.getByLabel("White").click();
 await page.locator('li').filter({ hasText: 'Breathe-Easy Tank Rating: 70' }).getByRole("button").click();
 // Așteptare pentru mesajul de confirmare
 const successMessage = await page.getByText("You added Breathe-Easy Tank");
 await expect(successMessage).toBeVisible();
});
test('remove an item', async ({ page }) => {
    // Folosim metoda de autentificare
    await signIn(page, 'anadream@gmail.com', 'Tezatest2024');
    // Selectarea produsului
    await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('S', { exact: true }).click();
    await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('Purple').click();
    await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByRole('button').click();
    // Verificarea coșului de cumpărături
    //await page.getByRole('link', { name: ' My Cart 1 1 items' }).click({ timeout: 60000 });
    const cartLink = page.getByRole('link', { name: ' My Cart 1 1 items' });
  await expect(cartLink).toBeVisible({ timeout: 60000 }); // Așteaptă ca elementul să fie vizibil
  await cartLink.click();
    await page.getByRole('link', { name: ' Remove' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    // Verificarea mesajului că nu mai există produse
    const emptyCartMessage = await page.getByText('You have no items in your');
    await expect(emptyCartMessage).toBeVisible();
  });

  test('add more items', async ({ page }) => {
    await signIn(page, 'anadream@gmail.com', 'Tezatest2024');
    await page.getByRole('menuitem', { name: ' Women' }).click();
    await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('XS').click();
    await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('Blue').click();
    await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByRole('button').click();
    await page.locator('li').filter({ hasText: 'Selene Yoga Hoodie Rating: 80' }).getByLabel('S', { exact: true }).click();
    await page.locator('li').filter({ hasText: 'Selene Yoga Hoodie Rating: 80' }).getByLabel('White').click();
    await page.locator('li').filter({ hasText: 'Selene Yoga Hoodie Rating: 80' }).getByRole('button').click();
    await page.getByLabel('28').click();
    await page.getByLabel('Gray').click();
    await page.locator('li').filter({ hasText: 'Deirdre Relaxed-Fit Capri As' }).getByRole('button').click();
    await page.getByText('You added Deirdre Relaxed-Fit').click();
    await page.getByRole('link', { name: ' My Cart 3 3 items' }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByRole('tab', { name: 'Items in Cart ' }).click();
    await page.getByLabel('store logo').click();
  });

  test('Add a product in shopping cart and complet the address', async ({ page }) => {
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
    // Restul codului...
    await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByLabel('M').click();
    await page.getByLabel('Blue').click();
    await page.locator('li').filter({ hasText: 'Radiant Tee Rating: 60% 3' }).getByRole('button').click();
    await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByLabel('Company').fill('Orange');
    await page.getByLabel('Street Address: Line 1').fill('str. Alba-Iulia');
    await page.getByLabel('City').fill('Chisinau');
    await page.getByLabel('Zip/Postal Code').fill('2001');
    await page.getByLabel('Country').selectOption('MD');
    await page.getByLabel('Phone Number').fill('087111322767');
    await page.getByRole('button', { name: 'Next' }).click();
  });
  