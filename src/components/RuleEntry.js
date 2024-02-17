import "./styles/RuleEntry.css";
import { useContext } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function RuleEntry(props) {
    const { index, predecessor, successor } = props;
    const { invalidPredecessors, invalidSuccessors, inputConfirmed, removeRule, updateRulePredecessor, updateRuleSuccessor } = useContext(AlgorithmContext);

    return (
        <div className="rule-entry">
            {index + 1}.
            <input type="text" placeholder="F" value={predecessor} 
                onChange={e => updateRulePredecessor(index, e.target.value)}
                className={invalidPredecessors.includes(index) ? "invalid predecessor" : "predecessor"}
                disabled={inputConfirmed} />
            &rarr;
            <input type="text" placeholder="Ff-+[]<>abcde..." value={successor} 
                onChange={e => updateRuleSuccessor(index, e.target.value)}
                className={invalidSuccessors.includes(index)  ? "invalid successor" : "successor"}
                disabled={inputConfirmed} />
            <button className={"remove-rule" + (inputConfirmed ? " disabled" : "")}
                onClick={e => removeRule(index)} disabled={inputConfirmed}>&#10006;</button>
        </div>
    );
}

export default RuleEntry;