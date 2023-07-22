import "./App.css";
import OutputCanvas from "./components/OutputCanvas";
import RuleSettings from "./components/RuleSettings";


function App() {
  return (
    <div id="app">
      <div className={"settings-panel settings-panel-left"}>
        <div id="main-settings">
          <RuleSettings />
        </div>
      </div>
      <div className="output-canvas-container">
        <OutputCanvas />
      </div>
      <div className={"settings-panel settings-panel-right"}>

      </div>
    </div>
  );
}

export default App;
