const MarkovMachine = require('./markov');
const fs = require('fs');

describe('MarkovMachine', function () {
    test('should create an instance with input text', function () {
        const markovMachine = new MarkovMachine('the cat in the hat');
        expect(markovMachine).toBeInstanceOf(MarkovMachine);
    });

    test('should generate random text', function () {
        const markovMachine = new MarkovMachine('the cat in the hat');
        const randomText = markovMachine.makeText(5);
        expect(typeof randomText).toBe('string');
    });
});