import "./styles/RuleEntry.css";
import { useContext } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function RuleEntry(props) {
    const { index, predecessor, successor } = props;
    const { invalidPredecessors, invalidSuccessors, confirmed, removeRule, updateRulePredecessor, updateRuleSuccessor } = useContext(AlgorithmContext);

    return (
        <div className="rule-entry">
            {index + 1}.
            <input type="text" placeholder="predecessor" value={predecessor} 
                onChange={e => updateRulePredecessor(index, e.target.value)}
                className={invalidPredecessors.includes(index) ? "invalid" : ""}
                disabled={confirmed} />
            &rarr;
            <input type="text" placeholder="successor" value={successor} 
                onChange={e => updateRuleSuccessor(index, e.target.value)}
                className={invalidSuccessors.includes(index)  ? "invalid" : ""}
                disabled={confirmed} />
            <button className={"remove-rule" + (confirmed ? " disabled" : "")}
                onClick={e => removeRule(index)} disabled={confirmed}>&#10006;</button>
        </div>
    );
}

export default RuleEntry;