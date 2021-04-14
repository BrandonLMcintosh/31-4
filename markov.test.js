const { MarkovMachine } = require("./markov");

describe("Markov machine class", () => {
	test("makeChains", () => {
		const markov = new MarkovMachine("the cat in the hat");
		expect(markov.chains).toEqual({
			the: ["cat", "hat"],
			cat: ["in"],
			in: ["the"],
			hat: [null],
		});
	});

	test("makeText", () => {
		const markov = new MarkovMachine("the cat in the hat");

		for (let i = 1; i <= 10; i++) {
			const text = markov.makeText(50);
			const words = text.split(" ");

			expect(words.length).toBeLessThanOrEqual(50);
			if (words.length < 50) {
				expect(words[words.length - 1]).toEqual("hat");
			}
		}
	});
});
