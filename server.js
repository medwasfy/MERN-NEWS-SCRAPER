
// Calling dependecies
var dotenv = require('dotenv').config();
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var routes = require("./routes/routes");
var apiController = require('./controllers/apiController')

// Default port and middleware
var PORT = process.env.PORT || 3001;
mongoose.Promise = Promise;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/build"));

var db = PROD_MONGODB || "mongodb://medwasfy:medwasfy1@ds113703.mlab.com:13703/mern-news-scraper";

// Connect mongoose to database
mongoose.connect(db, function(error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log("mongoose is connected !!! 👍 !!!");
  }
});

// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});

app.use("/", routes);

app.post("/api/articles", apiController.create);

app.get("/api/articles", apiController.index);

app.delete("/api/articles/:id", apiController.destroy);

// Start server
app.listen(PORT, function() {
  console.log("Listening on port %s! Visit localhost:%s in the browser.", PORT, PORT);
});
