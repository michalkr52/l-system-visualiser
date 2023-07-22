import "./RuleEntry.css";
import { useContext } from "react";
import { RuleContext } from "../contexts/RuleContext";

function RuleEntry(props) {
    const { index, predecessor, successor } = props;
    const { removeRule, updateRulePredecessor, updateRuleSuccessor } = useContext(RuleContext);

    return (
        <div className="rule-entry">
            {index}:
            <input type="text" placeholder="predecessor" value={predecessor} 
                onChange={e => updateRulePredecessor(index, e.target.value)}/>
            &rarr;
            <input type="text" placeholder="successor" value={successor} 
                onChange={e => updateRuleSuccessor(index, e.target.value)}/>
            <button className="remove-rule" onClick={removeRule.bind(this, index)}>&#10006;</button>
        </div>
    );
}

export default RuleEntry;