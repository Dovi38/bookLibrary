//variables from Dom
const modal = document.getElementById("modal");
const form = document.querySelector(".form");
const addBookBtn = document.querySelector(".add-btn");
const submitBtn = document.querySelector(".form-btn");
const checkBoxes = document.querySelectorAll("input[name='book']");
const library = document.querySelector(".cards-grid");

//All of your book objects are going to be stored in a simple array
let myLibrary = [];
let idCounter = 0;

class Book {
  constructor(title, author, pages, status1) {
    //idCounter = idCounter + 1;
    //this.id = idCounter;
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
const generateId = () => {
  if (myLibrary.length === 0) {
    idCounter = 0;
  }
  idCounter = idCounter + 1;
  return idCounter;
};
//status of book(loop through checkboxes)
const bookStatus = () => {
  let status = "";
  checkBoxes.forEach((box) => {
    if (box.checked === true) {
      status = box.value;
    }
  });
  return status;
};
//function to the script (not the constructor) that can take user’s input and store the new book objects into an array.
const addBookToLibrary = (item) => myLibrary.push(item);
const createBook = () => {
  //take all data from form
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#number").value;
  let status1 = bookStatus(); //.toUpperCase();

  let newBook = new Book(title, author, pages, status1);
  console.log(newBook);
  addBookToLibrary(newBook);

  modal.style.visibility = "hidden";
};
//Write a function that loops through the array and displays each book on the page.
const displayBook = () => {
  library.innerHTML = ""; //because of it adds just one book at the time non repeating previous book.
  for (let book of myLibrary) {
    library.innerHTML += book.cardHtml();
    //console.log(library);
    addEventListenerOnButtons();
  }
};
const createDisplayBook = () => {
  createBook();
  displayBook();
};
//Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.
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
  console.log(myLibrary);
});
//remove book from the library with button
const removeBook = (cardId) => {
  let bookId = myLibrary.findIndex((book) => book.id === cardId);
  myLibrary.splice(bookId, 1);
  console.log(myLibrary);

  displayBook();
};
const addEventListenerOnButtons = () => {
  const delButtons = document.querySelectorAll(".remove");
  for (const delButton of delButtons) {
    let cardId = parseInt(delButton.parentElement.getAttribute("id"));

    delButton.addEventListener("click", () => {
      removeBook(cardId);
    });
  }
};
//function onLoad

/*const removeBook = () => {
  console.log("im deleting");
  const deleteBtn = document.querySelectorAll(".remove");
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", () => {
      let cardId = parseInt(deleteBtn[i].parentElement.getAttribute("id"));
      console.log(cardId);
      for (let book of myLibrary) {
        console.log(book.id);
        if (book.id === cardId) {
          console.log(myLibrary);
          const bookId = myLibrary.findIndex((item) => item.id === cardId);
          myLibrary.splice(bookId, 1);
          console.log(myLibrary);
          displayBook();
        }
      }
    });
  }
};*/
//displayBook();
