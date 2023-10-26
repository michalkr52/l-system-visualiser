import "./styles/OutputCanvas.css";
import { useRef, useEffect, useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AlgorithmContext } from "../contexts/AlgorithmContext";
import { DrawingSettingsContext } from "../contexts/DrawingSettingsContext";

function OutputCanvas(props) {
    const { dark, getColour } = useContext(ThemeContext);
    const { output, displayedStep } = useContext(AlgorithmContext);
    const { lineWidth, deltaAngle, startingAngle, lengthFactor, tokens } = useContext(DrawingSettingsContext);
    const [ canvasWidth, setCanvasWidth ] = useState(600);
    const [ canvasHeight, setCanvasHeight ] = useState(500);
    const canvasRef = useRef(null);
    const initialLineLength = 30;
    let scaleMultiplier = 0.85;

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = getColour("bg-canvas");
        ctx.setTransform(1, 0, 0, 1, 0, 0);                 // default origin, top-left is (0, 0)
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    const measureDrawingDimensions = () => {
        let x = 0, y = 0, angle = startingAngle / 180 * Math.PI, lineLength = initialLineLength;
        let posStack = [];
        let minX = 0, maxX = 0, minY = 0, maxY = 0;

        for (let symbol of output[displayedStep]) {
            switch (symbol) {
                case tokens.forwardDraw.char:
                case tokens.forwardNoDraw.char:
                    x += lineLength * Math.cos(angle);
                    y += lineLength * Math.sin(angle);
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                    break;
                case tokens.turnRight.char:
                    angle += Math.PI * (deltaAngle / 180);
                    break;
                case tokens.turnLeft.char:
                    angle -= Math.PI * (deltaAngle / 180);
                    break;
                case tokens.pushPos.char:
                    posStack.push({ 
                        x: x, y: y, angle: angle, lineLength: lineLength
                        });
                    break;
                case tokens.popPos.char:
                    let pos = posStack.pop();
                    x = pos.x;
                    y = pos.y;
                    angle = pos.angle;
                    lineLength = pos.lineLength;
                    break;
                case tokens.multLength.char:
                    lineLength *= lengthFactor;
                    break;
                case tokens.divLength.char:
                    lineLength /= lengthFactor;
                    break;
            }
        }

        return { minX, maxX, minY, maxY };
    }

    const draw = () => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null || output === null || output.length === 0) return;

        let x = 0, y = 0, angle = startingAngle / 180 * Math.PI, lineLength = initialLineLength;
        let posStack = [];
        let { minX, maxX, minY, maxY } = measureDrawingDimensions();
        let scale = Math.min(canvasWidth / (maxX - minX), canvasHeight / (maxY - minY)) * scaleMultiplier;

        clearCanvas();
        ctx.setTransform(scale, 0, 0, scale, canvasWidth / 2, canvasHeight / 2);    // origin set to center of canvas
        ctx.translate(-minX - (maxX - minX) / 2, -minY - (maxY - minY) / 2);        // center drawing
        ctx.strokeStyle = getColour("text-primary");
        ctx.lineWidth = lineWidth;

        for (let symbol of output[displayedStep]) {
            switch (symbol) {
                case tokens.forwardDraw.char:
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    x += lineLength * Math.cos(angle);
                    y += lineLength * Math.sin(angle);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    break;
                case tokens.forwardNoDraw.char:
                    ctx.moveTo(x, y);
                    x += lineLength * Math.cos(angle);
                    y += lineLength * Math.sin(angle);
                    break;
                case tokens.turnRight.char:
                    angle += Math.PI * (deltaAngle / 180);
                    break;
                case tokens.turnLeft.char:
                    angle -= Math.PI * (deltaAngle / 180);
                    break;
                case tokens.pushPos.char:
                    posStack.push({ 
                        x: x, y: y, angle: angle, lineLength: lineLength
                     });
                    break;
                case tokens.popPos.char:
                    let pos = posStack.pop();
                    x = pos.x;
                    y = pos.y;
                    angle = pos.angle;
                    lineLength = pos.lineLength;
                    break;
                case tokens.multLength.char:
                    lineLength *= lengthFactor;
                    break;
                case tokens.divLength.char:
                    lineLength /= lengthFactor;
                    break;
            }
        }
    }

    const handleResize = () => {
        const canvasElement = canvasRef.current;
        setCanvasWidth(canvasElement.clientWidth);
        setCanvasHeight(canvasElement.clientHeight);
        canvasElement.width = canvasElement.clientWidth;
        canvasElement.height = canvasElement.clientHeight;
        clearCanvas();
    };

    useEffect(() => {
        handleResize();
        console.log(canvasWidth, canvasHeight);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);

    useEffect(() => {
        draw();
    }, [output, dark, lineWidth, deltaAngle, startingAngle, tokens, lengthFactor]);

    return (
        <canvas ref={canvasRef} id="output-canvas"></canvas>
    );
}

export default OutputCanvas;