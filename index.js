const { Random, nodeCrypto } = require("random-js");
const randomEngine = new Random(nodeCrypto);

const pick = function(weights) {
    if (weights.length === 0) {
        throw new Error('Cannot pick from empty array');
    }

    const sumWeight = weights.reduce((accum, weight) => (accum + weight), 0.00);

    if (sumWeight === 0 || (1 / sumWeight > Number.MAX_SAFE_INTEGER)) {
        // Sum of weight is too small for safe computations
        // return 0 as default

        return 0;
    }

    let currentRangeBounary = 0.00;
    const randomVar = randomEngine.real(0.00, sumWeight, false);

    for (let i = 0; i < weights.length; i++) {
        const weight = weights[i];

        if (currentRangeBounary <= randomVar && randomVar < currentRangeBounary + weight) {
            return i;
        }

        currentRangeBounary += weight;
    }
}

exports.default = pick;
