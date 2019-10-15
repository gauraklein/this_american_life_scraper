const rp = require('request-promise'); 
const $ = require('cheerio')
const url = 'https://www.thisamericanlife.org/archive';
const puppeteer = require('puppeteer')


// scrape function does the work 

// TODO make the button clicks a for loop

let scrape = async () => {
const browser = await puppeteer.launch({
  headless: false,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
});
const page = await browser.newPage();
await page.setViewport({
  width: 1920,
  height: 1080
})
await page.goto(url);

await clickButton(page)
   
await console.log('loaded urls now to gather')

let bodyHTML = await page.evaluate(() => document.body.innerHTML);

await gatherUrls(bodyHTML)

await browser.close();
};


async function clickButton (pageUrl) {
  let clickCount = 0
  for (let nodeChild = 6; clickCount < 17; clickCount++) {

    await pageUrl.click(`#block-system-main > div > div:nth-child(${nodeChild}) > ul > li > a`)
    await pageUrl.waitFor(3000)
    await nodeChild++
    await console.log('waited for 2 seconds')
    await console.log('click number', clickCount)

  }
  // return clickCount
}


scrape()

// gathers urls

function gatherUrls (html) {
  //success!
  console.log('urlGather')

  let episodeUrlNumber = $('article > header > a', html).length;

  console.log('this is the number of urls', episodeUrlNumber)

   //finds the amount of URLS
  // console.log($('article > header > a', html));

  let episodeUrls = []

  //for loop to run through all urls

  for (let i = 0; i < episodeUrlNumber; i++) {
    episodeUrls.push($('article > header > a', html)[i].attribs.href);
  }

  console.dir(episodeUrls, {'maxArrayLength': null})
}