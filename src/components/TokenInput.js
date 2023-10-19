import "./styles/TokenInput.css";

function TokenInput(props) {
    return (
        <div className="token-input">
            <div className="token-label input-label">{props.label}</div>
            <input type="text" value={props.tokens[props.tokenKey].char} maxLength={1}
                onChange={e => props.setAction(prevState => {
                    return {...prevState, [props.tokenKey]: {
                        char: e.target.value,
                        label: prevState[props.tokenKey].label
                    }};
                })} />
        </div>
    );
}

export default TokenInput;