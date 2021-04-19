//import express module
const express = require('express');

//import cors module
const express = require('cors');

//create express app
const app = express();

//set up port
const port = 3000;

//data
//TODO: DB connection
let books = [];

//enable all cors
app.use(cors());

//body-parser configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//post endpoint
app.post('/book', (req, res) => {

    const book = req.body;

    //Output the book to console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
})

//start client
app.listen(port, () => {
    console.log(`Hello world app listening on port ${port}!`)
})