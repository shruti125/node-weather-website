const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = (path.join(__dirname, '../public'));
const viewsPath = (path.join(__dirname, '../templates/views'));
const partialsPath = (path.join(__dirname, '../templates/partials'));

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

//app.com
//app.com/help
//app.com/about
//app.com/weather
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shruti S.'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shruti S.'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help text',
        name: 'Shruti S'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({err: 'Address must be provided'});
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({err: error})
        }
        forecast(latitude, longitude, (errf, forecastData) => {
            if(errf)
            {
                return res.send({error: 'Error with forecast'})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
    
})


app.get('/help/*', (req, res) => {
    res.render('notfound', {title: "404", message: "Help article not found", name: 'Shruti S.'});
})

app.get('*', (req, res) => {
    res.render('notfound', {title: "404", message:"Page not found", name: 'Shruti S.'});
})

app.listen(port, ()=> {
    console.log('Server is running on port' + port);  
})