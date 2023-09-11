/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = null;
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = {};

    for (let i = 0; i < this.words.length; i += 1) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (!chains[word]) {
        chains[word] = [];
      }
      chains[word].push(nextWord);
    }

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    if (!this.chains || Object.keys(this.chains).length === 0) {
      throw new Error("Markov chains have not been generated or are empty. Call makeChains() first.");
    }
    const words = [];
    let currentWord = this.getRandomStartingWord();

    while (words.length < numWords && currentWord !== null) {
      words.push(currentWord);
      currentWord = this.getRandomNextWord(currentWord);
    }
    return words.join(' ');
  }

  getRandomStartingWord() {
    const startingWords = Object.keys(this.chains);
    return startingWords[Math.floor(Math.random() * startingWords.length)];
  }

  getRandomNextWord(currentWord) {
    const nextWords = this.chains[currentWord];
    return nextWords[Math.floor(Math.random() * nextWords.length)];
  }
}

module.exports =
  MarkovMachine;