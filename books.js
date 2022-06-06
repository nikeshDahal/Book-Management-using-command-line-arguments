const { resolveCaa } = require("dns");
const fs = require("fs");
// const { get } = require('http')
const process = require("process");

const addBook = (name, author, genre) => {
  const addBookPromise = new Promise(function (resolve, reject) {
    const books = loadBooks(genre);
    if (books.length == 0) {
      console.log("Adding new genre");
    }
    const duplicateBook = books.find((book) => book.name == name);
    if (!duplicateBook) {
      resolve(books);
    } else {
      reject(error);
    }
  })
    .then((books) => {
      books.push({
        name: name,
        author: author,
        genre: genre,
      });
      savebooks(books, genre);
      console.log("New book added!");
    })
    .catch((error) => {
      console.log("book already taken");
    });
};

const getBookByName = (name) => {
  const getBookPromise = new Promise((resolve, reject) => {
    const allBooks = loadAllBooks();
    console.log("Getting the matched book name from all genres");
    let bookFound = false;
    allBooks.forEach((books) => {
      const book = books.find((book) => book.name === name);
      if (book) {
        bookFound = true;
        resolve(book);
      }
    });
    if (!bookFound) {
      reject(error);
    }
  });
  getBookPromise
    .then((book) => {
      console.log("book found", book);
    })
    .catch((error) => {
      console.log("book not found", error);
    });
};

const getAllBook = () => {
  const getAllBookPromise = new Promise(function (resolve, reject) {
    let books = loadAllBooks();
    resolve(books);
  });
  getAllBookPromise
    .then((books) => {
      console.log("book found", books);
    })
    .catch((error) => {
      console.log("could not get all books", error);
    });
};

const updateBookByName = (name, genre, newName) => {
  const updateBookPromise = new Promise((resolve, reject) => {
    const books = loadBooks(genre);
    const updatedBooks = [];
    let bookFound = false;
    books.forEach((tempBook) => {
      if (tempBook.name === name) {
        tempBook.name = newName;
        bookFound = true;
        updatedBooks.push(tempBook);
      }
    });
    if (bookFound) {
      resolve(updatedBooks);

      // savebooks(updatedBooks,genre)
      // console.log('books updated')
      // // process.chdir('..')
      // getAllBook()
    } else {
      reject(err);
    }
  })
    .then((updatedBooks) => {
      savebooks(updatedBooks, genre);
      console.log("books updated");
      getAllBook();
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteBookByName = (name, genre) => {
  const deleteBookPromise = new Promise(function (resolve, reject) {
    const books = loadBooks(genre);
    const tempBooks = [];
    let bookFound = false;
    books.forEach((tempBook) => {
      if (tempBook.name !== name) {
        tempBooks.push(tempBook);
      } else {
        bookFound = true;
      }
    });
    if (bookFound) {
      resolve(tempBooks);
    } else {
      console.log("Book not found");
    }
  });
  deleteBookPromise
    .then((tempBooks) => {
      savebooks(tempBooks, genre);
      console.log(`Removed book = ${name} and updated book list is: `);
      getAllBook();
    })
    .catch((error) => {
      console.log("book not found", error);
    });
};

const savebooks = (books, genre) => {
  const dataJSON = JSON.stringify(books);
  fs.writeFileSync(`./books/${genre}.json`, dataJSON);
};

const loadBooks = (genre) => {
  try {
    const dataBuffer = fs.readFileSync(`./books/${genre}.json`);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    console.log("Genre not found", err);
    return [];
  }
};

const loadAllBooks = () => {
  const arrayOfFiles = fs.readdirSync("./books");
  let booksArray = [];
  arrayOfFiles.forEach((fileName) => {
    fileName = fileName.split(".")[0];
    booksArray.push(loadBooks(fileName));
  });
  return booksArray;
  // console.log('booksArray',booksArray)
};

module.exports = {
  addBook: addBook,
  getBookByName: getBookByName,
  getAllBook: getAllBook,
  updateBookByName: updateBookByName,
  deleteBookByName: deleteBookByName,
};
