import "./styles/OutputTextbox.css";
import { useContext } from "react";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function OutputTextbox() {
    const { output, displayedStep } = useContext(AlgorithmContext);

    return (
        <div className="output-textbox">
            <div className="output-textbox-title">Text output</div>
            <textarea readOnly value={output[displayedStep]}></textarea>
        </div>
    );
}

export default OutputTextbox;