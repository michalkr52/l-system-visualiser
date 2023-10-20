import "./styles/RangeNumberInput.css";

function RangeNumberInput(props) {
    const defaultStep = 1;
    const defaultMin = 0;
    const defaultMax = 100;

    const setValue = (value) => {
        if (value < props.min) props.action(props.min);
        else if (value > props.max) props.action(props.max);
        else props.action(value);
    };

    return (
        <div className={"range-input"}>
            <div className="range-label input-label">{props.label}</div>
            <input type="range" value={props.value} step={props.step || defaultStep}
                min={props.min || defaultMin} max={props.max || defaultMax} 
                onChange={e => setValue(e.target.value)} />
            <input type="number" value={props.value} step={props.step || defaultStep}
                min={props.min || defaultMin} max={props.max || defaultMax} 
                onChange={e => setValue(e.target.value)} />
        </div>
    );
}

export default RangeNumberInput;