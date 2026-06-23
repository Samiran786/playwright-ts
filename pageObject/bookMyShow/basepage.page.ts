import {Page,Locator} from '@playwright/test';

export abstract class BasePage{
    protected page : Page;
    protected readonly cookieButton : Locator;
    

    constructor(page:Page){
        this.page = page;
        this.cookieButton    = this.page.locator('#acknowledgeDemoWarning');
        
    }    

    async pageNavigation(url:string){
        await this.page.goto(url);
    }

    async cookieSelector(locator:Locator){
        await locator.click();
    }

    
}