/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		const keys = new Set(this.words);

		this.chains = {};

		keys.forEach((key) => {
			this.chains[key] = [];
			let fromIndex = 0;
			let index = this.words.indexOf(key);
			while (index >= 0) {
				if (index < this.words.length - 1) {
					this.chains[key].push(this.words[index + 1]);
				} else {
					this.chains[key].push(null);
				}

				fromIndex = index + 1;
				index = this.words.indexOf(key, fromIndex);
			}
		});
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let word = this.words[Math.floor(this.words.length * Math.random())];

		const words = [];

		words.push(word);
		while (words.length < numWords) {
			word = this.chains[word][Math.floor(this.chains[word].length * Math.random())];

			if (word === null) {
				break;
			}
			words.push(word);
		}

		return words.join(" ");
	}
}

module.exports = { MarkovMachine };
