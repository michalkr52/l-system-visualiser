import "./RuleEntry.css";
import { useContext } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function RuleEntry(props) {
    const { index, predecessor, successor } = props;
    const { removeRule, updateRulePredecessor, updateRuleSuccessor } = useContext(AlgorithmContext);

    return (
        <div className="rule-entry">
            {index + 1}.
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