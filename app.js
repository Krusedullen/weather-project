const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

var apiKey = "32b1ef2fde08487f590d2266076d4f88"
var query = req.body.cityInput
var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric"
https.get(url, function(response){
  console.log(response.statusCode);
  response.on("data", function(data){
    const weatherData = JSON.parse(data); //data kommer som hexadecimals og må parses til enten tekst eller tall. Denne metoden parser data om til et js-objekt
    const temp = weatherData.main.temp //.main.temp er pathen til temp. den kan man finne ved å lime url inn i chrome med AwesomeJSON installert.
    const weatherDescription = weatherData.weather[0].description
    console.log(weatherDescription);

    var weatherIconURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

    res.write("<h1>The temperature in " + query + " is " + temp + " degrees celcius. </h1>");
    res.write("<h3>Expect "  + weatherDescription + " in " + query + "  today.</h3> ");
    res.write("<img src=" +weatherIconURL + ' alt="weather-img">');
    res.send()
  })
})
})


app.listen(3000, function(){
  console.log("Server running on port 3000");
})
