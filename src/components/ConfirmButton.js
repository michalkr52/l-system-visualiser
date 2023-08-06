import "./styles/ConfirmButton.css";
import { useContext } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function ConfirmButton() {
    const { rules, axiom, confirmed, setConfirmed, onConfirm } = useContext(AlgorithmContext);

    if (confirmed) {
        return (
            <button className="confirm-button confirm-true" onClick={e => setConfirmed(false)}>Edit rules</button>
        );
    }
    else {
        return (
            <button className="confirm-button confirm-false" onClick={e => onConfirm()}
                disabled={rules.length <= 0 || axiom.length <= 0}>Confirm</button>
        );
    }
}

export default ConfirmButton;