const express = require("express");
const ejs = require("ejs");
const app = express();
const request = require("request");
const routeJs = require("./routes/routes");
const API_PORT = process.env.PORT || 6001 
// kanyon api       const API_URL2 = "https://bonus-api.betkanyon100.com/SearchEvent.php?search="+gN;

app.set("view engine", "ejs");
//body parser
app.use(express.json());
app.use(express.static("public"))
app.use(routeJs);



app.listen(API_PORT, ()=>console.log('Server started on ' + API_PORT))
