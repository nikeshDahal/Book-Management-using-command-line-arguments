const fs = require('fs')
const process = require('process')


const addBook = (name,author,genre) => {
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
    
    process.chdir('./books')
    const books = loadBooks(genre)
        const duplicateBook = books.find((book) => book.name === name)
    
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

const savebooks = (books,genre) => {
    const dataJSON = JSON.stringify(books)
    fs.writeFileSync(`${genre}.json`, dataJSON)
}

const loadBooks = (genre) => {
    try {
        const dataBuffer = fs.readFileSync(`${genre}.json`)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}


module.exports = {
    addBook:addBook
}