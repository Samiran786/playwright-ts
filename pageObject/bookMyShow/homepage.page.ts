import { Page,Locator } from "@playwright/test";
import { BasePage } from "./basepage.page";
import { calenderSelector} from "../../utils/calenderSelector.utils";

export class HomePage extends BasePage{
    protected readonly rootCal : Locator;
    protected readonly datePicker : Locator;
    protected readonly monthChecker : Locator;
    protected readonly deptOption : Locator;
    protected readonly returnOption : Locator;
    protected readonly cookieButton : Locator;
    
    constructor(page:Page){
        super(page);
        this.rootCal = this.page.locator(`.datepicker:not(.hidden)`);
        this.datePicker = this.rootCal.locator(`div.day:not(.disabled)`);
        this.monthChecker = this.rootCal.locator(`.datepicker-months span`);
        this.deptOption = page.getByLabel('Departure Date').nth(0);
        this.returnOption = page.getByLabel('Return Date').nth(0);
        this.cookieButton = page.locator('#acknowledgeDemoWarning');
    }

    async pageNavigation(){
        this.page.goto("https://phptravels.net/");
        await this.cookieButton.click();
    }

    async dateSelector(){
        const calenderSel = new calenderSelector(this.page,this.rootCal,this.datePicker,this.monthChecker);
        
        await this.page.getByRole('tab',{ name: 'Flights' }).click();
        await this.page.getByRole('button',{ name: 'Round Trip' }).click();
        await calenderSel.dateSelector(deptOption,returnOption,4);
    }
}