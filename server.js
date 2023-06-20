/*
Reboot of Personnel App using Cyclic
Chungon Tse
https://puzzled-clam-attire.cyclic.app
https://github.com/cotse900/WEB3-Personnel-app-cyclic
*/
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var dataService = require('./data-service.js');

onHttpStart = () => {
    console.log('Express http server listening on port ' + HTTP_PORT);
}

app.use(express.static('public'));

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/about", (req,res) => {
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees", (req,res) => {
    dataService.getAllEmployees()
    .then((data) => res.json(data))
    .catch((err) => res.json({error: 'message'}))
});

app.get("/managers", (req,res) => {
    dataService.getManagers()
    .then((data) => res.json(data))
    .catch((err) => res.json({error: 'message'}))
});

app.get("/departments", (req,res) => {
    dataService.getDepartments()
    .then((data) => res.json(data))
    .catch((err) => res.json({error: 'message'}))
});

app.get('*', (req, res) => {
    res.status(404).send("Page Not Found");
    res.redirect("https://miro.medium.com/max/1400/1*BY3XOmM2egjm3LIfRjqZiw.png");
  });

// setup http server to listen on HTTP_PORT
dataService.initialize()
.then((data) =>{
    app.listen(HTTP_PORT, onHttpStart());    
})
.catch(() => {
    console.log("There was an error with initializing.");
})