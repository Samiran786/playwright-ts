import {test,expect} from "@playwright/test";
import { HomePage } from "../../pageObject/bookMyShow/homepage.page";

test('Selecting dates for round-trip flight ticket with 5 days gap', async function({page},testInfo){
    const homePage = new HomePage(page);
    const match : RegExpMatchArray | null = testInfo.title.match(/\+d/);
    const testData:number = match ? Number.parseInt(match[0],10) :0;
    await homePage.pageNavigation();
    const pageNavScrSht = await page.screenshot();
    await testInfo.attach('page navigation screenshot', {body:pageNavScrSht, contentType:'image/png'});
    await homePage.dateSelector(testData);
    const dateSelScrSht = await page.screenshot();
    await testInfo.attach('date selector screenshot', {body:dateSelScrSht, contentType:'image/png'});
});

test('Selecting destinations for round-trip flight ticket',async function(){

});