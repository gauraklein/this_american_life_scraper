const rp = require('request-promise'); 
const $ = require('cheerio')
const url = 'https://www.thisamericanlife.org/archive';

rp(url)
  .then(function(html){
    //success!
    
    let episodeUrlNumber = $('article > header > a', html).length;
    // console.log($('article > header > a', html));
    let episodeUrls = []
    for (let i = 0; i < episodeUrlNumber; i++) {
      episodeUrls.push($('article > header > a', html)[i].attribs.href);
    }

    console.log(episodeUrls)
  })
  .catch(function(err){
    //handle error
  });


  //17 load more button clicks to get all episodes on archive page

  //button HMTL

  // #block-system-main > div > div:nth-child(6) > ul > li > a