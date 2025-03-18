import * as fs from 'fs';
import * as readline from 'readline';

// Make interface to read from the console so users can write
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Make an object so the notes will be 
interface Note {
  date: string;
  entry: string;
}

// Helper function to get the current date
function getCurrentDate(): string {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// Helper function to write notes to the file
function writeNoteToFile(note: Note): void {
  const notes = loadNotes();
  notes.push(note);
  fs.writeFileSync('notes.txt', JSON.stringify(notes, null, 2), 'utf8');
}

// Helper function to load notes from the file
function loadNotes(): Note[] {
  if (fs.existsSync('notes.txt')) {
    const data = fs.readFileSync('notes.txt', 'utf8');
    return JSON.parse(data) as Note[];
  }
  return [];
}

// Function to display the options and handle user input
function main(): void {
  rl.question(`
  Please choose an option:
  1. Write an entry
  2. See entries
  3. Quit
  `, (choice: string) => {
    if (choice === '1') {
      // Write an entry
      rl.question('Enter your note: ', (entry: string) => {
        const note: Note = { date: getCurrentDate(), entry };
        writeNoteToFile(note);
        console.log('Note saved.');
        main(); // Recurse to give the user another chance to choose
      });
    } else if (choice === '2') {
      // See entries
      const notes = loadNotes();
      if (notes.length === 0) {
        console.log('No entries found.');
      } else {
        notes.forEach((note: Note, index: number) => {
          console.log(`Entry ${index + 1}:`);
          console.log(`Date: ${note.date}`);
          console.log(`Note: ${note.entry}\n`);
        });
      }
      main(); // Recurse to give the user another chance to choose
    } else if (choice === '3') {
      console.log('Goodbye!');
      // Quit whole app, close readline portion
      rl.close();
    } else {
      console.log('Not an option, sorry. Please try again.');
      main();
    }
  });
}

// Start the program
main();





//conpime with watching: npx tsc -w

// npx tsc index.ts
// node index.js

