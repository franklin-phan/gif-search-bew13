// Require Libraries
const express = require('express');

// App Setup
const app = express();

// Middleware
// plugins or libraries we use to extend a web framework
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
  // ROUTES
  app.get('/', (req, res) => {
    res.render('home')
  })

  app.get('/greetings/:name', (req, res) => {
    // grab the name from the path provided
    const name = req.params.name;
    // render the greetings view, passing along the name
    res.render('greetings', { name });
  })

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});