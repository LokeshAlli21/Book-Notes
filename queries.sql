create table books (
	id serial primary key,
	title varchar(100) not null,
	notes text,
	author varchar(50),
	rating integer,
	isbn varchar(20),
	date varchar(40)
);

ALTER TABLE books 
ADD CONSTRAINT rating_range_check CHECK (rating > 0 AND rating <= 10);

INSERT INTO books (title, notes, author, rating, isbn, date) 
VALUES 
    ('Book Title 2', 'I read a lot of books but after I finish reading them I often do not remember all the most salient parts of the book. So I started taking notes. This capstone project is built on this idea. My friend Derek Sivers has this fantastic website where he has all the non-fiction books he has read, his notes, his ratings and when he read them. The books are sortable by rating, recency and title. Its a such cool idea for a project so Im including it as a capstone here in this course.', 'Author 2', 4, '0987654321', '2024-04-08'),
    ('Book Title 2', 'I read a lot of books but after I finish reading them I often do not remember all the most salient parts of the book. So I started taking notes. This capstone project is built on this idea. My friend Derek Sivers has this fantastic website where he has all the non-fiction books he has read, his notes, his ratings and when he read them. The books are sortable by rating, recency and title. Its a such cool idea for a project so Im including it as a capstone here in this course.', 'Author 2', 4, '0987654321', '2024-04-08'),
    ('Book Title 2', 'I read a lot of books but after I finish reading them I often do not remember all the most salient parts of the book. So I started taking notes. This capstone project is built on this idea. My friend Derek Sivers has this fantastic website where he has all the non-fiction books he has read, his notes, his ratings and when he read them. The books are sortable by rating, recency and title. Its a such cool idea for a project so Im including it as a capstone here in this course.', 'Author 2', 4, '0987654321', '2024-04-08');

Drop the existing constraint
ALTER TABLE books DROP CONSTRAINT rating_range_check;

Add the new constraint with the updated range
ALTER TABLE books
ADD CONSTRAINT rating_range_check CHECK (rating >= 0 AND rating <= 5);

select * from books;


update books set title = 'HOW TO WIN FRIENDS AND INFLUENCE PEOPLE';
