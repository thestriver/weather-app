const express = require('express')
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express()

const apiKey = "6ab227b4a350dd98e3e201f54ba95085";

app.use(express.static('public')); //to expose all files in public to express
app.use(bodyParser.urlencoded({ extended: true })); //allow us access the body object instead of rendering the whole index
app.set('view engine', 'ejs')

const port = 3000

app.get('/', (req, res) => {
//   res.send('Hello World!')
     res.render('index');
})

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    //axios
    axios
    .get(url)
    .then(function (response) {
        let weather  = response.data
        // console.log(weather)
        const { main, name,  } = weather
    // handle success
    // console.log(response.data);
        if(main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'})
        }
        else {
            let weatherText = `
            It's ${main.temp} degrees in ${name}!
            Maximum temperature for today is ${main.temp_max} but it can go as low as ${main.temp_min}!
            Humidity is ${main.humidity}
             `;
            res.render('index', {weather: weatherText, error: null})

        }

    })
    .catch(function (error) {
        // handle error
        // console.log(error.data);
        res.render('index', {weather: null, error: 'Error, please try again'})


    });
    // res.render('index')
    // console.log(req.body.city);
})

app.listen(port, () => {
  console.log(`Working app listening at http://localhost:${port}`)
})