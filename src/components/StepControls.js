import "./styles/StepControls.css";
import { useCallback, useContext, useEffect } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function StepControls() {
    const { inputConfirmed, displayedStep, incrementDisplayedStep, decrementDisplayedStep } = useContext(AlgorithmContext);

    const handleKeyDown = useCallback((event) => {
        if (!inputConfirmed || event.target.localName === "input") return;
        if (event.key === "ArrowLeft") {
            decrementDisplayedStep();
        } else if (event.key === "ArrowRight") {
            incrementDisplayedStep();
        }
    }, [inputConfirmed, displayedStep]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleKeyDown]);
    
    return (
        <div className="settings-content align-bottom">
            <div className="step-controls">
                <div className="step-controls-title">Step</div>
                <button className="step-control" onClick={decrementDisplayedStep} disabled={!inputConfirmed}>&#10094;</button>
                <div className="step-number">{displayedStep}</div>
                <button className="step-control" onClick={incrementDisplayedStep} disabled={!inputConfirmed}>&#10095;</button>
            </div>
        </div>
    );
}

export default StepControls;