//variables from Dom
const modal = document.getElementById("modal");
const form = document.querySelector(".form");
const addBookBtn = document.querySelector(".add-btn");
const submitBtn = document.querySelector(".form-btn");
const checkBoxes = document.querySelectorAll("input[name='book']");
const library = document.querySelector(".cards-grid");

//All of your book objects are stored in myLibrary array
let myLibrary = [];

//id counter set point
let idCounter = 0;

//book class
class Book {
  constructor(title, author, pages, status1) {
    (this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.status1 = status1);
    this.id = generateId();
  }

  cardHtml() {
    const card = `
    <div id=${this.id} class="card">
    <h5 class='text'>"${this.title}"</h5>
    <p class='text'>By: ${this.author}</p>
    <p class='text'>Pages: ${this.pages}</p>
    <button class='change'>${this.status1}</button>
    <button class='remove'>Delete</button>
    </div>`;
    return card;
  }
}
//generates id for every new book
const generateId = () => {
  if (myLibrary.length === 0) {
    idCounter = 0;
  }
  idCounter = idCounter + 1;
  return idCounter;
};
//makes Status string first letter capital
const firstLetterCapital = (status) => {
  return status[0].toUpperCase() + status.slice(1);
};
//status of book(loops through checkboxes)
const bookStatus = () => {
  let status = "";
  checkBoxes.forEach((box) => {
    if (box.checked === true) {
      status = box.value;
    }
  });
  return firstLetterCapital(status);
};
//takes user’s input and store the new book objects into an array.
const addBookToLibrary = (item) => myLibrary.push(item);

//take all data from form
const createBook = () => {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#number").value;
  let status1 = bookStatus();

  let newBook = new Book(title, author, pages, status1);
  //console.log(newBook);
  addBookToLibrary(newBook);

  modal.style.visibility = "hidden";
};
//loops through the array and displays each book on the page.
const displayBook = () => {
  //adds just one book at the time, not repeating previous book.
  library.innerHTML = "";
  for (let book of myLibrary) {
    library.innerHTML += book.cardHtml();
    editButtonClicked();
    deleteButtonClicked();
  }
};
//two functions added to one.
const createDisplayBook = () => {
  createBook();
  displayBook();
};
//“NEW BOOK” button that brings up a form allowing users to input the details for the new book
const formVisible = () => {
  form.reset();
  modal.style.visibility = "visible";
};
addBookBtn.addEventListener("click", formVisible);

const formHidden = (e) => {
  if (e.target === modal) {
    modal.style.visibility = "hidden";
  }
};
window.addEventListener("click", formHidden);

//form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createDisplayBook();
});

//remove book from the library with delete button
const removeBook = (cardId) => {
  let bookId = myLibrary.findIndex((book) => book.id === cardId);
  myLibrary.splice(bookId, 1);
  //console.log(myLibrary);
  displayBook();
};
const deleteButtonClicked = () => {
  const deleteButtons = document.querySelectorAll(".remove");
  for (const deleteBtn of deleteButtons) {
    let cardId = parseInt(deleteBtn.parentElement.getAttribute("id"));

    deleteBtn.addEventListener("click", () => {
      removeBook(cardId);
    });
  }
};
//change book status from unread to read
const editBookStatus = (cardId) => {
  const editStatusIndex = myLibrary.findIndex((book) => book.id === cardId);
  //console.log(myLibrary[editStatusIndex].status1);
  if (myLibrary[editStatusIndex].status1 === "Unread") {
    myLibrary[editStatusIndex].status1 = "Read";
    displayBook();
  }
};

const editButtonClicked = () => {
  const editButtons = document.querySelectorAll(".change");
  for (const editBtn of editButtons) {
    let cardId = parseInt(editBtn.parentElement.getAttribute("id"));
    //console.log(cardId);
    editBtn.addEventListener("click", () => {
      editBookStatus(cardId);
    });
  }
};
