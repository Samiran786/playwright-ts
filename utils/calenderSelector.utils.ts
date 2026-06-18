import { Page, Locator } from "@playwright/test";
export class calenderSelector{
    page:Page
    rootCal:Locator
    datePicker:Locator
    monthChecker: Locator
    constructor(page:Page,rootCal:Locator,datePicker:Locator,monthChecker: Locator){
        this.page = page;
        this.rootCal = rootCal
        this.datePicker = datePicker;
        this.monthChecker = monthChecker;

    }
    async dateSelector(deptOption:Locator,returnOpt:Locator,retunDays:number):Promise<void> {
        await deptOption.click();
        const str:string =await this.datePicker.first().textContent() ?? '';
        await this.datePicker.first().click();
        await returnOpt.click();
        const futureDate:string = await this.datePicker.nth(retunDays).textContent() ?? '';
        await this.datePicker.nth(retunDays).click();
    }
}