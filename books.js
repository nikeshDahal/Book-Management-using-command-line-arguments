const fs = require('fs')
// const process = require('process')
const bookController = {}
const chalk = require('chalk')


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
        console.log(chalk.green.inverse('Adding new genre'))
    }
    const duplicateBook = books.find((book) => book.name == name)

    if (!duplicateBook) {
        books.push({
            name: name,
            author: author,
            genre:genre
        })
        saveBooks(books,genre)
        console.log(chalk.green.inverse('New book added!'))
    } else {
        console.log(chalk.red.inverse('Book name taken!'))
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
    console.log(chalk.green.inverse('Getting the matched book name from all genres'))
    let bookFound = false
    allBooks.forEach(books => {
        const book = books.find((book) => book.name === name)
        if(book){
        console.log(book)
        bookFound = true
        }
    })
    if (!bookFound){
        console.log(chalk.red.inverse('No matching book name'))
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
    console.log(chalk.green.inverse('All books'), loadAllBooks());
}

bookController.updateBookByName = (name,genre,newName) => {
    // process.chdir('./books')
    const books = loadBooks(genre)
    const updatedBooks = []
    let bookFound = false
 
    let sameBookFound = books.find(tempBook => tempBook.name == newName)
    if(!sameBookFound){
        books.forEach(tempBook => {
            if(tempBook.name === name) {
                tempBook.name = newName
                bookFound = true
            }
              updatedBooks.push(tempBook)
        })
        if(bookFound) {
            saveBooks(updatedBooks,genre)
            // process.chdir('..')
            bookController.getAllBook()
        } else {
            console.log(chalk.red.inverse("Book not found"))
        }
    }else{
        console.log(chalk.red.inverse("The new name of the book is already taken."))
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
        saveBooks(tempBooks,genre)
        console.log(chalk.green.inverse(`Removed book = ${name} and updated book list is `))
        bookController.getAllBook()
    } else {
        console.log(chalk.red.inverse("Book not found"))
    }
 
}

bookController.search = (name) => {
    
    const allBooks = loadAllBooks()
    console.log(chalk.green.inverse('Getting the matched book name from all genres'))
    let bookFound = false
    for(books of allBooks){
        const book = books.find((book) => book.name === name)
        if(book){
            bookFound = true
            console.log(book)
            break
        }
    }
    if (!bookFound){
        console.log(chalk.red.inverse('No matching book name'))
    }
}

const saveBooks = (books,genre) => {
    const dataJSON = JSON.stringify(books)
    fs.writeFileSync(`./books/${genre}.json`, dataJSON)
}

const loadBooks = (genre) => {
    try {
        const dataBuffer = fs.readFileSync(`./books/${genre}.json`)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (err) {
        console.log(chalk.red.inverse('Genre not found'),err)
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
