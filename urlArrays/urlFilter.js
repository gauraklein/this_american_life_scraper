const allURLS = require('./urlResults.js')

let filteredURLS = []

    function removeExtraUrls (urlArray) {
    
        return urlArray.map(function(individualUrl) {
    
            if (individualUrl.startsWith('/extras/')) {
                return
            } else {
                filteredURLS.push(individualUrl)
            }
    
        })
    
    }
    
    // console.log(allURLS.arr.allUrls)

    removeExtraUrls(allURLS.arr.allUrls) 
    console.dir(filteredURLS, {'maxArrayLength': null})