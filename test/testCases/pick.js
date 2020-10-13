const test = require('ava');
const pickByWeight = require('../..').default;

test('Test - two elements should be picked as unbiased for [0.5, 0.5]', (t) => {
    const testWeight = [0.5, 0.5];
    const pickedLookup = {};
    const tries = 3000000;
    pickedLookup[0] = pickedLookup[1] = 0;

    for (let i = 0; i < tries; i++) {
        const result = pickByWeight(testWeight);
        pickedLookup[result]++;
    }

    const diff = Math.abs(pickedLookup[0] - pickedLookup[1]);

    // 3 * sigma (SQRT(n)) difference for 99% confidence

    t.true(diff <= 3 * Math.sqrt(tries));
});

test('Test - two elements should be picked biased for first element for [10, 1]', (t) => {
    const testWeight = [10, 1];
    const pickedLookup = {};
    const tries = 3000000;
    pickedLookup[0] = pickedLookup[1] = 0;

    for (let i = 0; i < tries; i++) {
        const result = pickByWeight(testWeight);
        pickedLookup[result]++;
    }

    const diff = pickedLookup[0] - pickedLookup[1];

    t.true(diff >= 10 * Math.sqrt(tries));
});

