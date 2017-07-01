// Dependencies and exports
// Takes in BasicCard file
var BasicCard = require("./BasicCard.js");
// Takes in ClozeCard file
var ClozeCard = require("./ClozeCard.js");

var inquirer = require("inquirer");
var fs = require("fs");
var flashcards = [];

// Lets first ask what the user wants to do!
function start() {

    inquirer.prompt([

        {

            type: "list",
            message: "What would you like to do?",
            choices: ["Create flashcards", "Review flashcards", "Quiz me"],
            name: "choices"

        }
    ]).then(function (user) {

        var choice = user.choices;

        switch (choice) {
            case "Create flashcards":
                create();
                break;

            case "Review flashcards":
                displayFlashcards();
                break;

            case "Quiz me":
                quiz();
                break;
        }
    });
}

// Creating a flash card
function create() {

    inquirer.prompt([

        {
            type: "list",
            message: "Do you want to make basic flash cards or cloze flashcards?",
            choices: ["Basic flashcards", "Cloze flashcards"],
            name: "flashcardType"

        }
    ]).then(function (user) {
        if (user.flashcardType === "Basic flashcards") {
            console.log("Creating a basic flashcard...");

            inquirer.prompt([

                {
                    type: "input",
                    message: "Flashcard question:",
                    name: "front"

                },
                {

                    type: "input",
                    message: "Flashcard answer:",
                    name: "back"
                }
            ]).then(function (basicUser) {

                var flashcard = new BasicCard(basicUser.front, basicUser.back);

                flashcards.push(flashcard);

                deck();

                console.log(flashcard);

                console.log("New flashcard created!");

                createAnother();

            });

        } else if (user.flashcardType === "Cloze flashcards") {
            console.log("Creating a cloze-deleted flashcard...");

            inquirer.prompt([

                {
                    type: "input",
                    message: "Flashcard fact: (ex. George Washington was the first president of the United States)",
                    name: "text"

                },
                {

                    type: "input",
                    message: "Which part of the fact you would like to omit:",
                    name: "cloze"
                }
            ]).then(function (clozeUser) {

                var flashcard = new ClozeCard(clozeUser.text, clozeUser.cloze);

                flashcards.push(flashcard);

                deck();

                console.log(flashcard);

                console.log("New flashcard created!");

                createAnother();

            });
        }
    });
}

// Want to ask the user if they want to add another flashcard without having to enter in anything else in the console
function createAnother() {

    inquirer.prompt([
        {

            type: "list",
            message: "Did you want to make another flashcard?",
            choices: ["Yes", "No"],
            name: "makeAnother"

        }
    ]).then(function (user) {

        while (user.makeAnother === "Yes") {
            create();
            break;
        }

        if (user.makeAnother === "No") {
            console.log("Time to start studying!");
            start();
        }
    });
}

// Adds to the deck of flashcards created into the log.txt file
function deck() {
    // Will append the flash card to the end of the file
    fs.appendFile("log.txt", "utf8" + flashcards, function (err) {
        if (err) {
            return console.log(err);
        }

    });
}

// Allows user to see all of the flashcards created by reading and spitting out contents of the log.txt file
function displayFlashcards() {

    fs.readFile("log.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.split(" ////// ");

        for (var i = 0; i < data.length; i++) {
            console.log(flashcards);
        }
    });
}

// Allows users to study!
function quiz() {
    console.log("work in progress");
}

// That callback though
start();