const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = new express();

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getYear', () => new Date().getFullYear());

hbs.registerHelper('scream', text => text.toUpperCase());

app.use((req, res, next) => {
  let date = new Date().toString();
  let log = `${date}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log +'\n', (err) => {
    if(err)
      console.log('Unable to append file.');
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Page under maintenance',
    body: 'Page is under maintenance. Sorry for the inconvenience caused.',
  });
});

app.use(express.static(__dirname+'/public'));

app.set('view engine', 'hbs');

app.get('/', (request, response) => {
  response.render('home.hbs',{
    pageTitle: 'Home Page',
    body: 'Welcome to my website. Have fun.',
  });
});

app.get('/about', (request, response) => {
  response.render('template.hbs', {
    pageTitle: 'About Page',
    body: 'Welcome to about Page.',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    code: 404,
    errorMessage: 'Page not found.',
  });
})

app.listen(3000, () => console.log('Server is up at 3000'));
