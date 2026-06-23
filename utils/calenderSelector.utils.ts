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
        // await deptOption.click();
        // const str:string =await this.datePicker.first().textContent() ?? '';
        await this.datePicker.first().click();
        if(optionSelector==='enabled'){
            await returnOpt.click();
        }
        // await returnOpt.click();
        // const futureDate:string = await this.datePicker.nth(retunDays).textContent() ?? '';
        // console.log(retunDays);
        // console.log(futureDate);
        await this.datePicker.nth(retunDays).click();
    }
}