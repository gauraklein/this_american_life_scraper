const rp = require('request-promise'); 
const $ = require('cheerio')
const url = 'https://www.thisamericanlife.org/archive';

rp(url)
  .then(function(html){
    //success!
    
    console.log($('article > header > a', html).length);
    // console.log($('article > header > a', html));
  })
  .catch(function(err){
    //handle error
  });