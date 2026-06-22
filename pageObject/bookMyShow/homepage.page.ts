import { Page,Locator } from "@playwright/test";
import { BasePage } from "./basepage.page";
import { calenderSelector} from "../../utils/calenderSelector.utils";

export class HomePage extends BasePage{
    protected readonly rootCal      : Locator;
    protected readonly datePicker   : Locator;
    protected readonly monthChecker : Locator;
    protected readonly deptOption   : Locator;
    protected readonly returnOption : Locator;
    protected readonly cookieButton : Locator;
    protected readonly flightOption : Locator;
    protected readonly roundTripOpt : Locator;
    protected readonly deptLocation : Locator;
    protected readonly arrLocation  : Locator;
    
    constructor(page:Page){
        super(page);
        this.rootCal = this.page.locator(`.datepicker:not(.hidden)`);
        this.datePicker = this.rootCal.locator(`div.day:not(.disabled)`);
        this.monthChecker = this.rootCal.locator(`.datepicker-months span`);
        this.deptOption = this.page.getByLabel('Departure Date').nth(0);
        this.returnOption = this.page.getByLabel('Return Date').nth(0);
        this.cookieButton = this.page.locator('#acknowledgeDemoWarning');
        this.flightOption = this.page.getByRole('tab',{ name: 'Flights' });
        this.roundTripOpt = this.page.getByRole('button',{ name: 'Round Trip' });
        this.deptLocation = this.page.getByLabel('Departure From').nth(0);
        this.arrLocation = this.page.getByLabel('Arrival To').nth(0);
    }

    async pageNavigation(){
        await this.page.goto("https://phptravels.net/");
        await this.cookieButton.click();
    }

    async dateSelector(dateGap:number){
        const calenderSel = new calenderSelector(this.page,this.rootCal,this.datePicker,this.monthChecker);
        await this.flightOption.click();
        await this.roundTripOpt.click();
        await calenderSel.dateSelector(this.deptOption,this.returnOption,(dateGap-1));
    }

    async locSelector(){
        await this.deptLocation.click();
        await this.arrLocation.click();
    }
}