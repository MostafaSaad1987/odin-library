class Book {
    constructor(title, author, noOfPages, read, image) {
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.read = read;
        this.image = image;
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


Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

let library = [];

const addButton = document.querySelector("#add-button");
const addTitle = document.querySelector("#title");
const addAuthor = document.querySelector("#author");
const addPages = document.querySelector("#pages");
const hasBeenRead = document.querySelector("#read");
const bookForm = document.querySelector("#my-form");
const libraryArea = document.querySelector(".libraryArea")

const imgSource = document.querySelector("#bookCover");

function addBookToLibrary() {
    let newBook = new Book(addTitle.value, addAuthor.value, addPages.value, hasBeenRead.checked, imgSource.value);
    library.push(newBook);

    removeAllChildNodes(libraryArea);
    printBooks();

    bookForm.reset();
}

function printBooks() {
    library.forEach(element => {
        createCard(element);
    });
}

function createCard(enteredBook) {
    let newBook = document.createElement('div');
    newBook.classList = "card";

    let titleText = document.createElement('p');
    titleText.classList = "small-text";
    titleText.textContent = "Title";

    let titleContainer = document.createElement('div');
    let newTitle = document.createElement('p');
    newTitle.textContent = enteredBook.title;

    titleContainer.appendChild(titleText);
    titleContainer.appendChild(newTitle);

    newBook.appendChild(titleContainer);



    let authorText = document.createElement('p');
    authorText.classList = "small-text";
    authorText.textContent = "Author";

    let authorContainer = document.createElement('div');
    let newAuthor = document.createElement('p');
    newAuthor.textContent = enteredBook.author;

    authorContainer.appendChild(authorText);
    authorContainer.appendChild(newAuthor);

    newBook.appendChild(authorContainer);



    let coverImage = document.createElement('img');
    coverImage.classList = "cover";

    if (enteredBook.image == null || enteredBook.image == "" || !isImage(enteredBook.image)) {
        coverImage.src = "placeholder.png";
        coverImage.style.opacity = "0";
    } else {
        coverImage.src = enteredBook.image;
    }

    newBook.appendChild(coverImage);




    let pagesText = document.createElement('p');
    pagesText.classList = "small-text";
    pagesText.textContent = "Pages";

    let pagesContainer = document.createElement('div');
    let newPages = document.createElement('p');
    newPages.textContent = enteredBook.noOfPages;

    pagesContainer.appendChild(pagesText);
    pagesContainer.appendChild(newPages);

    newBook.appendChild(pagesContainer);



    let readText = document.createElement('p');
    readText.textContent = "Read";
    readText.style.color = "white";

    let readContainer = document.createElement('div');
    if (enteredBook.read) {
        readContainer.style.backgroundColor = "green";
    } else {
        readContainer.style.backgroundColor = "red";
    }

    readContainer.appendChild(readText);
    newBook.appendChild(readContainer);



    libraryArea.appendChild(newBook);
}

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*
Add a “NEW BOOK” button that brings up a form allowing users to input the details for
the new book: author, title, number of pages, whether it’s been read and anything else
you might want.

Add a button on each book’s display to remove the book from the library.

You will need to associate your DOM elements with the actual book objects in some way.
One easy solution is giving them a data-attribute that corresponds to the index of the library array.

Add a button on each book’s display to change its read status.
*/