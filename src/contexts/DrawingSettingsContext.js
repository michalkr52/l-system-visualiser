import { createContext } from 'react';
import { useState } from 'react';

export const DrawingSettingsContext = createContext();

export function DrawingSettingsProvider(props) {
    const [lineWidth, setLineWidth] = useState(3);
    const [deltaAngle, setDeltaAngle] = useState(90);

    return (
        <DrawingSettingsContext.Provider value={{
            lineWidth: lineWidth,
            deltaAngle: deltaAngle,
            setLineWidth: setLineWidth,
            setDeltaAngle: setDeltaAngle
        }}>
            {props.children}
        </DrawingSettingsContext.Provider>
    );
}