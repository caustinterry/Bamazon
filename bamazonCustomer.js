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
});
start();

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
      var itemSearch = parseInt(answer.search);
      var itemQuantity = parseInt(answer.quantity);
      purchases(itemSearch, itemQuantity);
    });
}

function purchases(ID, amountNeeded) {
  var query = "SELECT * FROM products WHERE ?";
  connection.query(query, { item_id: parseInt(ID) }, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Here's your item: " + res[i].product_name);
      console.log("With a price of: $" + res[i].price);
      console.log("Here's the quantity: " + res[i].stock_quanitiy);
      if (amountNeeded <= res[i].stock_quanitiy) {
        var totalCost = amountNeeded * res[i].price;
        console.log("Your order is in stock!");
        console.log(
          "Your total for " +
            amountNeeded +
            " " +
            res[i].product_name +
            " is " +
            totalCost
        );
        console.log("Thank you!");

        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quanitiy: res[i].stock_quanitiy - amountNeeded
            },
            {
              item_id: parseInt(ID)
            }
          ],
          function(error) {
            if (error) throw error;
            start();
          }
        );
      } else {
        console.log("There is an insufficient quantity for that amount!");
        start();
      }
    }
  });
}
