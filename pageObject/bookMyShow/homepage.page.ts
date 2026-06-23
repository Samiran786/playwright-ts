import { Page,Locator, expect } from "@playwright/test";
import { BasePage } from "./basepage.page";
import { calenderSelector} from "../../utils/calenderSelector.utils";

export class HomePage extends BasePage{
    protected readonly rootCal          : Locator;
    protected readonly datePicker       : Locator;
    protected readonly monthChecker     : Locator;
    protected readonly deptOption       : Locator;
    protected readonly returnOption     : Locator;
    protected readonly flightOption     : Locator;
    protected readonly roundTripOpt     : Locator;
    protected readonly deptLocation     : Locator;
    protected readonly arrLocation      : Locator;
    protected readonly locFromDropdown  : Locator;
    protected readonly locToDropDown    : Locator;
    protected readonly locFrom          : Locator;
    protected readonly locTo            : Locator;
    protected readonly searchButton     : Locator;

    
    constructor(page:Page){
        super(page);
        this.rootCal         = this.page.locator(`.datepicker:not(.hidden)`);
        this.datePicker      = this.rootCal.locator(`div.day:not(.disabled)`);
        this.monthChecker    = this.rootCal.locator(`.datepicker-months span`);
        this.deptOption      = this.page.getByLabel('Departure Date').nth(0);
        this.returnOption    = this.page.getByLabel('Return Date').nth(0);
        this.flightOption    = this.page.getByRole('tab',{ name: 'Flights' });
        this.roundTripOpt    = this.page.getByRole('button',{ name: 'Round Trip' });
        this.deptLocation    = this.page.getByPlaceholder('Departure City or Airport').nth(0);
        this.arrLocation     = this.page.getByPlaceholder('Arrival City or Airport').nth(0);
        this.locFromDropdown = this.page.locator('[x-show*="fromShouldShowDropdown"]');
        this.locToDropDown   = this.page.locator('[x-show*="toShouldShowDropdown"]');
        this.locFrom         = this.locFromDropdown.locator('.text-sm').filter({hasText:'Netaji S. Chandra'});
        this.locTo           = this.locToDropDown.locator('.text-sm').filter({hasText:'Indira Gandhi Intl'});
        this.searchButton    = this.page.getByLabel('Search Flights');

    }

    
    async homePageNavigation(url:string){
        await this.pageNavigation(url);
        await this.cookieSelector(this.cookieButton);
        await this.roundTripFlightSel();
    }

    async roundTripFlightSel(){
        await this.flightOption.click();
        await this.roundTripOpt.click();
    }

    async dateSelector(dateSelectorType:string, dateGap:number){
        const calenderSel = new calenderSelector(this.page,this.rootCal,this.datePicker,this.monthChecker);
        await calenderSel.dateSelector(dateSelectorType,this.deptOption,this.returnOption,(dateGap-1));
    }

    async locSelector(){
        await this.deptLocation.pressSequentially('Kol',{delay:500});
        await this.locFromDropdown.waitFor({timeout:1500});
        await this.locFrom.click();
        await expect(this.deptLocation).toHaveValue(/Netaji S. Chandra/);
        await this.arrLocation.pressSequentially('Del',{delay:500});
        await this.locToDropDown.waitFor({timeout:1500});
        await this.locTo.click();
        await expect(this.arrLocation).toHaveValue(/Indira Gandhi Intl/);
    }

    async serchSelection(){
        await this.searchButton.click();
    }
}