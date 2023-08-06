import { createContext } from 'react';
import { useState } from 'react';

// default context values
export const AlgorithmContext = createContext({
    rules: [],
    axiom: "",
    output: [],
    displayedStep: 0,
    invalidRules: [],
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
    const [invalidRules, setinvalidRules] = useState([]);
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
        let correct = true;
        let invalid = [];

        for (let i = 0; i < rules.length; i++) {
            if (rules[i].predecessor.length === 0 || rules[i].successor.length === 0) {
                correct = false;
                invalid.push(i);
            }
        }
        if (axiom.length === 0) {
            correct = false;
            invalid.push(-1);
        }
        if (rules.length === 0) {
            correct = false;
            invalid.push(-2);
        }

        if (correct) {
            setinvalidRules([]);
            setOutput([]);
            setDisplayedStep(0);
            setConfirmed(true);
        }
        else {
            setinvalidRules([...invalid]);
            setConfirmed(false);
        }
    };

    return (
        <AlgorithmContext.Provider value={{
            rules: rules,
            axiom: axiom,
            output: output,
            displayedStep: displayedStep,
            invalidRules: invalidRules,
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