const puppeteer = require('puppeteer');
const userAgent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
setImmediate(async ()=>{
  const browser = await puppeteer.launch({headless :false});
  const page = await browser.newPage();
  await page.setUserAgent(userAgent)
  await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher');
  await page.waitForSelector('input')
  await page.type('input[type=text]','opgpstypd',{delay:123})
  await page.type('input[type=password]','147258',{delay:103})
  await page.click('button[type=submit]',{delay:50})
  await page.goto('https://www.instagram.com/opgpstypd/');
  await page.on('load',async ()=>{
      const handle = await page.evaluateHandle(() => ({window, document,_sharedData}));
      const properties = await handle.getProperties();
      const sharedData = properties.get('_sharedData');
      console.log("TCL: sharedData", sharedData)

  })

  
})
