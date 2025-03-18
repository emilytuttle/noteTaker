"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
// Initialize the readline interface to interact with the user
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Helper function to get the current date
function getCurrentDate() {
    var date = new Date();
    return "".concat(date.toLocaleDateString(), " ").concat(date.toLocaleTimeString());
}
// Helper function to write notes to the file
function writeNoteToFile(note) {
    var notes = loadNotes();
    notes.push(note);
    fs.writeFileSync('notes.txt', JSON.stringify(notes, null, 2), 'utf8');
}
// Helper function to load notes from the file
function loadNotes() {
    if (fs.existsSync('notes.txt')) {
        var data = fs.readFileSync('notes.txt', 'utf8');
        return JSON.parse(data);
    }
    return [];
}
// Function to display the options and handle user input
function main() {
    rl.question("\n  Please choose an option:\n  1. Write an entry\n  2. See entries\n  3. Quit\n  ", function (choice) {
        if (choice === '1') {
            // Write an entry
            rl.question('Enter your note: ', function (entry) {
                var note = { date: getCurrentDate(), entry: entry };
                writeNoteToFile(note);
                console.log('Note saved.');
                main(); // Recurse to give the user another chance to choose
            });
        }
        else if (choice === '2') {
            // See entries
            var notes = loadNotes();
            if (notes.length === 0) {
                console.log('No entries found.');
            }
            else {
                notes.forEach(function (note, index) {
                    console.log("Entry ".concat(index + 1, ":"));
                    console.log("Date: ".concat(note.date));
                    console.log("Note: ".concat(note.entry, "\n"));
                });
            }
            main(); // Recurse to give the user another chance to choose
        }
        else if (choice === '3') {
            // Quit the application
            console.log('Goodbye!');
            rl.close();
        }
        else {
            console.log('Invalid choice. Please try again.');
            main(); // Recurse on invalid input
        }
    });
}
// Start the program
main();
// for myself to remember, i dont need these in your file
// compile once: npx tsc
//conpime with watching: npx tsc -w
// tsc index.ts
// node index.js
