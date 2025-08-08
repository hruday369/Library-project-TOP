const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype function to toggle read status
Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
};

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Function to remove a book from the library
function removeBook(bookId) {
  const bookIndex = myLibrary.findIndex(book => book.id === bookId);
  if (bookIndex > -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks(); // Re-render the display
  }
}

function displayBooks() {
  let displaybook = document.querySelector("#displaybook");
  displaybook.innerHTML = '';
  myLibrary.forEach((book) => {
    const cardhtml = `
      <div class="book-card" data-book-id="${book.id}">
        <h1>${book.title}</h1>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <button class="toggle-read-btn">${book.read ? 'Read' : 'Unread'}</button>
        <button class="remove-btn">Remove</button>
      </div>`;

    const tempdiv = document.createElement('div');
    tempdiv.innerHTML = cardhtml;
    const bookcard = tempdiv.firstElementChild;
    displaybook.appendChild(bookcard);
  });

  // Attach event listeners to the dynamically created buttons
  attachButtonListeners();
}

function attachButtonListeners() {
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const bookId = event.target.closest('.book-card').dataset.bookId;
      removeBook(bookId);
    });
  });

  document.querySelectorAll('.toggle-read-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const bookId = event.target.closest('.book-card').dataset.bookId;
      const book = myLibrary.find(b => b.id === bookId);
      if (book) {
        book.toggleReadStatus();
        displayBooks();
      }
    });
  });
}

// --- Your existing code remains unchanged below this line ---

const dialog = document.querySelector("dialog");
const addbook = document.querySelector("#addBook");
const addlibrary = document.querySelector("#addtoLibrary");
const closedialog = document.querySelector("#close");

addbook.addEventListener('click', () => {
  dialog.showModal();
});

closedialog.addEventListener('click', () => {
  dialog.close();
});

addlibrary.addEventListener('click', (event) => {
  event.preventDefault();

  const booktitle = document.querySelector("#title").value;
  const authorname = document.querySelector("#name").value;
  const noofpages = document.querySelector("#pages").value;
  const bookread = document.querySelector("#read").checked;

  if (authorname === '') {
    alert('Please enter the author name.');
    return;
  }
  if (booktitle === '') {
    alert('Please enter the title of the book.');
    return;
  }
  if (noofpages === '' || parseInt(noofpages) <= 0 || isNaN(noofpages)) {
    alert('Please enter the number of pages (Greater than 0).');
    return;
  }

  addBookToLibrary(booktitle, authorname, noofpages, bookread);
  dialog.close();
});