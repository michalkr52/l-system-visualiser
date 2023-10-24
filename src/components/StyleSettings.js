import "./styles/StyleSettings.css";
import { useContext } from "react";
import { DrawingSettingsContext } from "../contexts/DrawingSettingsContext";
import RangeNumberInput from "./RangeNumberInput";

function StyleSettings() {
    const { lineWidth, deltaAngle, startingAngle, lengthFactor, tokens,
        setLineWidth, setDeltaAngle, setStartingAngle, setLengthFactor} = useContext(DrawingSettingsContext);

    return (
        <div id="style-settings">
            <RangeNumberInput label="Line width" value={lineWidth} action={setLineWidth}
                min={1} max={10} />
            <RangeNumberInput label="Starting angle" value={startingAngle} action={setStartingAngle} 
                min={-180} max={180} step={0.1} />
            <RangeNumberInput 
                label={"Rotation angle (" + tokens.turnLeft.char + ", " + tokens.turnRight.char + ")"} 
                value={deltaAngle} action={setDeltaAngle} min={0.1} max={359.9} step={0.1} />
            <RangeNumberInput 
                label={"Length factor (" + tokens.multLength.char + ", " + tokens.divLength.char + ")"}
                value={lengthFactor} action={setLengthFactor} min={0.01} max={5} step={0.01} />
        </div>
    );
}

export default StyleSettings;