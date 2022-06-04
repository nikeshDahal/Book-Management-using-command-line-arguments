const yargs= require('yargs')

// const readline = require("readline");
const books = require('./books.js')

console.log("welcome to Book Management");
console.log("select your options ....");
console.log(
  " 1.create books\n2. get book by name\n3. update book by name\n4. get all book list\n5. search book\n6. delete book by name\n"
);
console.log("to select , please type : node app.js select_option --option=type any number from 1 to 6")

yargs.command({
  command: '1',
  describe: 'Add a new book',
  builder: {
      name: {
          describe: 'Book name',
          demandOption: true,
          type: 'string'
      },
      author: {
          describe: 'Book author',
          demandOption: true,
          type: 'string'
      },
      genre: {
        describe: 'Book genre',
        demandOption: true,
        type: 'string'
    }
  },
  handler(argv) {
      books.addBook(argv.name, argv.author,argv.genre)
  }
})
yargs.parse()