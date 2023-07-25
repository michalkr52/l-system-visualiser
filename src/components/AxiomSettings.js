import "./styles/AxiomSettings.css";
import { AlgorithmContext } from "../contexts/AlgorithmContext";
import { useContext } from "react";  

function AxiomSettings() {
    const { axiom, setAxiom } = useContext(AlgorithmContext);

    return (
        <div id="axiom-settings" className="settings-content align-bottom">
        <div className="axiom-label">Axiom:</div>
            <input type="text" placeholder="axiom" className="axiom-input" 
                value={axiom} onChange={e => setAxiom(e.target.value)} />
        </div>
    );
}

export default AxiomSettings;