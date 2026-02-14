# WELCOME to the calculator Kata!

Please provide a solution in code for the problem below. If you have any question please create an Issue in this repository.

**Note:** The challenge can be solved in the language you are more comfortable with. This also applies for the tests, some in Javascript are included, but you can add your own in the language/testing framework of your choice.

## Sum of Numbers 

You should create an CLI application that takes a sum as a string in either digits, spanish or english and returns its result as string in the same language (digits/spanish/english).

The string will be two numbers and an infix operator (+/mas/plus).

Max number is 999 and min number is 0.

The entry point of the CLI is the file `calculate`. This file already already exists in the repository but implementation is missing.  

## Solution 

![Sum Calculator Challenge - Sum Calculator Challenge (1)](https://github.com/user-attachments/assets/c0baf49e-774e-48be-aadc-c8d7f2fd8470)

## How to run 

> bun install

> bun test

or

> ./calculate "two plus three"

### Tests

Tests are included.

Before running the tests you must have node >= 8 installed and run `npm install` in the console at the root folder of the project. 

Run `bun test` in the console to execute the test suite.

### Examples of valid numbers
345

three hundred forty-five

trescientos cuarenta y cinco

101

one hundred one

ciento uno

215

two hundred fifteen

doscientos quince


### Examples of invalid inputs
onehundred

tres cientos
