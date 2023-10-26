import "./App.css";
import OutputCanvas from "./components/OutputCanvas";
import RuleSettings from "./components/RuleSettings";
import AxiomSettings from "./components/AxiomSettings";
import OutputTextbox from "./components/OutputTextbox";
import StepControls from "./components/StepControls";
import ConfirmButton from "./components/ConfirmButton";
import StyleSettings from "./components/StyleSettings";
import TokenSettings from "./components/TokenSettings";
import RecipeLoader from "./components/RecipeLoader";
import { AlgorithmProvider } from "./contexts/AlgorithmContext";
import { DrawingSettingsProvider } from "./contexts/DrawingSettingsContext";


function App() {
    return (
        <div id="app">
            <AlgorithmProvider>
                <DrawingSettingsProvider>
                    <div className={"settings-panel settings-panel-left"}>
                        <div id="main-settings">
                            <RuleSettings />
                            <div className="align-bottom" style={{width: "100%"}}>
                                <RecipeLoader />
                                <AxiomSettings />
                                <ConfirmButton />
                            </div>
                        </div>
                    </div>
                    <div className="output-canvas-container">
                        <OutputCanvas />
                        <OutputTextbox />
                    </div>
                    <div className={"settings-panel settings-panel-right"}>
                        <div id="drawing-settings">
                            <StyleSettings />
                            <hr />
                            <TokenSettings />
                        </div>
                        <StepControls />
                    </div>
                    </DrawingSettingsProvider>
            </AlgorithmProvider>
        </div>
  );
}

export default App;
