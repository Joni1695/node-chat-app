const path = require('path');
const express = require('express');

// Public path
const publicPath = path.join(__dirname,'../public');
// Heroku port configuration
const port = process.env.PORT || 3000;

// Create express app
var app = express();

app.use(express.static(publicPath));

// Open server on port
app.listen(port, () => {
  console.log(`Server open on port ${port}.`);
});
