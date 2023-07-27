import "./styles/RuleEntry.css";
import { useContext } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function RuleEntry(props) {
    const { index, predecessor, successor } = props;
    const { invalidatedRules, confirmed, removeRule, updateRulePredecessor, updateRuleSuccessor } = useContext(AlgorithmContext);

    return (
        <div className="rule-entry">
            {index + 1}.
            <input type="text" placeholder="predecessor" value={predecessor} 
                onChange={e => updateRulePredecessor(index, e.target.value)}
                className={invalidatedRules.includes(index) && predecessor.length == 0 ? "invalid" : ""}
                disabled={confirmed} />
            &rarr;
            <input type="text" placeholder="successor" value={successor} 
                onChange={e => updateRuleSuccessor(index, e.target.value)}
                className={invalidatedRules.includes(index) && successor.length == 0  ? "invalid" : ""}
                disabled={confirmed} />
            <button className={"remove-rule" + (confirmed ? " disabled" : "")}
                onClick={e => removeRule(index)} disabled={confirmed}>&#10006;</button>
        </div>
    );
}

export default RuleEntry;