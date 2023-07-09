class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

    list.appendChild(row);
  }
  clearList() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  showAlert(message, className) {
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    const div = document.createElement("div");

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    container.insertBefore(div, form);

    setTimeout(() => {
      container.removeChild(div);
    }, 3000);
  }
  removeBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooks() {
    const books = JSON.parse(localStorage.getItem("books"));

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, idx) => {
      console.log(book, book.isbn);
      if (book.isbn === isbn) {
        books.splice(idx, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }

  static displayBook() {
    const books = Store.getBooks();
    books.forEach((book) => {
      const ui = new UI();

      ui.addBookToList(book);
    });
  }
}

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
    ui.addBookToList(book);

    Store.addBook(book);
    ui.showAlert("Book added", "success");
    ui.clearList();
  }
});

document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();

  const ui = new UI();
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.removeBook(e.target);
  ui.showAlert("Book removed", "success");
});

document.addEventListener("DOMContentLoaded", () => {
  Store.displayBook();
});
