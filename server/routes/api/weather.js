const express = require('express');
const router = express.Router();
const request = require('request')
const fs = require('fs')

function saveFile(data, file){
    fs.writeFileSync(__dirname + `/test/${file}.json`, (data), 'utf-8')
}

var getWeather = () => {
    request('http://api.openweathermap.org/data/2.5/weather?q=Montreal,ca&units=metric&APPID=3bd0a89292360e66a7daddeafc730aa0', function(error, result, body){
        saveFile(body, "weather")
    })
    console.log("WEATHER UPDATED!")
}

var getForecast = () => {
    request('http://api.openweathermap.org/data/2.5/forecast?q=Montreal,ca&units=metric&APPID=3bd0a89292360e66a7daddeafc730aa0', function(error, result, body){
        saveFile(body, "forecast")
    })
    console.log("WEATHER UPDATED!")
}

// setInterval(getWeather, 300000)
// setInterval(getForecast, 300000)

//@routes
router.get('/', (req, res)=>{
    request('http://api.openweathermap.org/data/2.5/weather?q=Montreal,ca&units=metric&APPID=3bd0a89292360e66a7daddeafc730aa0', function(error, result, body){
        saveFile(body, "weather")
    })
})

router.get('/forecast', (req, res)=>{
    request('http://api.openweathermap.org/data/2.5/forecast?q=Montreal,ca&units=metric&APPID=3bd0a89292360e66a7daddeafc730aa0', function(error, result, body){
        saveFile(body, "forecast")
    })
})


router.get('/load', (req, res)=>{
    fs.readFile(__dirname + '/test/weather.json', {encoding: 'utf-8'}, function(err, data){
        if(err){
            console.log(err)
        } else {
            res.send(data)
            res.end()
        }
    })
})

router.get('/forecast/load', (req, res)=>{
    fs.readFile(__dirname + '/test/forecast.json', {encoding: 'utf-8'}, function(err, data){
        if(err){
            console.log(err)
        } else {
            res.send(data)
            res.end()
        }
    })
})





module.exports = router;