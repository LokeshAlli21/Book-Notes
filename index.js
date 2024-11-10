import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config(); // Load environment variables

const supabaseUrl = 'https://pdzxhalfjylizdatebhz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let books = [];

async function getBooks() {
    try {
        const { data, error } = await supabase.from('books').select('*');
        if (error) throw error;
        books = data;
    } catch (err) {
        console.log('Error fetching books!', err.message);
    }
}

app.get('/', async (req, res) => {
    await getBooks();
    res.render('index.ejs', { books });
});

app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id == id);
    res.render('new.ejs', { book });
});

app.post('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const fieldsToUpdate = {};

    ['title', 'author', 'rating', 'notes', 'isbn'].forEach(field => {
        if (req.body[field]) {
            fieldsToUpdate[field] = field === 'rating' ? parseInt(req.body[field]) : req.body[field];
        }
    });

    try {
        const { error } = await supabase
            .from('books')
            .update(fieldsToUpdate)
            .eq('id', id);
        if (error) throw error;
    } catch (err) {
        console.log('Error updating book:', err.message);
    }

    res.redirect('/');
});

app.get('/add', (req, res) => {
    res.render('new.ejs');
});

app.post('/add', async (req, res) => {
    const { title, notes, author, rating, isbn } = req.body;
    const formattedDateTime = new Date().toISOString();

    try {
        const { error } = await supabase
            .from('books')
            .insert([{ title, notes, author, rating: parseInt(rating), isbn, date: formattedDateTime }]);
        if (error) throw error;
    } catch (err) {
        console.log('Error inserting data!', err.message);
    }

    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const { error } = await supabase.from('books').delete().eq('id', id);
        if (error) throw error;
    } catch (err) {
        console.log('Error deleting data!', err.message);
    }

    res.redirect('/');
});

app.get('/book/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id == id);
    res.render('view_notes.ejs', { book });
});

app.post('/sort', async (req, res) => {
    const { category, order } = req.body;

    const sortBy = ['title', 'rating', 'date'].includes(category) ? category : 'id';
    const sortOrder = order === 'ASC' ? 'asc' : 'desc';

    try {
        const { data, error } = await supabase
            .from('books')
            .select('*')
            .order(sortBy, { ascending: sortOrder === 'asc' });
        if (error) throw error;
        books = data;
        res.render('index.ejs', { books, sort: [category, order] });
    } catch (err) {
        console.log('Error sorting books!', err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});