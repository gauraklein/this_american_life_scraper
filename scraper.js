const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    const page = await browser.newPage();

    await page.goto('https://www.thisamericanlife.org/archive');
    

    const result = await page.evaluate(() => {

        let episodeDetails = []; // Create an empty array that will store our data
        let episodeLink = document.querySelector('h2'); // Select all Products
        // let urls = Array.from(document.querySelectorAll('h2'), element => element.href); //should make an array of urls
       
        // for (let i = 0, total_urls = urls.length; i < total_urls; i++) {
        //     page.goto(urls[i]);
          
        //     console.log('went to', urls[i] )
        //   }
       
        //   for (var element of episodeLink){ // Loop through each proudct
        //     let title = element.innerText; // Select the title
        //     // let price = element.childNodes[7].children[0].innerText; // Select the price

        //     episodeDetails.push({title}); // Push an object with the data onto our array
        //     console.log(title)
        // }

    console.log('something')
        
        return episodeLink; // Return our data array
    });

    browser.close();
    return result; // Return the data
};
scrape();