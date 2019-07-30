const puppeteer = require('puppeteer');
setImmediate(async ()=>{
  const browser = await puppeteer.launch({headless :false});
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher');
  await page.waitForSelector('input')
  await page.type('input[type=text]','mcici1231',{delay:50})
  await page.type('input[type=password]','123456xu',{delay:65})
  await page.click('button[type=submit]',{delay:50})
  

})
