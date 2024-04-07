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
    ('Book Title 1', 'Some notes about Book 1', 'Author 1', 5, '1234567890', '2024-04-07'),
    ('Book Title 2', 'Some notes about Book 2', 'Author 2', 4, '0987654321', '2024-04-08'),
    ('Book Title 3', 'Some notes about Book 3', 'Author 3', 2, '9876543210', '2024-04-09');

Drop the existing constraint
ALTER TABLE books DROP CONSTRAINT rating_range_check;

Add the new constraint with the updated range
ALTER TABLE books
ADD CONSTRAINT rating_range_check CHECK (rating >= 0 AND rating <= 5);

select * from books;


update books set id = 13 where id = 13;
