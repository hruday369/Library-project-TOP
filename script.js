const myLibrary = [];

function Book(name,title,pages) {
  this.name=name;
  this.title=title;
  this.pages=pages;
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
  const book = new Book('C','james',245);
  myLibrary.push(book);
}
