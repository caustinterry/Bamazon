# Bamazon

## Purpose

The purpose of the app was for me to continue to develop my skills with NodeJS as well as MySQL. Bamazon is a command line app utilizing node to search a created databases for item and return the relavent data.

## How to use

Using the command line start with `node bamazonCustomer.js`

### Prompts

- `What can we assist you with today?`
  The user will be able to Search for an item in the database or choose nothing which will end the program.

- `What is the ID of the product you'd like to buy?`
  If the user chooses to search for an item to buy they will be prompted to choose which product by ID.

- `How much would you like to order?`
  TThe user will input the amount of the item that they would like to purchase. The quantity will then be compared to the amounts in the database and if there is a sufficient quantity it will move forward with the purchase. The total cost will be displayed and the database update with the new stock quantity. If there is an insufficient quanity the user will be alerted to this fact and the program will start over.

## Screenshot of the project in use

![Bamazon](BamazonCustomer.gif "Bamazon")

## Contain a link to a deployed version of the app

The app can be seen here `https://github.com/caustinterry/Bamazon`

## Technologies Used

- NodeJS
- Javascript
- npm: utilizing inquirer and MySQL

## Development

Developed by Austin Terry
