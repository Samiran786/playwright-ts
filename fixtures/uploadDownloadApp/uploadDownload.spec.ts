import {test} from '@playwright/test';
import path from 'path';

test('Download data from page',async function({page}) {
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('#downloadButton').click()
    ]);
    const filename = download.suggestedFilename();
    const customPath = path.join(__dirname,'../../downloads/',filename);
    await download.saveAs(customPath);
});

test('Edit the downloaded test data', async function(){
    
})