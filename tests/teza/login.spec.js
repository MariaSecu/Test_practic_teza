// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//     await page.goto('https://magento.softwaretestingboard.com/');
//     await page.getByRole('link', { name: 'Create an Account' }).click();
//     await page.getByLabel('First Name').click();
//     await page.getByLabel('First Name').fill('Anastas');
//     await page.getByLabel('Last Name').click();
//     await page.getByLabel('Last Name').fill('Dreami');
//     await page.getByLabel('Email', { exact: true }).click();
//     await page.getByLabel('Email', { exact: true }).fill('anastasdreami@gmail.com');
//     await page.getByRole('textbox', { name: 'Password*', exact: true }).click();
//     await page.getByRole('textbox', { name: 'Password*', exact: true }).fill('Tezatest2024');
//     await page.getByLabel('Confirm Password').click();
//     await page.getByLabel('Confirm Password').fill('Tezatest2024');
//     await page.getByRole('button', { name: 'Create an Account' }).click();
//     await page.getByText('Thank you for registering').click();
//   });

const { test, expect } = require("@playwright/test");
const {
  generateRandomString,
  generateRandomEmail,
  generateRandomPassword,
} = require("./helper");

test("Create an Account with Random Data", async ({ page }) => {
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
  await page
    .getByRole("textbox", { name: "Password*", exact: true })
    .fill(password);
  await page.getByLabel("Confirm Password").fill(password);
  await page.getByRole("button", { name: "Create an Account" }).click();

  // Verificarea mesajului de confirmare
  const thankYouMessage = await page.locator("text=Thank you for registering");
  await expect(thankYouMessage).toBeVisible();
});

test("Signin with an wxisting account", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("anadream@gmail.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Tezatest2024");
  await page.getByRole("button", { name: "Sign In" }).click();
});

test("Signin with wrong email/password", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  // Navighează la pagina de Sign In
  await page.getByRole("link", { name: "Sign In" }).click();
  // Completează emailul greșit
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("anadreamy@gmail.com");
  // Completează parola
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Tezatest2024");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("anadream@gmail.com");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("Tezatests2024.");
  await page.getByRole("button", { name: "Sign In" }).click();
  // Așteaptă câteva momente pentru a se afișa mesajul
  await page.waitForTimeout(3000);
  // Localizează mesajul de eroare
  const errorMessage = await page.locator(
    "text=The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
  );
  // Verifică dacă mesajul de eroare este vizibil
  await expect(errorMessage).toBeVisible();
});

test("Verify reset password message", async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/");
  // Accesează secțiunea "Sign In"
  await page.getByRole("link", { name: "Sign In" }).click();
  // Navighează la "Forgot Your Password?"
  await page.getByRole("link", { name: "Forgot Your Password?" }).click();
  // Completează email-ul
  await page.getByLabel("Email", { exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("anadream@gmail.com");
  // Apasă pe butonul "Reset My Password"
  await page.getByRole("button", { name: "Reset My Password" }).click();
  // Verifică afișarea mesajului
  const resetMessage = page.locator(
    "text=If there is an account associated with anadream@gmail.com you will receive an email with a link to reset your password."
  );
  await expect(resetMessage).toBeVisible();
});
// test.only('test', async ({ page }) => {
//     await page.goto('https://magento.softwaretestingboard.com/');
//     await page.getByRole('link', { name: 'Sign In' }).click();
//     await page.getByLabel('Email', { exact: true }).click();
//     await page.getByLabel('Email', { exact: true }).fill('anadream@gmail.com');
//     await page.getByLabel('Password').click();
//     await page.getByLabel('Password').fill('Tezatest2024');
//     await page.getByText('If you have an account, sign in with your email address. Email Password Sign In').click();
//     await page.getByRole('button', { name: 'Sign In' }).click();
//     await page.getByRole('banner').getByText('Welcome, Ana Dream! Change My').click();
//     await page.getByRole('banner').locator('button').filter({ hasText: 'Change' }).click();
//     await page.getByRole('link', { name: 'Sign Out' }).click();
//     await page.getByText('You are signed out').click();
//   });

test('Verify sign out message', async ({ page }) => {
    // Navighează la pagina principală
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email', { exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill('anadream@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Tezatest2024');
    // Apasă pe butonul "Sign In"
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Verifică prezența mesajului de bun venit
    const welcomeMessage = page.getByRole('banner').getByText('Welcome, Ana Dream!');
    await expect(welcomeMessage).toBeVisible();
    // Accesează meniul pentru Sign Out
    await page.getByRole('banner').locator('button').filter({ hasText: 'Change' }).click();
    // Selectează opțiunea "Sign Out"
    await page.getByRole('link', { name: 'Sign Out' }).click();
    // Verifică prezența mesajului "You are signed out"
    const signOutMessage = page.locator('text=You are signed out');
    await expect(signOutMessage).toBeVisible();
});
