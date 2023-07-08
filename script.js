class Book {
    constructor(title, author, noOfPages, read, image, bookID) {
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.read = read;
        this.image = image;
        this.bookID = bookID;
    }

    info() {
        let tempRead = '';
        if (this.read) {
            tempRead = "done reading";
        } else {
            tempRead = "not read yet";
        }
        return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${tempRead}`;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

// This is used to give a newly added book a unique ID.
let counter = 1;

let library = [];

const addButton = document.querySelector("#add-button");
const addTitle = document.querySelector("#title");
const addAuthor = document.querySelector("#author");
const addPages = document.querySelector("#pages");
const hasBeenRead = document.querySelector("#read");
const bookForm = document.querySelector("#my-form");
const libraryArea = document.querySelector(".libraryArea")
const imgSource = document.querySelector("#bookCover");


/* RELATED TO THE CREATION OF A BOOK OBJECT AND ADDING IT TO THE ARRAY */
function addBookToLibrary() {
    // Creates a new book object, adds it to the array of objects, and adds 1 to the counter.
    let newBook = new Book(addTitle.value, addAuthor.value, addPages.value, hasBeenRead.checked, imgSource.value, counter);
    library.push(newBook);

    counter++;

    // Empties out the library area, then re-adds all of it from the array.
    removeAllChildNodes(libraryArea);
    printBooks();

    // Closes and empties the form on adding a new book.
    closeForm();
}

// Loops through the array, creates a new card for each object.
function printBooks() {
    library.forEach(element => {
        createCard(element);
    });
}

function createCard(enteredBook) {
    // First creates a div that contains everything related to the book.
    let newBook = document.createElement('div');
    newBook.classList = "card";

    // Adds the "Title" text on top.
    let titleText = document.createElement('p');
    titleText.classList = "small-text";
    titleText.textContent = "Title";

    // Creates a container to contain the "Title" text, and the actual title.
    let titleContainer = document.createElement('div');

    // Adds the book's title under the "Title" text by getting the title from the object.
    let newTitle = document.createElement('p');
    newTitle.textContent = enteredBook.title;

    // Appends both to the container.
    titleContainer.appendChild(titleText);
    titleContainer.appendChild(newTitle);

    // Appends the container to the card.
    newBook.appendChild(titleContainer);


    // Same as title, but for the author.
    let authorText = document.createElement('p');
    authorText.classList = "small-text";
    authorText.textContent = "Author";

    let authorContainer = document.createElement('div');
    let newAuthor = document.createElement('p');
    newAuthor.textContent = enteredBook.author;

    authorContainer.appendChild(authorText);
    authorContainer.appendChild(newAuthor);

    newBook.appendChild(authorContainer);


    // Creates an image element, assigns it the class "cover", and checks that it is not null, empty and actually a link for an image.
    // If so, add the cover to the card, otherwise, leave it empty.
    let coverImage = document.createElement('img');
    coverImage.classList = "cover";

    if (enteredBook.image != null && enteredBook.image != "" && isImage(enteredBook.image)) {
        coverImage.src = enteredBook.image;
    }

    newBook.appendChild(coverImage);



    // Same as title, but for number of pages.
    let pagesText = document.createElement('p');
    pagesText.classList = "small-text";
    pagesText.textContent = "Pages";

    let pagesContainer = document.createElement('div');
    let newPages = document.createElement('p');
    newPages.textContent = enteredBook.noOfPages;

    pagesContainer.appendChild(pagesText);
    pagesContainer.appendChild(newPages);

    newBook.appendChild(pagesContainer);


    // Creates text at the bottom that says if the book is read or not, and changes the background color.
    let readText = document.createElement('p');
    readText.style.color = "white";
    readText.classList = "readText";

    let readContainer = document.createElement('div');
    if (enteredBook.read) {
        readContainer.style.backgroundColor = "green";
        readText.textContent = "Read";
    } else {
        readContainer.style.backgroundColor = "red";
        readText.textContent = "Not Read";
    }

    readContainer.style.padding = "5px";
    readContainer.appendChild(readText);
    newBook.appendChild(readContainer);



    // Creates the delete and toggle read buttons.
    let deleteButton = document.createElement('button');
    deleteButton.id = "delete-button";
    deleteButton.textContent = "Delete";

    let readButton = document.createElement('button');
    readButton.id = "read-button";
    readButton.textContent = "Toggle Read";

    // Creates a container, assigns the class button-container to it, then adds both buttons to a container.
    let buttonContainer = document.createElement('div');
    buttonContainer.classList = "button-container";

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(readButton);

    newBook.appendChild(buttonContainer);


    // Assigns the new card object the book's ID. This is used for the toggle read and delete functions.
    newBook.id = enteredBook.bookID;


    libraryArea.appendChild(newBook);
}

function deleteBook(e) {
    let bookToBeDeleted = library.find(x => x.bookID == e);
    library.splice(library.indexOf(bookToBeDeleted), 1);
}

function readBook(e) {
    let bookToBeRead = library.find(x => x.bookID == e);
    bookToBeRead.toggleRead();
}

// Checks if the URL ends with these extensions.
function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Since the buttons are created dynamically, I decided to have the listeners be through document.body.
// This also allowed me to close the form upon clicking outside of it more easily.
// This is done through getting the clicked element's id, and doing something based on that id.
document.body.addEventListener('click', function (event) {
    if (event.target.id == 'read-button') {
        // Gets the card's (book's) id.
        readBook(event.target.parentNode.parentNode.id);

        removeAllChildNodes(libraryArea);
        printBooks();
    } else if (event.target.id == 'delete-button') {
        deleteBook(event.target.parentNode.parentNode.id);

        removeAllChildNodes(libraryArea);
        printBooks();
    } else if (event.target.id == "formFocus") {
        closeForm();
    };
});

/* REALTED TO SHOWING AND HIDDING THE FORM */

const popUpForm = document.querySelector(".bookForm");
const addBookButton = document.querySelector(".addBook");
const formFocus = document.querySelector("#formFocus");

// Shows the form when the add book button is pressed.
addBookButton.addEventListener("click", function () {
    popUpForm.style.display = "block";
    formFocus.style.display = "block";
});

// Closes the form and resets it.
function closeForm() {
    bookForm.reset();

    popUpForm.style.display = "none";
    formFocus.style.display = "none";
}
