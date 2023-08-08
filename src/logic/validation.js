export function validateRules(rules) {
    let rulesCorrect = true;
    let invalidPre = [];
    let invalidSuc = [];

    for (let i = 0; i < rules.length; i++) {
        // Empty predecessor
        if (rules[i].predecessor.length === 0) {
            rulesCorrect = false;
            invalidPre.push(i);
        }
        // Empty successor
        if (rules[i].successor.length === 0) {
            rulesCorrect = false;
            invalidSuc.push(i);
        }
        // Predecessor is not a single character
        if (rules[i].predecessor.length > 1) {
            rulesCorrect = false;
            invalidPre.push(i);
        }
        // Duplicate predecessor
        for (let j = i; j < rules.length; j++) {
            if (i !== j && rules[i].predecessor === rules[j].predecessor) {
                rulesCorrect = false;
                invalidPre.push(i);
                invalidPre.push(j);
            }
        }
    }
    // Empty rules
    if (rules.length === 0) {
        rulesCorrect = false;
    }

    return { rulesCorrect, invalidPre, invalidSuc };
}

export function validateAxiom(axiom) {
    let axiomCorrect = true;

    // Empty axiom
    if (axiom.length === 0) {
        axiomCorrect = false;
    }

    return axiomCorrect;
}