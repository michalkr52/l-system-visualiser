import "./styles/ConfirmButton.css";
import { useContext, useEffect } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function ConfirmButton() {
    const { rules, axiom, confirmed, setConfirmed, onConfirm } = useContext(AlgorithmContext);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !confirmed) {
            onConfirm();
        }
        else if (event.key === "Escape" && confirmed) {
            setConfirmed(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", e => handleKeyDown(e));
        return () => {
            document.removeEventListener("keydown", e => handleKeyDown(e));
        }
    }, [confirmed, rules, axiom]);

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