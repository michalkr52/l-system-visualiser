import "./styles/ConfirmButton.css";
import { useCallback, useContext, useEffect } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function ConfirmButton() {
    const { rules, axiom, confirmed, setConfirmed, onConfirm } = useContext(AlgorithmContext);

    const handleKeyDown = useCallback((event) => {
        // if (event.key === "Enter" && !confirmed) {
        //     onConfirm();
        // }
        if (event.key === "Escape" && confirmed) {
            setConfirmed(false);
        }
    }, [confirmed, axiom, rules]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleKeyDown]);

    if (confirmed) {
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