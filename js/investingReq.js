var request = require('request');
const cheerio = require('cheerio');


var options = {
    headers: { 'user-agent': 'node.js' }
}

const requestData = () => {
    return new Promise((resolve, reject)=>{

        request.get('https://za.investing.com/equities/south-africa-adrs', options, (error, response, html) => {
            if (error){
                reject(error);
            }
            const  $ = cheerio.load(html);
            var NYSE  = $('.pid-20610-last', '#pair_20610');
            var exchange  = $('.pid-17-last', 'tr');
            var result = {
                AngloGold : parseFloat(NYSE.text(), 10),
                usd_zar : parseFloat(exchange.text(), 10)
            }
            resolve(result);
        })


    })
}

module.exports = {
    requestData
}