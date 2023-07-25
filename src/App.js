import "./App.css";
import OutputCanvas from "./components/OutputCanvas";
import RuleSettings from "./components/RuleSettings";
import AxiomSettings from "./components/AxiomSettings";
import OutputTextbox from "./components/OutputTextbox";
import StepControls from "./components/StepControls";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { AlgorithmProvider } from "./contexts/AlgorithmContext";


function App() {
    const { toggle } = useContext(ThemeContext);

    return (
        <div id="app">
            <AlgorithmProvider>
                <div className={"settings-panel settings-panel-left"}>
                    <div id="main-settings">
                        <RuleSettings />
                        <AxiomSettings />
                    </div>
                </div>
                <div className="output-canvas-container">
                    <OutputCanvas />
                    <OutputTextbox />
                </div>
                <div className={"settings-panel settings-panel-right"}>
                    <button onClick={toggle}>Theme toggle (PLACEHOLDER)</button>
                    <StepControls />
                </div>
            </AlgorithmProvider>
        </div>
  );
}

export default App;
