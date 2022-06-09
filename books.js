const { resolveCaa } = require("dns");
const fs = require("fs");
// const { get } = require('http')
const process = require("process");

const addBook = async (name, author, genre) => {
    const books = await loadBooks(genre);
    if (books.length == 0) {
      console.log("Adding new genre");
    }
    const duplicateBook = books.find((book) => book.name == name)
    if (!duplicateBook) {
        books.push({
            name: name,
            author: author,
            genre:genre
        })
        savebooks(books,genre)
        console.log('New book added!');
        console.log(`Books of ${genre} are : `,books);
    } else {
        console.log('Book name taken!');
    }
};
//updated get book by name
const getBookByName = async (name) => {
    let start = new Date().getTime();
    try {
      let allBooks =await loadAllBooks();
      console.log("Getting the matched book name from all genres");
      let isBookFound = false;
       allBooks.forEach((books) => {
        const foundBook = (books.name === name);
        if (foundBook) {
          isBookFound = true;
          console.log(foundBook)
          console.log("book found", books);
        }
      });
        if (!isBookFound) {
          console.log("book not found", error);
        }
    } catch (error) {
      console.log('failed to get books by name')
    }
    let end = new Date().getTime();
    console.log("getBookByName => ", (end - start) / 1000, " seconds");
};
//updated get all book
const getAllBook = async () => {
  let start = new Date().getTime();
  try {
    let books = await loadAllBooks();
    console.log("Total list of books are :", books);
  } catch (error) {
    console.log("could not get all books", error);
  }
  let end = new Date().getTime();
  console.log("getAllBook => ", (end - start) / 1000, " seconds");
};

const updateBookByName =async (name, genre, newName) => {
  try {
    const books = await loadBooks(genre);//loads the particular file
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
      savebooks(updatedBooks, genre);
      console.log("books updated");
      getAllBook();
    }else{
      throw new Error();
    }
  } catch (error) {
    console.log('failed in updating book. book not found');    
  }
}

const deleteBookByName = async (name, genre) => {
  try {
    const books = await loadBooks(genre);
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
      savebooks(tempBooks, genre);
      console.log(`Removed book = ${name} and updated book list is: `);
      getAllBook();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log('failed to delete book. book name not found')
  }
};

const savebooks = (books, genre) => {
  const dataJSON = JSON.stringify(books);
  fs.writeFileSync(`./books/${genre}.json`, dataJSON);
};

const loadBooks = (genre) => {
    // let start = new Date().getTime();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fs.readFile(`./books/${genre}.json`, (err, dataBuffer) => {
          if (err) {
            return resolve([])
          }
          const dataJSON = dataBuffer.toString();
          // let end = new Date().getTime();
          // console.log("loadBooks => ", (end - start) / 1000, " seconds");
          return resolve(JSON.parse(dataJSON));
        });
      }, 2000);
    }); 
};

const loadAllBooks = async () => {
  // let start = new Date().getTime();
  const arrayOfFiles = fs.readdirSync("./books");
  // console.log('array of files',arrayOfFiles)
  let booksArray = [];
  //  for (let fileName of arrayOfFiles) {
  //   fileName = fileName.split(".")[0];
  //   booksArray.push(...(await loadBooks(fileName)));
  // } 
  const results = await Promise.all(
    arrayOfFiles.map((fileName) => loadBooks(fileName.split(".")[0]))
  );
  for (let books of results) booksArray = booksArray.concat(books);
  // let end = new Date().getTime();
  // console.log("loadAllBooks => ", (end - start) / 1000, " seconds");
  return booksArray;
};


module.exports = {
  addBook: addBook,
  getBookByName: getBookByName,
  getAllBook: getAllBook,
  updateBookByName: updateBookByName,
  deleteBookByName: deleteBookByName,
};


