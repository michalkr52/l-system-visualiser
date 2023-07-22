import "./App.css";
import OutputCanvas from "./components/OutputCanvas";
import RuleSettings from "./components/RuleSettings";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { RuleProvider } from "./contexts/RuleContext";


function App() {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <div id="app">
      <div className={"settings-panel settings-panel-left"}>
        <div id="main-settings">
          <RuleProvider>
            <RuleSettings />
          </RuleProvider>
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
