import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { generateOutput } from '../logic/output';
import { validateRules, validateAxiom } from '../logic/validation';

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

    const incrementDisplayedStep = () => {
        setDisplayedStep(displayedStep + 1);
    };

    const decrementDisplayedStep = () => {
        if (displayedStep > 0) setDisplayedStep(displayedStep - 1);
    };

    const onConfirm = () => {
        let { rulesCorrect, invalidPre, invalidSuc } = validateRules(rules, axiom);
        let axiomCorrect = validateAxiom(axiom);

        if (!axiomCorrect) setIsAxiomInvalid(true);
        if (rulesCorrect && axiomCorrect) {
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
        if (output.length === 0 && confirmed) {
            setOutput(generateOutput(0, output, rules, axiom));
        }
    }, [output]);

    // Generate current output after changing the displayed step
    useEffect(() => {
        if (confirmed) {
            setOutput(generateOutput(displayedStep, output, rules, axiom));
        }
    }, [displayedStep]);

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