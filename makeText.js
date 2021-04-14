/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");
const fs = require("fs");
const axios = require("axios");
const strip = require("string-strip-html");

async function read(input_type, path) {
	if (input_type === "file") {
		try {
			return fs.readFileSync(path, "utf8");
		} catch (err) {
			throw ("Error reading ", path, ":", err);
			process.exit(1);
		}
	} else if (input_type === "url") {
		try {
			const response = await axios.get(path);
			return strip(response.data).result;
		} catch (err) {
			throw ("Error reading ", path, ":", err);
			process.exit(1);
		}
	}
}

async function makeText() {
	const input_type = process.argv[2];
	const path = process.argv[3];
	try {
		const text = await read(input_type, path);
		if (text) {
			const machine = new MarkovMachine(text);

			console.log(`...generated text from ${input_type} ${path}...`);
			console.log(machine.makeText());
		} else {
			console.log("invalid input_type. 'file' or 'url' required");
			process.exit(1);
		}
	} catch (err) {
		console.log(err);
	}
}

makeText();

exports = { makeText };
