import "./styles/AxiomSettings.css";
import { AlgorithmContext } from "../contexts/AlgorithmContext";
import { useContext } from "react";  

function AxiomSettings() {
    const { axiom, isAxiomInvalid, inputConfirmed, setAxiom } = useContext(AlgorithmContext);

    return (
        <div id="axiom-settings" className="settings-content">
        <div className="axiom-label">Axiom:</div>
            <input type="text" placeholder="axiom"
                value={axiom} onChange={e => setAxiom(e.target.value.trim())} disabled={inputConfirmed}
                className={"axiom-input" + (isAxiomInvalid ? " invalid" : "")} />
        </div>
    );
}

export default AxiomSettings;