var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "VW@man325",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id: " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "initialQ",
      type: "list",
      message: "What can we assist you with today?",
      choices: ["Search for an item", "Nothing, thank you"]
    })
    .then(function(answer) {
      switch (answer.initialQ) {
        case "Search for an item":
          customerSearch();
          break;

        case "Nothing, thank you":
          connection.end();
          break;
      }
    });
}

function customerSearch() {
  var query = "SELECT * FROM products WHERE ?";

  inquirer
    .prompt([
      {
        name: "search",
        type: "input",
        message: "What is the ID of the product you'd like to buy?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How much would you like to order?"
      }
    ])
    .then(function(answer) {
      connection.query(query, { item_id: parseInt(answer.search) }, function(
        err,
        res
      ) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Here's your item: " + res[i].product_name);
          console.log("With a price of: $" + res[i].price);
          console.log("Here's the quantity: " + res[i].stock_quanitiy);
          switch (parseInt(answer.search)) {
            case res[i].stock_quanitiy < parseInt(answer.quantity):
              // customerOrder();
              console.log("Hi!");

              break;

            default:
              console.log("Insufficient quantity!");
              connection.end();
              break;
          }
        }
      });
    });
}

// function customerOrder(){

// }
