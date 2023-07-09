// constructor for Book

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

UI.prototype.clearList = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function (message, className) {
  const container = document.querySelector(".container");
  const form = document.getElementById("book-form");
  const div = document.createElement("div");

  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  container.insertBefore(div, form);

  setTimeout(() => {
    container.removeChild(div);
  }, 3000);
};

UI.prototype.removeBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Form Submit
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if ((title === "") | (author === "") | (isbn === "")) {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.showAlert("Book added", "success");
    ui.addBookToList(book);
    ui.addBooks(book);
    ui.clearList();
  }
});

document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();

  const ui = new UI();
  ui.removeBook(e.target);
  ui.showAlert("Book removed", "success");
});
