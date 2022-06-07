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

const getAllBook = async () => {
  let start = new Date().getTime();
  try {
    let books = await loadAllBooks();
    console.log("book found", books);
  } catch (error) {
    console.log("could not get all books", error);
  }
  let end = new Date().getTime();
  console.log("getAllBook => ", (end - start) / 1000, " seconds");
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
  let start = new Date().getTime();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(`./books/${genre}.json`, (err, dataBuffer) => {
        if (err) reject(err);
        const dataJSON = dataBuffer.toString();
        let end = new Date().getTime();
        console.log("loadBooks => ", (end - start) / 1000, " seconds");
        return resolve(JSON.parse(dataJSON));
      });
    }, 5000);
  });
};

const loadAllBooks = async () => {
  let start = new Date().getTime();

  const arrayOfFiles = fs.readdirSync("./books");
  let booksArray = [];
  /* for (let fileName of arrayOfFiles) {
    fileName = fileName.split(".")[0];
    booksArray.push(...(await loadBooks(fileName)));
  } */
  const results = await Promise.all(
    arrayOfFiles.map((fileName) => loadBooks(fileName.split(".")[0]))
  );
  for (let books of results) booksArray = booksArray.concat(books);

  let end = new Date().getTime();
  console.log("loadAllBooks => ", (end - start) / 1000, " seconds");
  return booksArray;
};

module.exports = {
  addBook: addBook,
  getBookByName: getBookByName,
  getAllBook: getAllBook,
  updateBookByName: updateBookByName,
  deleteBookByName: deleteBookByName,
};
