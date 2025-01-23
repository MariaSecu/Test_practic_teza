// Generarea unui string random
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Generarea unui email random
  function generateRandomEmail() {
    const domain = 'example.com';
    return `${generateRandomString(8)}@${domain}`;
  }
  
  // Generarea unei parole random
  function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  // Metodă pentru autentificare
  async function signIn(page, email, password) {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email', { exact: true }).fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign In' }).click();
  }
  
  // Exportarea metodelor într-un singur obiect
  module.exports = {
    generateRandomString,
    generateRandomEmail,
    generateRandomPassword,
    signIn,
  };
  