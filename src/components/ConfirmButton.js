import "./styles/ConfirmButton.css";
import { useCallback, useContext, useEffect } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function ConfirmButton() {
    const { rules, axiom, inputConfirmed, setConfirmed, onConfirm } = useContext(AlgorithmContext);

    const handleKeyDown = useCallback((event) => {
        if (event.key === "Escape" && inputConfirmed) {
            setConfirmed(false);
        }
    }, [inputConfirmed, axiom, rules]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleKeyDown]);

    if (inputConfirmed) {
        return (
            <button className="button confirm-button confirm-true" onClick={e => setConfirmed(false)}>Edit rules</button>
        );
    }
    else {
        return (
            <button className="button confirm-button confirm-false" onClick={e => onConfirm()}
                disabled={rules.length <= 0 || axiom.length <= 0}>Confirm</button>
        );
    }
}

export default ConfirmButton;