const express = require("express");
const ejs = require("ejs");
const app = express();
const request = require("request");
const routeJs = require("./routes/routes");

// kanyon api       const API_URL2 = "https://bonus-api.betkanyon100.com/SearchEvent.php?search="+gN;


app.set("view engine", "ejs");
//body parser
app.use(express.json());
app.use(express.static("public"))
app.use(routeJs);



app.listen(3005, ()=>console.log("server running at 3005"))