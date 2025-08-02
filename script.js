const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Unique ID for each book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
// Function to add a new book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks(); // Refresh the display after adding a new book
}
function displayBooks(){
  let displaybook = document.querySelector("#displaybook");
  displaybook.innerHTML='';
  myLibrary.forEach((book) =>{
    const cardhtml = `
              <div>
            <h1>${book.title}</h1>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <button id="readbtn">${book.read}</button>
             </div>`;
    const tempdiv = document.createElement('div');
    tempdiv.innerHTML = cardhtml;
    const bookcard = tempdiv.firstElementChild;
    displaybook.appendChild(bookcard);
  });

}
const dialog = document.querySelector("dialog");
const addbook = document.querySelector("#addBook");
const addlibrary = document.querySelector("#addtoLibrary");
const closedialog = document.querySelector("#close");


addbook.addEventListener('click',() =>{
  dialog.showModal();
});

closedialog.addEventListener('click',() =>{
  dialog.close();
});

addlibrary.addEventListener('click',(event) =>{
  event.preventDefault();

  const booktitle = document.querySelector("#title").value;
  const authorname = document.querySelector("#name").value;
  const noofpages = document.querySelector("#pages").value;
  const bookread = document.querySelector("#read").checked;
  
  // empty field inputs.
  if(authorname === ''){
    alert('please enter the anthor name.');
    return;
  }
  if(booktitle === ''){
    alert('please enter title of the book.');
    return;
  }
  if(noofpages === '' || parseInt(noofpages) <= 0 || isNaN(noofpages)){
    alert('please enter No of pages (Greater than 0).');
    return;
  }
  
  addBookToLibrary(booktitle,authorname,noofpages,bookread);
  dialog.close();


});
