-- Active: 1712497476999@@127.0.0.1@5432@Book Notes
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

Drop the existing constraint
ALTER TABLE books DROP CONSTRAINT rating_range_check;

Add the new constraint with the updated range
ALTER TABLE books
ADD CONSTRAINT rating_range_check CHECK (rating >= 0 AND rating <= 5);

select * from books;


update books set title = 'HOW TO WIN FRIENDS AND INFLUENCE PEOPLE';

-- sample data
INSERT INTO books (title, notes, author, rating, isbn, date) VALUES
    ("Harry Potter and the Philosopher's Stone", "Harry Potter and the Philosopher's Stone is the first book in the Harry Potter series by J.K. Rowling. It follows the journey of a young wizard, Harry Potter, as he discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry. Along with his friends Hermione Granger and Ron Weasley, Harry uncovers dark secrets about his past and confronts the dark wizard Voldemort. The book explores themes of friendship, bravery, and the power of love, and has captured the imagination of readers worldwide."
	, 'J.K. Rowling', 5, '9780747532743', '1997-06-26'),
    ("The Hobbit", "The Hobbit, or There and Back Again, is a fantasy novel by J.R.R. Tolkien. It follows the journey of the hobbit Bilbo Baggins as he accompanies a group of dwarves and the wizard Gandalf on a quest to reclaim the Lonely Mountain and its treasure from the dragon Smaug. Along the way, Bilbo encounters trolls, goblins, elves, and other creatures of Middle-earth. The Hobbit is widely regarded as a classic of fantasy literature and has inspired generations of readers with its imaginative storytelling and richly detailed world."
	, 'J.R.R. Tolkien', 5, '9780618260300', '1937-09-21'),
    ("The Lord of the Rings", "The Lord of the Rings is a trilogy of epic fantasy novels by J.R.R. Tolkien. Set in the fictional world of Middle-earth, the story follows the quest to destroy the One Ring, a powerful artifact created by the dark lord Sauron. The main characters, including Frodo Baggins, Gandalf, Aragorn, and many others, must overcome numerous challenges and face the forces of darkness to save Middle-earth from Sauron's tyranny. The Lord of the Rings has had a profound impact on fantasy literature and popular culture, and is widely regarded as one of the greatest works of fiction ever written."
	, 'J.R.R. Tolkien', 5, '9780544003415', '1954-07-29'),
    ("The Catcher in the Rye", "The Catcher in the Rye is a novel by J.D. Salinger. It follows the experiences of Holden Caulfield, a young man who has been expelled from prep school and is wandering around New York City. The novel explores themes of teenage angst, alienation, and the search for identity. Despite being controversial at the time of its publication, The Catcher in the Rye has since become a classic of American literature and is widely studied in schools."
	, 'J.D. Salinger', 4, '9780316769488', '1951-07-16');



select * from books order by date;