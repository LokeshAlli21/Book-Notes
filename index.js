import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Book Notes',
    password: '********',
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

app.post('/edit/:id',async (req, res) => {
    const id = parseInt(req.params.id);

    if (id > 0) {
        
        let query = 'UPDATE books SET id = $1';
        let val = [id];

        const fieldsToUpdate = ['title', 'author', 'rating', 'notes', 'isbn'];

        fieldsToUpdate.forEach(field => {
            if (req.body[field]) {
                query += `, ${field} = $${val.length + 1}`;
                val.push(field === 'rating' ? parseInt(req.body[field]) : req.body[field]);
            }
        });

        query += ' WHERE id = $1';

        // console.log(query, val);

        try {
            await db.query(query, val);
        } catch (err) {
            console.log('Error updating book:', err.stack);
        }


    } else {
        console.log('Invalid ID!');
    }


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
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (+1 because months are zero-indexed) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with leading zero if necessary
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero if necessary
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get seconds and pad with leading zero if necessary
    var formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    try {
        await db.query('insert into books (title, notes, author, rating, isbn, date) values ($1, $2, $3, $4, $5, $6)', [title, notes, author, rating, isbn, formattedDateTime]);
    } catch (err) {
        console.log('error inserting data!', err.stack);
    }

    res.redirect('/');
});

app.get('/delete/:id',async (req, res) => {
    const id = parseInt(req.params.id);

    if (id > 0) {
        try {
            await db.query('delete from books where id =$1', [id]);
        } catch (err) {
            console.log('error deleting data!', err.stack);
        }
    } else {
        console.log('Invalid ID!');
    }

    res.redirect('/');

});

app.get('/book/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find( b => b.id == id);
    res.render('view_notes.ejs', {book: book});
});

app.post('/sort',async (req, res) => {
    const category = req.body.category;
    const order = req.body.order;

    let query = 'select * from books order by ';
    
    switch (category) {
        case 'title':
            query = query + 'title ';
            break;
        case 'rating':
            query = query + 'rating ';
            break;
        case 'date':
            query = query + 'date ';
            break;
        
        default:
            break;
    }
    if (order == 'ASC') {
        query = query + 'ASC';
    } else if (order == 'DESC') {
        query = query + 'DESC';
    }

    query = query + ';';

    try {
        const result = await db.query(query);
        // console.log(query);
        books = result.rows;
        res.render('index.ejs', {books: books, sort: [category, order]});
    } catch (err) {
        console.log('error sorting books !', err.stack);
    }

});

app.listen(port, () => {
    console.log(`server is started on port ${port}`);
});