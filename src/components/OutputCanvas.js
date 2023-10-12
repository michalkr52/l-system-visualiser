import { useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function OutputCanvas(props) {
    const { dark, getColour } = useContext(ThemeContext);
    const { output, displayedStep } = useContext(AlgorithmContext);
    const canvasRef = useRef(null);
    let lineWidth = 3;
    let lineLength = 20;
    let scaleMultiplier = 0.85;

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = getColour("bg-canvas");
        ctx.setTransform(1, 0, 0, 1, 0, 0);                 // default origin, top-left is (0, 0)
        ctx.fillRect(0, 0, props.width, props.height);
    }

    const measureDrawingDimensions = () => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null || output === null || output.length == 0) return;
        let x = 0, y = 0, angle = 0;
        let minX = 0, maxX = 0, minY = 0, maxY = 0;
        for (let symbol of output[displayedStep]) {
            switch (symbol) {
                case "F":
                    x += lineLength * Math.cos(angle);
                    y += lineLength * Math.sin(angle);
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                    break;
                case "+":
                    angle += Math.PI / 2;
                    break;
                case "-":
                    angle -= Math.PI / 2;
                    break;
            }
        }
        return { minX, maxX, minY, maxY };
    }

    useEffect(() => {
        clearCanvas();
    }, []);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null || output === null || output.length == 0) return;
        clearCanvas();
        // Initially F will mean forward, + means turn right, - means turn left
        // Later expand to include other commands, symbols, colours
        let x = 0, y = 0, angle = 0;
        let { minX, maxX, minY, maxY } = measureDrawingDimensions();
        let scale = Math.min(props.width / (maxX - minX), props.height / (maxY - minY)) * scaleMultiplier;
        ctx.setTransform(scale, 0, 0, scale, props.width / 2, props.height / 2);    // origin set to center of canvas
        ctx.translate(-minX - (maxX - minX) / 2, -minY - (maxY - minY) / 2);        // center drawing
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = getColour("text-primary");
        for (let symbol of output[displayedStep]) {
            switch (symbol) {
                case "F":
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    x += lineLength * Math.cos(angle);
                    y += lineLength * Math.sin(angle);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    break;
                case "+":
                    angle += Math.PI / 2;
                    break;
                case "-":
                    angle -= Math.PI / 2;
                    break;
            }
        }
    }, [output, dark]);

    return (
        // todo: variable size, responsive (this one fits a 1200px wide app)
        <canvas ref={canvasRef} id="output-canvas" width={props.width} height={props.height}></canvas>
    );
}

export default OutputCanvas;