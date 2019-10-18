const $ = require('cheerio')
const url = 'https://www.thisamericanlife.org/archive';
const puppeteer = require('puppeteer')
const allEpisodeData = require('./../allEpisodeData')

const url = 'https://www.thisamericanlife.org/'

async function getLatestEpisodeAndPushResults () {

    //browser launch
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });

    //new page var 

    const page = await browser.newPage();

    await clickEpisode(page)

    await gatherEpisodeData()

    await pushEpisodeData()

    await console.log('data added')

    await browser.close();

} 

// functions

function clickEpisode(page) {

    //this will go to homepage and click on first episode

}

function gatherEpisodeData(pagehtml) {
    
    //this will scrape the data from episode page

}

function pushEpisodeData(episodeObject) {

    //this will push the object into the all episode array

}