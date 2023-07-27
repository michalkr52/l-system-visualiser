import "./styles/ConfirmButton.css";
import { useContext } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function ConfirmButton() {
    const { confirmed, setConfirmed, onConfirm } = useContext(AlgorithmContext);

    if (confirmed) {
        return (
            <button className="confirm-button confirm-true" onClick={e => setConfirmed(false)}>Edit rules</button>
        );
    }
    else {
        return (
            <button className="confirm-button confirm-false" onClick={e => onConfirm()}>Confirm</button>
        );
    }
}

export default ConfirmButton;