import { createContext } from 'react';
import { useState } from 'react';

// default context values
export const DrawingSettingsContext = createContext({
    
});

export function DrawingSettingsProvider(props) {
    const [lineLength, setLineLength] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);
    const [angle, setAngle] = useState(0);
    

    return (
        <AlgorithmContext.Provider value={{
            
        }}>
            {props.children}
        </AlgorithmContext.Provider>
    );
}