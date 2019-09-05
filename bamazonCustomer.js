var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "*****",
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
  var query = "SELECT item_id FROM products WHERE ?";

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
      connection.query(query, { item_id: answer.search }, function(err, res) {
        for (var i = 0; i < res[i].length; i++) {
          console.log("Here's your item: " + res[i].product_name);
        }
        connection.end();
      });
    });
}
