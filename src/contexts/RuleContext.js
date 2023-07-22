import { createContext } from 'react';
import { useState } from 'react';

export const RuleContext = createContext({
    rules: [],
    addRule: (predecessor, successor) => {},
    removeRule: (index) => {},
    updateRulePredecessor: (index, value) => {},
    updateRuleSuccessor: (index, value) => {}
});

export function RuleProvider(props) {
    const [rules, setRules] = useState([]);

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

    return (
        <RuleContext.Provider value={{
            rules: rules,
            addRule: addRule,
            removeRule: removeRule,
            updateRulePredecessor: updateRulePredecessor,
            updateRuleSuccessor: updateRuleSuccessor
        }}>
            {props.children}
        </RuleContext.Provider>
    );
}