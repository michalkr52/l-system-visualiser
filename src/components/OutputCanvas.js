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
    const { output, inputConfirmed, displayedStep } = useContext(AlgorithmContext);
    const { lineWidth, deltaAngle, startingAngle, lengthFactor, tokens } = useContext(DrawingSettingsContext);
    const [ canvasWidth, setCanvasWidth ] = useState(600);
    const [ canvasHeight, setCanvasHeight ] = useState(500);
    const [ pathSegments, setPathSegments ] = useState([]);
    const [ pathDimensions, setPathDimensions ] = useState([]);         // rectangle [x1, y1, x2, y2]
    const [ currentZoom, setCurrentZoom ] = useState(0.8);
    const [ viewportPan, setViewportPan ] = useState({ x: 0, y: 0 });
    const [ isPanning, setIsPanning ] = useState(false);
    const canvasRef = useRef(null);
    const mousePosRef = useRef({ x: 0, y: 0 });              // (0, 0) is at the center of the canvas
    const lastMousePosRef = useRef({ x: 0, y: 0 });  
    const scaleRef = useRef(1);
    const initialLineLength = 30;
    const initialZoom = 0.8;
    const minZoom = 0.25;
    const maxZoom = 30;
    const zoomSensitivity = 0.001;

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

    const transformCanvas = () => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null || pathDimensions.length === 0) return;

        let [minX, minY, maxX, maxY] = pathDimensions;
        let scale = Math.min(canvasWidth / (maxX - minX), canvasHeight / (maxY - minY));
        let zoom = scale * currentZoom;
        scaleRef.current = scale;

        // scale path to canvas, center and apply panning
        ctx.setTransform(zoom, 0, 0, zoom, canvasWidth / 2, canvasHeight / 2);      // origin set to center of canvas
        ctx.translate(-minX - (maxX - minX) / 2, -minY - (maxY - minY) / 2);        // center drawing
        ctx.translate(-viewportPan.x, -viewportPan.y);    // panning
        
        ctx.lineWidth = lineWidth / (currentZoom + 0.4) * ((Math.min(maxX - minX, maxY - minY) / 1000) + 1);
    }

    const drawPath = () => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null) return;

        clearCanvas();
        transformCanvas();
        ctx.strokeStyle = getColour("text-primary");

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
    }

    const handleMouseMove = (event) => {
        if (canvasRef.current) {
            let windowMousePos = { x: event.clientX, y: event.clientY };
            let canvasTopLeftPos = { x: canvasRef.current.offsetLeft, y: canvasRef.current.offsetTop };

            // (0, 0) at the center of the canvas
            let mousePosX = windowMousePos.x - canvasTopLeftPos.x - canvasWidth / 2;
            let mousePosY = windowMousePos.y - canvasTopLeftPos.y - canvasHeight / 2;
            mousePosRef.current = { x: mousePosX, y: mousePosY };

            if (isPanning) handleMousePanning(event);
        }
    }

    const handleMousePanning = (event) => {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx === null) return;

        const lastMousePos = lastMousePosRef.current;
        const currentMousePos = { x: event.pageX, y: event.pageY };
        lastMousePosRef.current = currentMousePos;

        const mouseDiffX = currentMousePos.x - lastMousePos.x;
        const mouseDiffY = currentMousePos.y - lastMousePos.y;
        const panningX = viewportPan.x - mouseDiffX / (scaleRef.current * currentZoom);
        const panningY = viewportPan.y - mouseDiffY / (scaleRef.current * currentZoom);
        setViewportPan({ x: panningX, y: panningY });
    }

    const handleWheel = (event) => {
        if (inputConfirmed) {
            event.preventDefault();
    
            let zoomAmplitude = 1 - event.deltaY * zoomSensitivity;
            let zoom = zoomAmplitude * currentZoom;
            if (zoom < minZoom) zoom = minZoom;
            else if (zoom > maxZoom) zoom = maxZoom;

            let viewportCenterDeltaX = (mousePosRef.current.x / currentZoom) * (1 - 1 / zoomAmplitude) / scaleRef.current;
            let viewportCenterDeltaY = (mousePosRef.current.y / currentZoom) * (1 - 1 / zoomAmplitude) / scaleRef.current;
            let viewportCenterX = viewportPan.x + viewportCenterDeltaX;
            let viewportCenterY = viewportPan.y + viewportCenterDeltaY;

            setCurrentZoom(zoom);
            setViewportPan({ x: viewportCenterX, y: viewportCenterY });
        }
    }
    
    const handleMouseUp = () => {
        setIsPanning(false);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const startPanning = (event) => {
        setIsPanning(true);
        document.addEventListener("mouseup", handleMouseUp);
        lastMousePosRef.current = { x: event.pageX, y: event.pageY };
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [handleMouseMove]);

    useEffect(() => {
        window.addEventListener("wheel", handleWheel);
        return () => {
            window.removeEventListener("wheel", handleWheel);
        }
    }, [handleWheel]);

    // Recalculate and redraw: dependencies change the path
    useEffect(() => {
        calculatePath();
        drawPath();
    }, [output, deltaAngle, startingAngle, tokens, lengthFactor]);

    // Only redraw: dependencies don't change the path
    useEffect(() => {
        drawPath();
    }, [dark]);

    // Reset zoom and pan on input change
    useEffect(() => {
        setCurrentZoom(initialZoom);
        setViewportPan({ x: 0, y: 0 });
    }, [inputConfirmed]);

    // Scale panning to new canvas scale
    useEffect(() => {
        
    }, [displayedStep]);

    return (
        <canvas ref={canvasRef} onMouseDown={startPanning} id="output-canvas"></canvas>
    );
}

export default OutputCanvas;