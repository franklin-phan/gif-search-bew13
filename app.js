// Require Libraries
const express = require('express');

  // Require tenorjs
  const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": "JWEOV1L8X0N2", // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});


// App Setup
const app = express();

//reference public folder
app.use(express.static('public'));

// Middleware
// plugins or libraries we use to extend a web framework
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    // Handle the home page when we haven't queried yet
    term = ""
    gifCount = "10"
    if (req.query.term) {
        term = req.query.term
        gifCount = req.query.gifCount
    }
   
    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    Tenor.Search.Query(term,gifCount)
        .then(response => {
            // store the gifs we get back from the search
            const gifs = response;
            const searchTerm = term;
            // pass the gifs as an object into the home page
          res.render('home', { gifs,searchTerm })

        }).catch(console.error);

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