import {test,expect} from "@playwright/test";

test('Booking tickets', async function({page}){
    const datePicker = page.locator(`//td/div[contains(text(),'18')]`);
    const cookieButton = page.locator('#acknowledgeDemoWarning');
    page.goto("https://phptravels.net/");
    await cookieButton.click();
    await page.getByLabel('Departure Date').nth(0).click();
    const str = await datePicker.nth(3).textContent();
    console.log(str);
    
})