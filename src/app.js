const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const geoCode = require('../utils/geocode')
const foreCast = require('../utils/forecast')

//pathes and setting directory paths

const viewsPath = path.join(__dirname, '../views/views') // path for new views directory name
const partialsPath = path.join(__dirname, '../views/partials')
const publicDirectoryPath = path.join(__dirname, '../public') //static pages

const app = express()

//link hbs and set directories

app.set('views', viewsPath) // for changing the name of views directory
app.set('view engine', 'hbs') // link hbs to the project
hbs.registerPartials(partialsPath)

//setup The Static Direcotry
app.use(express.static(publicDirectoryPath))

//setup the pages linking and routing
app.get('', (req, res) => { // set pages for your website and rout it
    res.render('index', {
        title: 'Weather',
        name: 'ward'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'ward'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'ward'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location){
        return res.send({error: "you must provide a location!"})
    }

    geoCode(req.query.location, (error, data) => {
        const coordinates = data

        if (error){
            return res.send({ error })
        }

        foreCast(coordinates.longitude, coordinates.latitude, (error, data) => {
            if (error){
                return res.send({error})
            }

            res.send({
                location: req.query.location,
                temperature: data.temperature,
                weatherForeCast: data.weatherDiscription

            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'ward',
        errorMSG: 'Help Artical Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'ward',
        errorMSG: '404 Error Page Was Not Found!'
    })
})

app.listen(3000, () => {
    console.log("the server is up")
})