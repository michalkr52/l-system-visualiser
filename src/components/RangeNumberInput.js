import "./styles/RangeNumberInput.css";

function RangeNumberInput(props) {
    const defaultStep = 1;
    const defaultMin = 0;
    const defaultMax = 100;

    return (
        <div className={"range-input " + props.className}>
            <div className="range-label">{props.label}</div>
            <input type="range" value={props.value} onChange={e => props.action(e.target.value)}
                min={props.min || defaultMin} max={props.max || defaultMax} 
                step={props.step || defaultStep} />
            <input type="number" value={props.value} onChange={e => props.action(e.target.value)}
                min={props.min || defaultMin} max={props.max || defaultMax} 
                step={props.step || defaultStep} />
        </div>
    );
}

export default RangeNumberInput;