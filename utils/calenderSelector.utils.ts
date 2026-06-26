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
    async dateSelector(optionSelector:string,deptOption:Locator,returnOpt:Locator,retunDays:number):Promise<void> {
        if(optionSelector==='enabled'){
            await deptOption.click();
        }
        await this.datePicker.first().click();
        if(optionSelector==='enabled'){
            await returnOpt.click();
        }
        await this.datePicker.nth(retunDays).waitFor({timeout:1500});
        await this.datePicker.nth(retunDays).click({ force: true });
    }
}