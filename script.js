class Book {
    constructor(title, author, noOfPages, read, image, bookID) {
        this.title = title;
        this.author = author;
        this.noOfPages = noOfPages;
        this.read = read;
        this.image = image;
        this.bookID = bookID;
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

function addBookToLibrary() {
    let newBook = new Book(addTitle.value, addAuthor.value, addPages.value, hasBeenRead.checked, imgSource.value, counter);
    library.push(newBook);

    counter++;

    removeAllChildNodes(libraryArea);
    printBooks();

    closeForm();
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

    if (enteredBook.image != null && enteredBook.image != "" && isImage(enteredBook.image)) {
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



    let deleteButton = document.createElement('button');
    deleteButton.id = "delete-button";
    deleteButton.textContent = "Delete";

    let readButton = document.createElement('button');
    readButton.id = "read-button";
    readButton.textContent = "Toggle Read";

    let buttonContainer = document.createElement('div');
    buttonContainer.classList = "button-container";

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(readButton);

    newBook.appendChild(buttonContainer);


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

function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.body.addEventListener('click', function (event) {
    if (event.target.id == 'read-button') {
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

const popUpForm = document.querySelector(".bookForm");
const addBookButton = document.querySelector(".addBook");
const formFocus = document.querySelector("#formFocus");

addBookButton.addEventListener("click", function () {
    popUpForm.style.display = "block";
    formFocus.style.display = "block";
});

function closeForm() {
    bookForm.reset();

    popUpForm.style.display = "none";
    formFocus.style.display = "none";
}
