export function validateRules(rules) {
    let correct = true;
    let invalidPre = [];
    let invalidSuc = [];

    for (let i = 0; i < rules.length; i++) {
        // Empty predecessor
        if (rules[i].predecessor.length === 0) {
            correct = false;
            invalidPre.push(i);
        }
        // Empty successor
        if (rules[i].successor.length === 0) {
            correct = false;
            invalidSuc.push(i);
        }
        // Predecessor is not a single character
        if (rules[i].predecessor.length > 1) {
            correct = false;
            invalidPre.push(i);
        }
        // Duplicate predecessor
        for (let j = i; j < rules.length; j++) {
            if (i !== j && rules[i].predecessor === rules[j].predecessor) {
                correct = false;
                invalidPre.push(i);
                invalidPre.push(j);
            }
        }
    }
    // Empty rules
    if (rules.length === 0) {
        correct = false;
    }

    return { correct, invalidPre, invalidSuc };
}

export function validateAxiom(axiom) {
    let correct = true;

    // Empty axiom
    if (axiom.length === 0) {
        correct = false;
    }

    return correct;
}