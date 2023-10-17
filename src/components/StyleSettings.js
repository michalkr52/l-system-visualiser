import "./styles/StyleSettings.css";
import { useContext } from "react";
import { DrawingSettingsContext } from "../contexts/DrawingSettingsContext";
import RangeNumberInput from "./RangeNumberInput";

function StyleSettings() {
    const { lineWidth, deltaAngle, setLineWidth, setDeltaAngle } = useContext(DrawingSettingsContext);

    return (
        <div id="style-settings">
            <RangeNumberInput label="Line width" value={lineWidth} action={setLineWidth}
                min={1} max={10} />
            <RangeNumberInput label="Rotation angle" value={deltaAngle} action={setDeltaAngle} 
                min={0.1} max={359.9} step={0.1} />
        </div>
    );
}

export default StyleSettings;