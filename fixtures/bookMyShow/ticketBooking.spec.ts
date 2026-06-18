import {test,expect} from "@playwright/test";
import { calenderSelector} from "../../../utils/calenderSelector.utils";

test('Booking tickets', async function({page}){
    const rootCal = page.locator(`.datepicker:not(.hidden)`);
    const datePicker = rootCal.locator(`div.day:not(.disabled)`);
    const monthChecker = rootCal.locator(`.datepicker-months span`);
    const deptOption = page.getByLabel('Departure Date').nth(0);
    const returnOption = page.getByLabel('Return Date').nth(0)
    const calenderSel = new calenderSelector(page,rootCal,datePicker,monthChecker);
    
    const cookieButton = page.locator('#acknowledgeDemoWarning');
    page.goto("https://phptravels.net/");
    await cookieButton.click();
    await page.getByRole('tab',{ name: 'Flights' }).click();
    await page.getByRole('button',{ name: 'Round Trip' }).click();
    await calenderSel.dateSelector(deptOption,returnOption,4);
})