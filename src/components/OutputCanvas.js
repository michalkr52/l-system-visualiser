import "./styles/OutputCanvas.css";
import { useRef, useEffect, useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { AlgorithmContext } from "../contexts/AlgorithmContext";
import { DrawingSettingsContext } from "../contexts/DrawingSettingsContext";

class PathSegment {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

function OutputCanvas(props) {
    const { dark, getColour } = useContext(ThemeContext);
    const { output, confirmed, displayedStep } = useContext(AlgorithmContext);
    const { lineWidth, deltaAngle, startingAngle, lengthFactor, tokens } = useContext(DrawingSettingsContext);
    const [ canvasWidth, setCanvasWidth ] = useState(600);
    const [ canvasHeight, setCanvasHeight ] = useState(500);
    const [ pathSegments, setPathSegments ] = useState([]);
    const [ pathDimensions, setPathDimensions ] = useState([]);         // rectangle [x1, y1, x2, y2]
    const canvasRef = useRef(null);
    const initialLineLength = 30;
    let scaleMultiplier = 0.8;

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = getColour("bg-canvas");
        ctx.setTransform(1, 0, 0, 1, 0, 0);                 // default origin, top-left is (0, 0)
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    const calculatePath = () => {
        if (output === null || output.length === 0) return;

        let x = 0, y = 0, angle = startingAngle / 180 * Math.PI, lineLength = initialLineLength;
        let minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE;
        let posStack = [];
        let newPathSegments = [];

        for (let symbol of output[displayedStep]) {
            switch (symbol) {
                case tokens.forwardDraw.char:
                    let x1 = x, y1 = y;
                    x += lineLength * Math.cos(angle);
                    y += lineLength * Math.sin(angle);
                    newPathSegments.push(new PathSegment(x1, y1, x, y));
                    break;
                case tokens.forwardNoDraw.char:
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

            minX = minX > x ? x : minX;
            minY = minY > y ? y : minY;
            maxX = maxX < x ? x : maxX;
            maxY = maxY < y ? y : maxY;
        }

        setPathSegments(newPathSegments);
        setPathDimensions([minX, minY, maxX, maxY]);
    }

    const scaleCanvasToPath = () => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null) return;

        let [minX, minY, maxX, maxY] = pathDimensions;
        let scale = Math.min(canvasWidth / (maxX - minX), canvasHeight / (maxY - minY)) * scaleMultiplier;

        ctx.setTransform(scale, 0, 0, scale, canvasWidth / 2, canvasHeight / 2);    // origin set to center of canvas
        ctx.translate(-minX - (maxX - minX) / 2, -minY - (maxY - minY) / 2);        // center drawing
    }

    const drawPath = () => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null) return;

        clearCanvas();
        scaleCanvasToPath();
        ctx.strokeStyle = getColour("text-primary");
        ctx.lineWidth = lineWidth;

        for (let segment of pathSegments) {
            ctx.beginPath();
            ctx.moveTo(segment.x1, segment.y1);
            ctx.lineTo(segment.x2, segment.y2);
            ctx.stroke();
        }
    }

    const handleResize = () => {
        const canvasElement = canvasRef.current;
        let newWidth = canvasElement.clientWidth;
        let newHeight;
        if (window.outerHeight <= 800 || window.outerWidth <= 900) newHeight = window.outerHeight - 150;
        else newHeight = 600;
        
        setCanvasWidth(newWidth);
        setCanvasHeight(newHeight);
        canvasElement.width = newWidth;
        canvasElement.height = newHeight;

        clearCanvas();
        if (output[displayedStep] !== undefined) drawPath();
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);

    // Recalculate and redraw: dependencies change the path
    useEffect(() => {
        calculatePath();
        drawPath();
    }, [output, deltaAngle, startingAngle, tokens, lengthFactor]);

    // Only redraw: dependencies don't change the path
    useEffect(() => {
        drawPath();
    }, [dark, lineWidth]);

    return (
        <canvas ref={canvasRef} id="output-canvas"></canvas>
    );
}

export default OutputCanvas;