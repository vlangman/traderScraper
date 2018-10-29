const express = require('express');
const port = 3000;
const app = express();
const hbs = require('express-handlebars');
const investing = require('./js/investingReq.js');

//tell app where to get js files
app.use(express.static(__dirname + '/js'));
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('view engine', 'hbs');

app.get('/*', (req, res) => {
    investing.requestData().then(
        (data)=>{
            if (data){
                var multi = parseFloat(data.usd_zar) * parseFloat(data.AngloGold);
                res.render('display', {usd_zar: data.usd_zar, anglo: data.AngloGold, result: multi});
            }
    }, (reject) =>{
            console.log(reject);
        }
    )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
