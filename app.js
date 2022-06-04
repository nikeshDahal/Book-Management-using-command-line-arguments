const { number, argv } = require("yargs");
const yargs = require("yargs");
// const { removeNote } = require("./notes");
// const notes=require("./notes");

console.log("welcome to Book Management");
console.log("select your options ....");
console.log(
  " 1.create books\n2. get book by name\n3. update book by name\n4. get all book list\n5. search book\n6. delete book by name\n"
);
console.log("to select , please type : node app.js select_option --option=type any number from 1 to 6")

yargs.command({ //adding a select_option command
    command:'select_option',
    describe:'selection of option',
    builder:{
        option:{
            describe:'options for book management',
            demandOption:true,
            type:'number'
        },
    },
    handler: function(argv){
        const inputValue=argv.option
        switch (inputValue) {
            case 1:
              console.log("create option selected..");
              break;
            case 2:
              console.log("get option selected..");
              break;
            case 3:
              console.log("update option selected..");
              break;
            case 4:
              console.log("get all option selected..");
              break;
            case 5:
              console.log("search all option selected..");
              break;
            case 6:
              console.log("delete all option selected..");
              break;
          }
    }
})

console.log(yargs.argv);