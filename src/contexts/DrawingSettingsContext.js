import { createContext } from 'react';
import { useState } from 'react';

export const DrawingSettingsContext = createContext();

export function DrawingSettingsProvider(props) {
    const initialTokenState = {
        forwardDraw: {char: "F", label: "Forward (draw)"},
        forwardNoDraw: {char: "G", label: "Forward (no draw)"},
        turnLeft: {char: "-", label: "Rotate left"},
        turnRight: {char: "+", label: "Rotate right"},
        pushPos: {char: "[", label: "Push position"},
        popPos: {char: "]", label: "Pop position"},
        multLength: {char: ">", label: "Multiply length"},
        divLength: {char: "<", label: "Divide length"}
    };

    const [lineWidth, setLineWidth] = useState(3);
    const [startingAngle, setStartingAngle] = useState(-90);   // [deg]
    const [deltaAngle, setDeltaAngle] = useState(90);   // [deg]
    const [lengthFactor, setLengthFactor] = useState(1);
    const [tokens, setTokens] = useState(initialTokenState);

    return (
        <DrawingSettingsContext.Provider value={{
            lineWidth: lineWidth,
            startingAngle: startingAngle,
            deltaAngle: deltaAngle,
            tokens: tokens,
            lengthFactor: lengthFactor,
            setLineWidth: setLineWidth,
            setStartingAngle: setStartingAngle,
            setDeltaAngle: setDeltaAngle,
            setLengthFactor: setLengthFactor,
            setTokens: setTokens,
            resetTokens: () => setTokens(initialTokenState)
        }}>
            {props.children}
        </DrawingSettingsContext.Provider>
    );
}