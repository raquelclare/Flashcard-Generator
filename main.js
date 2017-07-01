// Dependencies and exports
// Takes in BasicCard file
var BasicCard = require("./BasicCard.js");
// Takes in ClozeCard file
var ClozeCard = require("./ClozeCard.js");

var inquirer = require("inquirer");
var flashcards = [];

// Testing flash cards
// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// // "Who was the first president of the United States?"
// console.log(firstPresident.front); 

// // "George Washington"
// console.log(firstPresident.back); 

// var firstPresidentCloze = new ClozeCard(
//     "George Washington was the first president of the United States.", "George Washington");

// // "George Washington"
// console.log(firstPresidentCloze.cloze); 

// // " ... was the first president of the United States.
// console.log(firstPresidentCloze.partial); 

// // "George Washington was the first president of the United States.
// console.log(firstPresidentCloze.fullText);

// // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
// var brokenCloze = new ClozeCard("This doesn't work", "oops");

function create() {
    inquirer.prompt ([

        {
            type: "list",
            message: "Do you want to make basic flash cards or cloze flashcards?",
            choices: ["Basic flashcards", "Cloze flashcards"],
            name: "flashcardType"

        }
    ]).then(function(user) {
        if (user.flashcardType === "Basic flashcards"){
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
            ]).then(function(basicUser){

                var flashcard = new BasicCard(basicUser.front, basicUser.back);

                flashcards.push(flashcard);

                console.log("New flashcard created!");

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
            ]).then(function(clozeUser){

                var flashcard = new ClozeCard(clozeUser.text, clozeUser.cloze);

                flashcards.push(flashcard);

                console.log(flashcard);

                console.log("New flashcard created!");

            });
        }
    });
}

create();

// Will need a log.txt file for this
function displayFlashcards() {
    return console.log(flashcards);
}

displayFlashcards();