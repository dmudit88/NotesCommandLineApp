const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');

// Customize yargs version
// yargs.version('1.1.0')

// Create add command
yargs.command({
	command: 'add',
	describe: 'Adds a New note',
	builder: {
		title: {
			describe: 'title of the Note',
			demandOption: true, 
			type: 'String'	
		},
		body: {
			describe: 'Content of the note',
			demandOption: true,
			type: 'String'
		}
	},

	// Function for your command
	handler(argv) {
		let temp={};
        temp.title=argv.title;
        temp.body=argv.body;
        let rawdata = fs.readFileSync('notes.json');
        let notes = JSON.parse(rawdata);
		for(let i=0; i<notes.length; i++){
			if(notes[i].title == temp.title){
				console.log(chalk.bold.redBright("Title already taken!"));
				return;
			}
		}
        // console.log(notes);
        notes.push(temp);
        fs.writeFileSync('notes.json', JSON.stringify(notes));
		console.log(chalk.bold.greenBright("New note created!"));
	}
})

yargs.command({
	command: 'remove',
	describe: 'Removes a note',
	builder: {
		title: {
			describe: 'title of the Note',
			demandOption: true, 
			type: 'String'	
		}
	},

	// Function for your command
	handler(argv) {
        let rawdata = fs.readFileSync('notes.json');
        let notes = JSON.parse(rawdata);
		let isNotePresent=false;
		for(let i=0; i<notes.length; i++){
			if(notes[i].title == argv.title){
				isNotePresent=true;
				break;
			}
		}
        if(isNotePresent==false){
			console.log(chalk.bold.redBright("No note present with given title"));
			return;
		}
		notes=notes.filter((note) => {return note.title!=argv.title});
        fs.writeFileSync('notes.json', JSON.stringify(notes));
		console.log(chalk.bold.greenBright("Note removed!"));
	}
})

yargs.command({
	command: 'list',
	describe: 'List all notes',

	// Function for your command
	handler(argv) {
        let rawdata = fs.readFileSync('notes.json');
        let notes = JSON.parse(rawdata);
		if(notes.length == 0){
			console.log(chalk.bold.redBright("No notes here"));
			return;
		}
		console.log(chalk.bold.blueBright("Your Notes"));
		for(let i=0; i<notes.length; i++){
			console.log(notes[i].title);
		}
        
	}
})

yargs.command({
	command: 'read',
	describe: 'Read a particular note',
	builder: {
		title: {
			describe: 'title of the Note',
			demandOption: true, 
			type: 'String'	
		}
	},

	// Function for your command
	handler(argv) {
        let rawdata = fs.readFileSync('notes.json');
        let notes = JSON.parse(rawdata);
		for(let i=0; i<notes.length; i++){
			if(notes[i].title == argv.title){
				console.log(chalk.bold.yellowBright(argv.title));
				console.log(notes[i].body);
				return;
			}
		}
		console.log(chalk.bold.redBright("No note with given title present"));

	}
})

yargs.parse() // To set above changes
