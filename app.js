const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let app = express();

// Setting the view engine, which allows us to render the webpage on the server
app.set("view engine", "ejs");

// Extracts data so we can use it on the webpage
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Defining Routes for Express
// These are where we will make calls to interact with the database

// Render main page, and get all the Todos
app.get("/", (req, res) => {
    res.render("index.ejs");
});

// Add a new item to the Todo list
app.post("/add", (req, res) => {
    res.redirect("/");
});

// We are going to be using .get to make the PUT and DELETE requests.
// By default, the browser only really supports GET and POST, so this is mostly just a workaround

// Update a Todo
app.get("/complete/:id", (req, res) => {
    res.redirect("/");
});

// Remove a Todo from the list
app.get("/delete/:id", (req, res) => {
    res.redirect("/");
});

// Start the server!
app.listen(8000, () => {
    console.log("Server started at http://localhost:8000");
});