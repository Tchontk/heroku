const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;
var app = express()

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} -  ${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  })
  console.log(log);
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: "We'll be right back"
//   })
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  // console.log(`${req.method} -  ${req.url}`);
  // res.send('<h1>Hello Express !</h1>')
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello ScReAm It',
    name: 'P',
    hobbies: ['Running', 'Biking']
  })
})

app.get('/about', (req, res) => {
  // res.send('<h1>About Page !</h1>')
  res.render('about.hbs', {
    pageTitle: 'About Page !',
  })
})

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: "Projects"
  })
})

app.get('/error', (req, res) => {
  res.send({
    errorMessage: 'Error Message'
  })
})

app.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`Server is listen on port ${port}`);
})