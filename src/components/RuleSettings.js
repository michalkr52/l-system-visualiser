import "./styles/RuleSettings.css";
import RuleEntry from "./RuleEntry";
import { AlgorithmContext } from "../contexts/AlgorithmContext";
import { useContext } from "react";

function RuleSettings() {
    const { rules, inputConfirmed, addRule } = useContext(AlgorithmContext);
    
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
                <button className={"add-rule" + (inputConfirmed ? " disabled" : "")}
                    onClick={addRule.bind(null, "", "")} disabled={inputConfirmed}>+</button>
            </div>
        </div>
    );
}

export default RuleSettings;