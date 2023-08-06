import { createContext, useEffect } from 'react';
import { useState } from 'react';

// default context values
export const AlgorithmContext = createContext({
    rules: [],
    axiom: "",
    output: [],
    displayedStep: 0,
    invalidPredecessors: [],
    invalidSuccessors: [],
    isAxiomInvalid: false,
    confirmed: false,
    setAxiom: (value) => {},
    setOutput: (value) => {},
    setConfirmed: (value) => {},
    incrementDisplayedStep: () => {},
    decrementDisplayedStep: () => {},
    addRule: (predecessor, successor) => {},
    removeRule: (index) => {},
    updateRulePredecessor: (index, value) => {},
    updateRuleSuccessor: (index, value) => {},
    onConfirm: () => {}
});

export function AlgorithmProvider(props) {
    const [rules, setRules] = useState([]);
    const [axiom, setAxiom] = useState("");
    const [output, setOutput] = useState([]);
    const [displayedStep, setDisplayedStep] = useState(0);
    const [invalidPredecessors, setInvalidPredecessors] = useState([]);
    const [invalidSuccessors, setInvalidSuccessors] = useState([]);
    const [isAxiomInvalid, setIsAxiomInvalid] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const addRule = (predecessor, successor) => {
        rules.push({
            predecessor: predecessor, 
            successor: successor
        });
        setRules([...rules]);
    };

    const removeRule = (index) => {
        if (index >= 0 && index < rules.length) rules.splice(index, 1);
        setRules([...rules]);
    };

    const updateRulePredecessor = (index, value) => {
        rules[index] = {
            predecessor: value,
            successor: rules[index].successor
        };
        setRules([...rules]);
    };

    const updateRuleSuccessor = (index, value) => {
        rules[index] = {
            predecessor: rules[index].predecessor,
            successor: value
        };
        setRules([...rules]);
    };

    const generateOutput = (step) => {
        let newOutput = [...output];
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
        setOutput([...newOutput]);
    }

    const incrementDisplayedStep = () => {
        setDisplayedStep(displayedStep + 1);
        generateOutput(displayedStep + 1);
    };

    const decrementDisplayedStep = () => {
        if (displayedStep > 0) setDisplayedStep(displayedStep - 1);
        generateOutput(displayedStep - 1);
    };

    const onConfirm = () => {
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
        // Empty axiom
        if (axiom.length === 0) {
            correct = false;
            setIsAxiomInvalid(true);
        }
        // Empty rules
        if (rules.length === 0) {
            correct = false;
        }

        if (correct) {
            setInvalidPredecessors([]);
            setInvalidSuccessors([]);
            setIsAxiomInvalid(false);
            setDisplayedStep(0);
            setConfirmed(true);
            setOutput([]);
        }
        else {
            setInvalidPredecessors([...invalidPre]);
            setInvalidSuccessors([...invalidSuc]);
            setConfirmed(false);
        }
    };

    // Set initial output after confirming and clearing the old output
    useEffect(() => {
        console.log(output);
        if (output.length === 0 && confirmed) generateOutput(0);
    }, [output]);

    return (
        <AlgorithmContext.Provider value={{
            rules: rules,
            axiom: axiom,
            output: output,
            displayedStep: displayedStep,
            invalidPredecessors: invalidPredecessors,
            invalidSuccessors: invalidSuccessors,
            isAxiomInvalid: isAxiomInvalid,
            confirmed: confirmed,
            setAxiom: setAxiom,
            setOutput: setOutput,
            setConfirmed: setConfirmed,
            incrementDisplayedStep: incrementDisplayedStep,
            decrementDisplayedStep: decrementDisplayedStep,
            addRule: addRule,
            removeRule: removeRule,
            updateRulePredecessor: updateRulePredecessor,
            updateRuleSuccessor: updateRuleSuccessor,
            onConfirm: onConfirm
        }}>
            {props.children}
        </AlgorithmContext.Provider>
    );
}