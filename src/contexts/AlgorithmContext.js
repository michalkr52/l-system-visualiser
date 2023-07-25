import { createContext } from 'react';
import { useState } from 'react';

// default context values
export const AlgorithmContext = createContext({
    rules: [],
    axiom: "",
    output: [],
    displayedStep: 0,
    setAxiom: (value) => {},
    addRule: (predecessor, successor) => {},
    removeRule: (index) => {},
    updateRulePredecessor: (index, value) => {},
    updateRuleSuccessor: (index, value) => {}
});

export function AlgorithmProvider(props) {
    const [rules, setRules] = useState([]);
    const [axiom, setAxiom] = useState("");
    const [output, setOutput] = useState([]);
    const [displayedStep, setDisplayedStep] = useState(0);

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

    return (
        <AlgorithmContext.Provider value={{
            rules: rules,
            axiom: axiom,
            output: output,
            displayedStep: displayedStep,
            setAxiom: setAxiom,
            setOutput: setOutput,
            incrementDisplayedStep: incrementDisplayedStep,
            decrementDisplayedStep: decrementDisplayedStep,
            addRule: addRule,
            removeRule: removeRule,
            updateRulePredecessor: updateRulePredecessor,
            updateRuleSuccessor: updateRuleSuccessor
        }}>
            {props.children}
        </AlgorithmContext.Provider>
    );
}