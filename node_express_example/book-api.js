//import express module
const express = require('express');

//import cors module
const cors = require('cors');

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

//add book
app.post('/book', (req, res) => {

    const book = req.body;

    //Output the book to console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
})

//get all books
app.get('/books', (req, res) => {
    res.json(books);
})

//get book by id
app.get('/book/:isbn', (req, res) => {
    //Reading isbn from the URL
    const isbn = req.params.isbn;

    for(let book of books) {
        if(book.isbn === isbn){
            res.json(book);
            return;
        }
    }

    //seding 404 when not found
    res.status(404).send('Book not found');
})

//delete book by id
app.delete('/book/:isbn', (req, res) => {
    //Reading isbn from the URL
    const isbn = req.params.isbn;

    //Remove book 
    books = books.filter(i => {
        if(i.isbn !== isbn){
            return true;
        }
        return false;
    })

    res.send('Book is deleted');
})

//edit book by id
app.post('/book/:isbn', (req, res) => {
    //Reading isbn from the URL
    const isbn = req.params.isbn;
    //Data of edited book
    const newBook = req.body;

    //find and replace book
    for(let i = 0; i < books.length; i++){
        let book = books[i]
        if(book.isbn === isbn){
            books[i] = newBook;
        }
    }

    res.send('Book is edited');
})


//start client
app.listen(port, () => {
    console.log(`Hello world app listening on port ${port}!`)
})
