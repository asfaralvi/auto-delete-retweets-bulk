import puppeteer from 'puppeteer';

let login_url="https://twitter.com/i/flow/login";
(async function main() 
{
    try 
    {
        
        var browser = await puppeteer.launch({
                headless:false, 
                //To avoid logging in again
                //Please follow the same path in your file explorer and enter your browser profile path to save login cookies
                //use same path for index and login file
                args: ['--user-data-dir=C:\\Users\\Asfar\\AppData\\Local\\Temp\\puppeteer_dev_chrome_profile-0nl0Zr\\Default'],
                defaultViewport : null
        });


        var [page] = await browser.pages();
      
       
         
           
        function sleep(ms) 
        {
              return new Promise((resolve) => {
                setTimeout(resolve, ms);
              });
        }
           
        await page.goto(login_url);
        await sleep(20000);


    } 
    catch (err) 
    {
        
        console.error(err);
    }
})();