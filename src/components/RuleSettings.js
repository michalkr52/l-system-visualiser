import "./styles/RuleSettings.css";
import RuleEntry from "./RuleEntry";
import { AlgorithmContext } from "../contexts/AlgorithmContext";
import { useContext } from "react";

function RuleSettings() {
    const { rules, confirmed, addRule } = useContext(AlgorithmContext);
    
    // todo: add a scrollbar to the rules list
    return (
        <div id="rule-settings">
            <div className="settings-title">Rules</div>
            <div className="settings-content">
                {rules.map((rule, index) => {
                    return (
                        <RuleEntry
                            key={index}
                            index={index}
                            predecessor={rule.predecessor}
                            successor={rule.successor}
                        />
                    );
                })}
                <button className={"add-rule" + (confirmed ? " disabled" : "")}
                    onClick={addRule.bind(null, "", "")} disabled={confirmed}>+</button>
            </div>
        </div>
    );
}

export default RuleSettings;