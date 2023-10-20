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
        popPos: {char: "]", label: "Pop position"}
    };

    const [lineWidth, setLineWidth] = useState(3);
    const [deltaAngle, setDeltaAngle] = useState(90);
    const [tokens, setTokens] = useState(initialTokenState);

    return (
        <DrawingSettingsContext.Provider value={{
            lineWidth: lineWidth,
            deltaAngle: deltaAngle,
            tokens: tokens,
            setLineWidth: setLineWidth,
            setDeltaAngle: setDeltaAngle,
            setTokens: setTokens,
            resetTokens: () => setTokens(initialTokenState)
        }}>
            {props.children}
        </DrawingSettingsContext.Provider>
    );
}