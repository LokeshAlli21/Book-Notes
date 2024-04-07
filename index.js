import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Book Notes',
    password: 'lOKESH',
    port: 5432
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

let books = [{id: 1, title:'Title1', author: 'Author1', rating: 1, notes: 'The code b.notes.slice(0, 100) grabs the first 100 characters from the b.notes string. It starts counting from 0 because in programming, counting often starts from 0 rather than 1. So, it grabs characters 0 through 99, which are the first 100 characters in total.', isbn: '0818403055', date: 'Date1'}, {id: 2, title:'Title2', author: 'Author2', rating: 2, notes: 'Notes2', isbn: '0818403055', date: 'Date2'}];

async function getBooks(){
    try {
        const result = await db.query('select * from books');
        books = result.rows;
    } catch (err) {
        console.log('error fetching books!', err.stack);
    }
}

app.get('/',async (req, res) => {
    await getBooks();
    res.render('index.ejs', {books: books});
});

app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find( b => b.id == id);
    res.render('new.ejs', {book: book});
});

app.post('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = books.findIndex( b => b.id == id);

    const existingBook = books[index];

    const book = {
        id: existingBook.id,
        title: req.body.title || existingBook.title, 
        author: req.body.author || existingBook.author, 
        rating: req.body.rating || existingBook.rating, 
        notes: req.body.notes || existingBook.notes, 
        isbn: req.body.isbn || existingBook.isbn, 
        date: 'edited on : ' + new Date()
    };

    books[index] = book;

    res.redirect('/');
    

});

app.get('/add', (req, res) => {
    res.render('new.ejs');
});

app.post('/add',async (req, res) => {
    const title = req.body.title;
    const notes = req.body.notes;
    const author = req.body.author;
    const rating = parseInt(req.body.rating);
    const isbn = req.body.isbn;
    const date = new Date();

    try {
        await db.query('insert into books (title, notes, author, rating, isbn, date) values ($1, $2, $3, $4, $5, $6)', [title, notes, author, rating, isbn, date]);
    } catch (err) {
        console.log('error inserting data!', err.stack);
    }

    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(books);
    const index = books.findIndex( b => b.id == id);

    if(index !== -1){
        books.splice(index, 1);
    }

    res.redirect('/');

});

app.get('/book/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find( b => b.id == id);
    res.render('view_notes.ejs', {book: book});
});

app.post('/radio', (req, res) => {
    console.log(req.body.rating);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`server is started on port ${port}`);
});