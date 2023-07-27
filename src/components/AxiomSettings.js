import "./styles/AxiomSettings.css";
import { AlgorithmContext } from "../contexts/AlgorithmContext";
import { useContext } from "react";  

function AxiomSettings() {
    const { axiom, invalidatedRules, setAxiom } = useContext(AlgorithmContext);

    return (
        <div id="axiom-settings" className="settings-content">
        <div className="axiom-label">Axiom:</div>
            <input type="text" placeholder="axiom"
                value={axiom} onChange={e => setAxiom(e.target.value)}
                className={"axiom-input" + (invalidatedRules.includes(-1) && axiom.length == 0 ? " invalid" : "")} />
        </div>
    );
}

export default AxiomSettings;