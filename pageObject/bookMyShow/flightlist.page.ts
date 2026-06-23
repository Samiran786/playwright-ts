import {Page,Locator,expect} from '@playwright/test';
import { BasePage } from './basepage.page';
import { HomePage } from './homepage.page';

export class FlightListPage extends BasePage{
    protected readonly flightList : Locator;
    protected readonly numFlight : Locator;
    protected readonly numFlightList : Locator;
    protected readonly ticketPrices : Locator;

    constructor(page:Page){
        super(page);
        this.flightList = this.page.locator('.space-y-4.relative');
        this.numFlight  =  this.page.locator('[x-show="!loading"]');
        this.numFlightList = this.flightList.locator('.hidden');   
        this.ticketPrices = this.numFlightList.locator('.text-lg');
    }

    async pageLoadChecker(){
        //await this.cookieSelector(this.cookieButton);
        await this.flightList.waitFor({timeout:15000});
    }

    async validateNumberResult(){
        // we will validate if number of result and number of flights in the list
        // is same or not
        const numberOfFlights : string = await this.numFlight.textContent() ?? '';
        const match:RegExpMatchArray | null = numberOfFlights.match(/\d+/);
        const numFlight : number = match ? Number.parseInt(match[0],10) : 0;
        console.log(`The number for flights mentioned in the page : ${numFlight}`);
        const totalNumFlightList : number = await this.numFlightList.count();
        console.log(`The number for flights actually exists as list : ${totalNumFlightList}`)
        if (numFlight > 0){
            expect(numFlight).toEqual(totalNumFlightList);
        }else{
          console.error('No flights in the list');  
        }

    }

    async lowestTicketPriceValidation(){
        const countTicket :number = await this.ticketPrices.count();

        let ticketPriceCollections:number[] =[];
        let ticketPrice : string='';
        let ticketPriceValue:number=0;

        
        for(let i:number=0; i<countTicket; i++){
            ticketPrice= await this.numFlightList.nth(i).locator('.text-lg').textContent() ?? '0';
            console.log(ticketPrice);
            let match:RegExpMatchArray | null = ticketPrice.match(/\d+(\.\d+)?/); // to check float number
            ticketPriceValue= match ? Number.parseFloat(match[0]) : 0;
            ticketPriceCollections.push(ticketPriceValue);
        }

        console.log(`Prices of tickets as array : ${ticketPriceCollections}`);

        if(await this.isSorted(ticketPriceCollections)===true){
            console.log(ticketPriceCollections[0]);
            await this.numFlightList.nth(0).locator('.btn').click();
        }
    }

    async isSorted(arr:number[]):Promise<boolean>{
        for(let i:number=0; i<arr.length; i++){
            if(arr[i]>arr[i+1]){
                return false;
            }
        }
        return true;
    }

    



}