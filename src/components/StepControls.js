import "./styles/StepControls.css";
import { useCallback, useContext, useEffect } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function StepControls() {
    const { confirmed, displayedStep, incrementDisplayedStep, decrementDisplayedStep } = useContext(AlgorithmContext);

    const handleKeyDown = useCallback((event) => {
        if (!confirmed) return;
        if (event.key === "ArrowLeft") {
            decrementDisplayedStep();
        } else if (event.key === "ArrowRight") {
            incrementDisplayedStep();
        }
    }, [confirmed, displayedStep]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleKeyDown]);
    
    return (
        <div className="settings-content align-bottom">
            <div className="step-controls-title">Step</div>
            <div className="step-controls">
                <button className="step-control" onClick={decrementDisplayedStep} disabled={!confirmed}>&#10094;</button>
                <div className="step-number">{displayedStep}</div>
                <button className="step-control" onClick={incrementDisplayedStep} disabled={!confirmed}>&#10095;</button>
            </div>
        </div>
    );
}

export default StepControls;