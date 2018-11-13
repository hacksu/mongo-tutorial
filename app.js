const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let app = express();

// Setting the view engine, which allows us to render the webpage on the server
app.set("view engine", "ejs");

// Extracts data so we can use it on the webpage
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Connect to the database!
mongoose.connect('mongodb://admin:password1@ds161183.mlab.com:61183/hacksu-lesson', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log('Connection successful!');
}).on('error', (err) => {
    console.log('There was an error when connecting to the database', err);
});

// This Schema will define how the data should be formatted
let todoSchema = new mongoose.Schema({
    task: String
});

let todo = mongoose.model("Todo", todoSchema);

// Defining Routes for Express
// These are where we will make calls to interact with the database

// Render main page, and get all the Todos
app.get("/", (req, res) => {
    // res.render("index.ejs");
    todo.find({}, (err, todoList) => {
        if (err) console.log(err);

        res.render("index.ejs", {todoList: todoList});
    });
});

// Add a new item to the Todo list
app.post("/add", (req, res) => {
    let newTodo = new todo({task: req.body.item});
    todo.create(newTodo, (err, todo) => {
        if (err) console.log(err);

        console.log("Insert: " + newTodo);
    });
    res.redirect("/");
});

// We are going to be using .get to make the PUT and DELETE requests.
// By default, the browser only really supports GET and POST, so this is mostly just a workaround

// Update a Todo
app.get("/complete/:id", (req, res) => {
    todo.findOneAndUpdate({_id: req.params.id}, {task: "Task Completed!"}, (err) => {
        if (err) console.log(err);
    });
    
    res.redirect("/");
});

// Remove a Todo from the list
app.get("/delete/:id", (req, res) => {
    todo.deleteOne({_id: req.params.id}, (err) => {
        if (err) console.log(err);

        console.log("Delete successful");
    });
    res.redirect("/");
});

// Start the server!
app.listen(8000, () => {
    console.log("Server started at http://localhost:8000");
});