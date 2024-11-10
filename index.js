import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';  // Import CORS package

dotenv.config();  // Load environment variables

const supabaseUrl = 'https://pdzxhalfjylizdatebhz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors()); // Add this line to enable CORS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Handle JSON requests
app.use(express.static('public'));

let books = [];

// Function to fetch books from Supabase
async function getBooks() {
    try {
        const { data, error } = await supabase.from('books').select('*');
        if (error) throw error;
        books = data;
    } catch (err) {
        console.log('Error fetching books!', err.message);
    }
}

// Route to render the index page
app.get('/', async (req, res) => {
    await getBooks();
    res.render('index.ejs', { books });
});

// Route to edit a book
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    res.render('new.ejs', { book });
});

// Route to update a book
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

// Route to render add book page
app.get('/add', (req, res) => {
    res.render('new.ejs');
});

// Route to add a book
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

// Route to delete a book
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

// Route to view a specific book
app.get('/book/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    res.render('view_notes.ejs', { book });
});

// Route to sort books
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

// Export the Express app as a serverless function
export default app;
