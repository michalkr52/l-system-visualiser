import "./styles/StepControls.css";
import { useContext } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function StepControls() {
    const { displayedStep, incrementDisplayedStep, decrementDisplayedStep } = useContext(AlgorithmContext);

    return (
        <div className="settings-content align-bottom">
            <div className="step-controls-title">Step</div>
            <div className="step-controls">
                <button className="step-control" onClick={decrementDisplayedStep}>&#10094;</button>
                <div className="step-number">{displayedStep}</div>
                <button className="step-control" onClick={incrementDisplayedStep}>&#10095;</button>
            </div>
        </div>
    );
}

export default StepControls;