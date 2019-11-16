const filteredUrlArrayObject = require('./../urlArrays/filteredUrls')
const filteredUrlArray = filteredUrlArrayObject.filteredUrlArray
const puppeteer = require('puppeteer')
const $ = require('cheerio')



/// array for all of the resulting objects

const allEpisodeInfoArray = []

//// FUNCTION TO VISIT URL AND SCRAPE

async function visitUrlsAndScrape () {

//browser launch
    const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });

//new page var 

  const page = await browser.newPage();

//for loop to visit urls

  await visitUrlLoop(page)

  await console.dir(allEpisodeInfoArray, {depth: null, maxArrayLength: null})
  await console.log('scrape completed')

  await browser.close();


}
// console.log(filteredUrlArray)

visitUrlsAndScrape()

///////////////FUNCTIONS\\\\\\\\\\\\\\\\\

//Loop to visit urls and gather data

async function visitUrlLoop (page) {

    for (let urlToScrape = 0; urlToScrape < 3; urlToScrape++) {
        const episodeUrl = filteredUrlArray[urlToScrape];
        const pageLoadFull = page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.goto('https://www.thisamericanlife.org' + episodeUrl);
        await pageLoadFull;
        let pageHTML = await page.evaluate(() => document.body.innerHTML);
        await console.log('visited this page', episodeUrl)
        await gatherEpisodeData(pageHTML)
    }

}

//function that actually gathers the data and adds it to an episode object

function gatherEpisodeData (HTML) {

    //html selectors

    let episodeNumber = $('#block-system-main > div > article > header > div > div.meta > div.field.field-name-field-episode-number.field-type-number-integer.field-label-hidden > div > div', HTML).text()
    let episodeTitle = $('#block-system-main > div > article > header > div > div.episode-title > h1', HTML).text()
    let episodeDescription = $('#block-system-main > div > article > header > div > div.field.field-name-body.field-type-text-with-summary.field-label-hidden > div > div > p', HTML).text()
    let episodeDate = $('#block-system-main > div > article > header > div > div.meta > div.field.field-name-field-radio-air-date.field-type-date.field-label-hidden > div > div > span', HTML).text()
    let imageUrl = $('#block-system-main > div > article > figure > img', HTML).attr('src')
    let actsArray = findNumberOfActs(HTML)

    //episode object that will be pushed to final array

    let episodeObject = {

        number: episodeNumber,
        title: episodeTitle,
        description: episodeDescription,
        date: episodeDate,
        image: imageUrl,
        acts: actsArray
    }

    allEpisodeInfoArray.push(episodeObject)
}

//function that goes through the acts and creates act objects that are pushed to acts array

function findNumberOfActs (HTML) {

    // array that will be returned

    let actsArray = []

    // number of acts, dictates how many times the for loop will run

    let actSectionLength = $('#block-system-main > div > article > div > div.field.field-name-field-acts.field-type-entityreference.field-label-hidden > div', HTML).children().length
    let nodeCount = 1

    //FOR LOOP TO GO THROUGH EACH ACT

    for (let actToScrape = 0; actToScrape < actSectionLength; actToScrape++) {
    //variables 
    let actTitle = $(`#block-system-main > div > article > div > div.field.field-name-field-acts.field-type-entityreference.field-label-hidden > div > div:nth-child(${nodeCount}) > article > div > h2 > a`, HTML).text()
    let actProducers = findProducers(HTML, nodeCount)
    let actDescription = $(`#block-system-main > div > article > div > div.field.field-name-field-acts.field-type-entityreference.field-label-hidden > div > div:nth-child(${nodeCount}) > article > div > div.field.field-name-body.field-type-text-with-summary.field-label-hidden > div > div > p`, HTML).text()
    let actSong = $(`#block-system-main > div > article > div > div > div > div:nth-child(${nodeCount}) > article > div > div.field-collection-container.clearfix > div > div > div`, HTML).text()
    console.log('this is the act', actTitle)

        let actObject = {
            title: actTitle,
            producers: actProducers,
            description: actDescription,
            song: actSong
        }

        actsArray.push(actObject)
        nodeCount++
    }

    return actsArray
}

function findProducers (HTML, nodeCount) {
    let producerSectionLength = $('#block-system-main > div > article > div > div > div > div:nth-child(' + nodeCount + ') > article > div > div.field.field-name-field-contributor.field-type-entityreference.field-label-above > div', HTML).children().length
    let producerNodeCount = 1
    let producerArray = []

    for (let producersToScrape = 0; producersToScrape < producerSectionLength; producersToScrape++) {
        let currentProducer = $('#block-system-main > div > article > div > div > div > div:nth-child(' + nodeCount + ') > article > div > div.field.field-name-field-contributor.field-type-entityreference.field-label-above > div > div:nth-child(' + producerNodeCount + ')', HTML).text()

        producerArray.push(currentProducer)
        producerNodeCount++
    }

    return producerArray
}
module.exports = {

    gatherEpisodeData: gatherEpisodeData,
    findNumberOfActs: findNumberOfActs

}