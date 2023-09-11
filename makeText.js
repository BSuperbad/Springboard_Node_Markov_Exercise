/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');
const process = require('process')


function readTextFromFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }
}


async function fetchTextFromURL(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error(`Error fetching data from URL: ${err.message}`);
        process.exit(1);
    }
}

async function generateText() {
    const [, , source, input] = process.argv;

    let text = '';

    if (source === 'file') {
        text = readTextFromFile(input);
    } else if (source === 'url') {
        text = await fetchTextFromURL(input);
    } else {
        console.error('Invalid source. Use "file" or "url".');
        process.exit(1);
    }

    const markovMachine = new MarkovMachine(text);
    const generatedText = markovMachine.makeText(100);

    console.log(generatedText);
}

generateText();