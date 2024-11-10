# Book Notes App

This is a simple web application that allows users to manage books, including adding, editing, deleting, and viewing books with their notes. The app uses **Supabase** as the backend and **Express** for server-side logic.

## Features

- **View Books**: List all books.
- **Add a Book**: Add new books with details like title, author, rating, notes, and ISBN.
- **Edit a Book**: Update book details.
- **Delete a Book**: Remove books from the list.
- **Sort Books**: Sort books by title, rating, or date.
- **View Book Details**: View notes and details for each book.

## Technologies Used

- **Frontend**: EJS, HTML, CSS
- **Backend**: Express.js
- **Database**: Supabase (PostgreSQL)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/LokeshAlli21/Book-Notes.git
    cd Book-Notes
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your **Supabase** credentials:

    ```
    SUPABASE_KEY=your_supabase_key
    ```

4. Run the app locally:

    ```bash
    npm start
    ```

5. Access the app in your browser at `http://localhost:3000`.

