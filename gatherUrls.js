const rp = require('request-promise'); 
const $ = require('cheerio')
const url = 'https://www.thisamericanlife.org/archive';
const puppeteer = require('puppeteer')


let scrape = async () => {
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
await page.goto(url);
await page.click("#block-system-main > div > div:nth-child(6) > ul > li > a']");
await browser.close();
};


let gather = rp(url)
.then(function(html){
  //success!
  let episodeUrlNumber = $('article > header > a', html).length; //finds the amount of URLS
  // console.log($('article > header > a', html));
  let episodeUrls = []

  //for loop to run through all urls

  for (let i = 0; i < episodeUrlNumber; i++) {
    episodeUrls.push($('article > header > a', html)[i].attribs.href);
  }

  console.log(episodeUrls)
})
.catch(function(err){
  //handle error
});

scrape()
.then(gather);
