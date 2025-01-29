const { test, expect } = require("@playwright/test");
const {
  generateRandomString,
  generateRandomEmail,
  generateRandomPassword,
  signIn,
} = require("./helper");


test('TC1.Checkout product', async ({ page }) => {
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
    // Adaugarea produsului
    await page.locator('li').filter({ hasText: 'Breathe-Easy Tank Rating: 70' }).getByLabel('S', { exact: true }).click();
    await page.getByLabel('Yellow').click();
    await page.locator('li').filter({ hasText: 'Breathe-Easy Tank Rating: 70' }).getByRole('button').click();
    await page.waitForTimeout(10000);
    await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByLabel('Company').click();
    await page.getByLabel('Company').fill('Blue');
    await page.getByLabel('Street Address: Line 1').click();
    await page.getByLabel('Street Address: Line 1').fill('Stefan cel Mare');
    await page.getByLabel('City').click();
    await page.getByLabel('City').fill('Chisinau');
    await page.getByLabel('Zip/Postal Code').click();
    await page.getByLabel('Zip/Postal Code').fill('2009');
    await page.getByLabel('Country').selectOption('MD');
    await page.getByLabel('Phone Number').click();
    await page.getByLabel('Phone Number').fill('087453887');
    await page.waitForTimeout(10000);
    await page.getByRole('button', { name: 'Next' }).click();
    //await page.waitForTimeout(20000);
    await page.getByRole('button', { name: 'Place Order' }).click();
  });

  test('TC2Place an order for an existing user', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email', { exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill('jonytest@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Tezatest2025');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('menuitem', { name: ' Men' }).click();
    await page.locator('li').filter({ hasText: 'Hero Hoodie As low as $54.00' }).getByLabel('M').click();
    await page.locator('li').filter({ hasText: 'Hero Hoodie As low as $54.00' }).getByLabel('Black').click();
    await page.locator('li').filter({ hasText: 'Hero Hoodie As low as $54.00' }).getByRole('button').click();
    await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.getByRole('link', { name: 'Continue Shopping' }).click();
  });

  test('TC3.check the error messages', async ({ page }) => {
    const firstName = generateRandomString(8); // Nume random de 8 caractere
    const lastName = generateRandomString(9); // Prenume random de 9 caractere
    const email = generateRandomEmail(); // Email random
    const password = generateRandomPassword(); // Parolă random
    // Navighează la pagina principală
    await page.goto("https://magento.softwaretestingboard.com/");
    // Crearea unui cont nou
    await page.getByRole('link', { name: 'Create an Account' }).click(); // Navighează la formularul de înregistrare
    await page.getByLabel('First Name').fill(firstName);
    await page.getByLabel('Last Name').fill(lastName);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.locator('#password-confirmation').fill(password);
    await page.getByRole('button', { name: 'Create an Account' }).click(); // Creează contul
    await page.getByLabel('store logo').click();
    await page.getByRole('menuitem', { name: ' Men' }).click();
    await page.locator('li').filter({ hasText: 'Meteor Workout Short Rating:' }).getByLabel('36').click();
    await page.locator('li').filter({ hasText: 'Meteor Workout Short Rating:' }).getByLabel('Blue').click();
    await page.locator('li').filter({ hasText: 'Meteor Workout Short Rating:' }).getByRole('button').click();
    await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await page.getByRole('cell', { name: 'Fixed Flat Rate' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
  const errorMessages = page.locator('text=This is a required field.');
    const errorCount = await errorMessages.count();
    console.log(`Found ${errorCount} error messages.`); 
    for (let i = 0; i < errorCount; i++) {
        await expect(errorMessages.nth(i)).toBeVisible(); // Verifică fiecare mesaj de eroare
        console.log(`Error message ${i + 1}:`, await errorMessages.nth(i).textContent());
    }
    // Asigurare că există cel puțin un mesaj de eroare
    await expect(errorCount).toBeGreaterThan(0);
    // Încheierea testului
    console.log('Test completed successfully with all error messages validated.');
});
test('TC4.Aply incorrect discount cod', async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("monicamun@gmail.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Tezatest2020");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole('menuitem', { name: ' Women' }).click();
  await page.locator('li').filter({ hasText: 'Selene Yoga Hoodie Rating: 80' }).getByLabel('S', { exact: true }).click();
  await page.locator('li').filter({ hasText: 'Selene Yoga Hoodie Rating: 80' }).getByLabel('White').click();
  await page.locator('li').filter({ hasText: 'Selene Yoga Hoodie Rating: 80' }).getByRole('button').click();
  await page.getByRole('link', { name: ' My Cart 1 1 items' }).click();
  await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  // Aplicare cod de discount incorect
  await page.getByRole('tab', { name: 'Apply Discount Code ' }).click();
  await page.getByPlaceholder('Enter discount code').fill('25');
  await page.getByRole('button', { name: 'Apply Discount' }).click();
  // Verificare mesaj de eroare pentru cod de discount incorect
  const errorMessage = page.locator('text=The coupon code isn\'t valid.');
  await expect(errorMessage).toBeVisible();
  const errorText = await errorMessage.textContent();
  console.log(`Error message displayed: "${errorText}"`);
  // Asigurare că mesajul este corect
  await expect(errorText).toBe("The coupon code isn't valid. Verify the code and try again.");
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('link', { name: 'Continue Shopping' }).click();
});

test('TC5.Manage address', async ({ page }) => {
  const firstName = generateRandomString(8); // Nume random de 8 caractere
    const lastName = generateRandomString(8); // Prenume random de 8 caractere
    const email = generateRandomEmail(); // Email random
    const password = generateRandomPassword(); // Parolă random
    // Navighează la pagina principală
    await page.goto("https://magento.softwaretestingboard.com/");
    // Crearea unui cont nou
  await page.getByRole('link', { name: 'Create an Account' }).click(); // Navighează la formularul de înregistrare
  await page.getByLabel('First Name').fill(firstName);
  await page.getByLabel('Last Name').fill(lastName);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.locator('#password-confirmation').fill(password);
  await page.getByRole('button', { name: 'Create an Account' }).click();
  await page.getByRole('link', { name: 'Manage Addresses' }).click();
  await page.getByLabel('Phone Number').click();
  await page.getByLabel('Phone Number').fill('078967342');
  await page.getByLabel('Street Address: Line 1').click();
  await page.getByLabel('Street Address: Line 1').fill('Pacii');
  await page.getByLabel('City').click();
  await page.getByLabel('City').fill('Chisinau');
  await page.getByLabel('Zip/Postal Code').click();
  await page.getByLabel('Zip/Postal Code').fill('2008');
  await page.getByLabel('Country').selectOption('MD');
  await page.getByRole('button', { name: 'Save Address' }).click();
  await page.getByText('You saved the address.').click();
});