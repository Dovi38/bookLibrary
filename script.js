//All of your book objects are going to be stored in a simple array,
let myLibrary = [];
let idCounter = 0;

//that can take user’s input and store the new book objects into an array. Your code should look something like this:
const generateId = () => {
  idCounter = idCounter + 1;
  return idCounter;
};
//object constructor
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

//variables from Dom
const modal = document.getElementById("modal");
const form = document.querySelector(".form");
const addBookBtn = document.querySelector(".add-btn");
const submitBtn = document.querySelector(".form-btn");
const checkBoxes = document.querySelectorAll("input[name='book']");
const library = document.querySelector(".cards-grid");

//everything related to form after button 'add book' is pressed
//show or hide form clicking outside form
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

//click one of checkboxes on a form
//looping through node list of checkbox
for (let i = 0; i < checkBoxes.length; i++) {
  checkBoxes[i].addEventListener("change", () => {
    //on clicked checkbox adds tick
    checkBoxes[i].style.visibility = "visible";
    //ticked box value
    let tickedBox = checkBoxes[i].value;
    //console.log(tickedBox);

    if (tickedBox === "read") {
      tickedBox.checked = true;
      checkBoxes[1].checked = false;
    } else if (tickedBox === "unread") {
      tickedBox.checked = true;
      checkBoxes[0].checked = false;
    } else {
      checkBoxes[i].checked = false;
    }
  });
}

const bookStatus = () => {
  let status = "";
  checkBoxes.forEach((box) => {
    if (box.checked === true) {
      status = box.value;
    }
  });
  return status;
};
//functions to manipulate books in the library
const addBookToLibrary = (book) => myLibrary.push(book);

const createBook = () => {
  //take all data from form
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#number").value;
  let status1 = bookStatus(); //.toUpperCase();

  let newBook = new Book(title, author, pages, status1);

  console.log(newBook);
  //adds book to array
  addBookToLibrary(newBook);
  updateLibrary();
  modal.style.visibility = "hidden";
  //console.log(document.querySelectorAll(".change"));
};
const removeBook = (index) => {
  myLibrary.splice(index, 1);
};

const updateLibrary = () => {
  library.innerHTML = "";
  //book info taken from array object
  for (let book of myLibrary) {
    library.innerHTML += book.cardHtml();

    const deleteBtn = document.querySelector(".remove");
    deleteBtn.addEventListener("click", deleteBook);
    //btnEdit();
    console.log(book.status1);
    console.log(btnEdit());
  }
};
//need to change status in myLibrary after textContent been changed
const makeBook = () => {
  for (let key in myLibrary) {
    console.log(key);
    console.log(myLibrary[key].status1);
  }
};

const deleteBook = (newBook) => {
  let index = myLibrary.indexOf(newBook);
  let newArr = myLibrary.splice(index, 1);
  updateLibrary(newArr);
};
//edit button function.Need to update status in myLibrary as well
const btnEdit = () => {
  const editBtn = document.querySelectorAll(".change");
  let editMe = "";
  for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener("click", () => {
      editMe = editBtn[i].textContent;
      console.log(editBtn[i].textContent);
      if (editMe === "unread") {
        //editBtn[i].textContent = "read";
        editMe = "read";
        editBtn[i].style.backgroundColor = "pink";
        editBtn[i].textContent = editMe;
        console.log(editBtn[i].textContent);
        console.log(editMe);
      } else {
        editBtn[i].textContent === "read";
      }
    });
  }
  return editMe;
};
//form submit event adds validation from browser.button inside form automatically is treated as submit button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createBook();
  console.log(myLibrary);
});
//loop through array and add to html book
//const cardVisible = newBook.cardHtml();
//const div = document.createElement("div");
//div.innerHTML = cardVisible;
//library.appendChild(div);
//library.append(newBook.cardHtml());
//add book to html
////////
//library.innerHTML = "";
//library.innerHTML += newBook.cardHtml();
