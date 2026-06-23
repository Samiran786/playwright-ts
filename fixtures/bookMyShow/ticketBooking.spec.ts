import {test,expect, Page} from "@playwright/test";
import { HomePage } from "../../pageObject/bookMyShow/homepage.page";
import { FlightListPage } from "../../pageObject/bookMyShow/flightlist.page";

test.describe.serial('Flight ticket booking journey', async function(){
    let sharedPage : Page;
    let homePage : HomePage;
    let flightlistPage : FlightListPage;

    test.beforeAll(async function({browser}){
        sharedPage = await browser.newPage();
        homePage = new HomePage(sharedPage);
        flightlistPage = new FlightListPage(sharedPage);
    })


test('Selecting destinations for round-trip flight ticket',async function({},testInfo){
    await homePage.homePageNavigation('https://phptravels.net/');
    const pageNavScrSht = await sharedPage.screenshot();
    await testInfo.attach('page navigation screenshot', {body:pageNavScrSht, contentType:'image/png'});
    await homePage.locSelector();
});

test('Selecting dates for round-trip flight ticket with 5 days gap', async function({},testInfo){
    const match : RegExpMatchArray | null = testInfo.title.match(/\d+/);
    const testData:number = match ? Number.parseInt(match[0],10) :0;
    console.log(testData);
    await homePage.dateSelector('disabled',testData);
    const dateSelScrSht = await sharedPage.screenshot();
    await testInfo.attach('date selector screenshot', {body:dateSelScrSht, contentType:'image/png'});
    await homePage.serchSelection();
});

test('Validate the list of flights', async function(){
    await flightlistPage.pageLoadChecker();
    await flightlistPage.validateNumberResult();
    await flightlistPage.lowestTicketPriceValidation();
})



});