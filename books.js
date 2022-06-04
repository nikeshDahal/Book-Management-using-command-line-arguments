const fs = require('fs')
// const { get } = require('http')
const process = require('process')
const bookController = {}


bookController.addBook = (name,author,genre) => {
    fs.access('./books', error => {
        if(error){
            fs.mkdir("./books", err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("New directory successfully created.")
                }
            })
        }
    
    // process.chdir('./books')
    const books = loadBooks(genre)
    if(books.length == 0) {
        console.log('Adding new genre')
    }
    const duplicateBook = books.find((book) => book.name == name)

    if (!duplicateBook) {
        books.push({
            name: name,
            author: author,
            genre:genre
        })
        savebooks(books,genre)
        console.log('New book added!')
    } else {
        console.log('Book name taken!')
    }
})
}

// const getBookByName = (name,genre) => {
//     // process.chdir('./books')
//     const books = loadBooks(genre)
//     const book = books.find((book) => book.name === name)
    
//     if (book) {
//         console.log(`Book`,book)
//     } else {
//         console.log('book not found!')
//     }
// }

bookController.getBookByName = (name) => {
    
    const allBooks = loadAllBooks()
    console.log('Getting the matched book name from all genres')
    let bookFound = false
    allBooks.forEach(books => {
        const book = books.find((book) => book.name === name)
        if(book){
        console.log(book)
        bookFound = true
        }
    })
    if (!bookFound){
        console.log('No matching book name')
    }
  
}

bookController.getAllBook = () => {
    
    // const arrayOfFiles = fs.readdirSync("./books")
    // let books
    // arrayOfFiles.forEach(fileName => {
    //     fileName =fileName.split('.')[0]
    //     books = loadBooks(fileName)
    //     console.log(books)

    // });
    console.log('All books', loadAllBooks());
}

bookController.updateBookByName = (name,genre,newName) => {
    // process.chdir('./books')
    const books = loadBooks(genre)
    const updatedBooks = []
    let bookFound = false
    books.forEach(tempBook => {
        if(tempBook.name === name) {
            tempBook.name = newName
            bookFound = true
        }
          updatedBooks.push(tempBook)
    })
    if(bookFound) {
        savebooks(updatedBooks,genre)
        // process.chdir('..')
        getAllBook()
    } else {
        console.log("Book not found")
    }
 
}

bookController.deleteBookByName = (name,genre) => {
    const books = loadBooks(genre)
    const tempBooks = []
    let bookFound = false
    books.forEach(tempBook => {
        if(tempBook.name !== name) {
           tempBooks.push(tempBook)
        } else {
            bookFound = true
        }
    })
    if(bookFound) {
        savebooks(tempBooks,genre)
        console.log(`Removed book = ${name} and updated book list is `)
        getAllBook()
    } else {
        console.log("Book not found")
    }
 
}

const savebooks = (books,genre) => {
    const dataJSON = JSON.stringify(books)
    fs.writeFileSync(`./books/${genre}.json`, dataJSON)
}

const loadBooks = (genre) => {
    try {
        const dataBuffer = fs.readFileSync(`./books/${genre}.json`)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (err) {
        console.log('Genre not found',err)
        return []
    }
}

const loadAllBooks = () => {
    const arrayOfFiles = fs.readdirSync("./books")
    let booksArray = []
    arrayOfFiles.forEach(fileName => {
        fileName = fileName.split('.')[0]
        booksArray.push(loadBooks(fileName))
    });
    return booksArray
    // console.log('booksArray',booksArray)

}


module.exports = bookController
