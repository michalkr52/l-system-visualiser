export function generateOutput(step, outputArray, rules, axiom) {
    let newOutput = [...outputArray];
    if (step <= 0) newOutput[0] = axiom;
    else {
        if (newOutput.length < step) generateOutput(step - 1);
        else if (newOutput.length == step) newOutput.push("");
        let currentOutput = newOutput[step - 1];
        newOutput[step] = "";
        for (let i = 0; i < currentOutput.length; i++) {
            let found = false;
            for (let j = 0; j < rules.length; j++) {
                if (currentOutput[i] === rules[j].predecessor) {
                    newOutput[step] += rules[j].successor;
                    found = true;
                    break;
                }
            }
            if (!found) newOutput[step] += currentOutput[i];
        }
    }
    return [...newOutput];
}