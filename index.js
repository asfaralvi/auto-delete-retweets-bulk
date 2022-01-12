import puppeteer from 'puppeteer';

let profile_url="https://twitter.com/@username/with_replies";

(async function main() 
{
    try 
    {
        
        var browser = await puppeteer.launch({
                headless:false, 
                //To avoid logging in again
                //Please follow the same path in your file explorer and enter your browser profile path to save login cookies
                args: ['--user-data-dir=C:\\Users\\UserName\\AppData\\Local\\Temp\\puppeteer_dev_chrome_profile-0nl0Zr\\Default'],
                defaultViewport : null
        });

        var [page] = await browser.pages();
      
       
         
           
        function sleep(ms) 
        {
              return new Promise((resolve) => {
                setTimeout(resolve, ms);
              });
        }
           
        await page.goto(profile_url);
        await sleep(5000); //wait 5s to load profile page

        let i=0; //counter

restart: 
        while(await page.$$('div[data-testid="unretweet"]')!="")
        {
            try
            {
                    i++;
                    await sleep(1000);

                    if(await page.$$('div[data-testid="unretweet"]')!="")
                    {
                        const rt=await page.$$('div[data-testid="unretweet"]');

                        await rt[0].click();
                        await sleep(1000);

                        if(await page.$$('div[data-testid="unretweetConfirm"]')!="")
                        {
                            const rtc=await page.$$('div[data-testid="unretweetConfirm"]');
                            await rtc[0].click();

                        }

                    }
                    else
                    {
                            continue restart;
                    }
            }
            catch(err)
            {
            console.log(err);
            }
            
            console.log(i);
        }



          await browser.close();

    } 
    catch (err) 
    {
        
        console.error(err);
    }
})();
