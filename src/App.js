import "./App.css";
import OutputCanvas from "./components/OutputCanvas";
import RuleSettings from "./components/RuleSettings";
import AxiomSettings from "./components/AxiomSettings";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { AlgorithmProvider } from "./contexts/AlgorithmContext";


function App() {
    const { dark, toggle } = useContext(ThemeContext);

    return (
        <div id="app">
            <div className={"settings-panel settings-panel-left"}>
                <div id="main-settings">
                    <AlgorithmProvider>
                        <RuleSettings />
                        <AxiomSettings />
                    </AlgorithmProvider>
                </div>
            </div>
            <div className="output-canvas-container">
                <OutputCanvas />
            </div>
            <div className={"settings-panel settings-panel-right"}>
                <button onClick={toggle}>Theme toggle (PLACEHOLDER)</button>
            </div>
        </div>
  );
}

export default App;
