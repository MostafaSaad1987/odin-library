class Book {
    constructor(title, author, noOfPages, read) {
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.read = read;
    }
}

Book.prototype.info = function () {
    let tempRead = '';
    if (this.read) {
        tempRead = "done reading";
    } else {
        tempRead = "not read yet";
    }
    return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${tempRead}`;
}

let library = [];

const addButton = document.querySelector("#add-button");
const addTitle = document.querySelector("#title");
const addAuthor = document.querySelector("#author");
const addPages = document.querySelector("#pages");
const hasBeenRead = document.querySelector("#read");
const bookForm = document.querySelector("#my-form");

function addBookToLibrary() {

    let newBook = new Book(addTitle.value, addAuthor.value, addPages.value, hasBeenRead.checked);
    library.push(newBook);

    printBooks();

    bookForm.reset();
}

function printBooks() {
    console.clear();

    library.forEach(element => {
        console.log(element.info());
    });
}

function createCard() {
    
}

/*
Write a function that loops through the array and displays each book on the page.
You can display them in some sort of table, or each on their own “card”.
It might help for now to manually add a few books to your array so you can see the display.


Add a “NEW BOOK” button that brings up a form allowing users to input the details for
the new book: author, title, number of pages, whether it’s been read and anything else
you might want. You will most likely encounter an issue where submitting your
form will not do what you expect it to do. That’s because the submit input tries
to send the data to a server by default. If you’ve done the bonus section for the
calculator assignment, you might be familiar with event.preventDefault();.
Read up on the event.preventDefault documentation again and see how you can solve this issue!

Add a button on each book’s display to remove the book from the library.

You will need to associate your DOM elements with the actual book objects in some way.
One easy solution is giving them a data-attribute that corresponds to the index of the library array.

Add a button on each book’s display to change its read status.

To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.

NOTE: You’re not required to add any type of storage right now. You will have the option to come back to this project later on in the course.

*/