import { useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


function OutputCanvas(props) {
    const canvasRef = useRef(null);
    const { dark, getColour } = useContext(ThemeContext);
    let ctx = null;

    useEffect(() => {
        ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = getColour("bg-canvas");
        ctx.fillRect(0, 0, props.width, props.height);
    }, []);

    return (
        // todo: variable size, responsive (this one fits a 1200px wide app)
        <canvas ref={canvasRef} id="output-canvas" width={props.width} height={props.height}></canvas>
    );
}

export default OutputCanvas;