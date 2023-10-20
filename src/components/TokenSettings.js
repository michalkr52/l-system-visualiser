import "./styles/TokenSettings.css";
import { useContext } from "react";
import { DrawingSettingsContext } from "../contexts/DrawingSettingsContext";
import TokenInput from "./TokenInput";

function TokenSettings() {
    const { tokens, setTokens, resetTokens } = useContext(DrawingSettingsContext);

    return (
        <div id="token-settings">
            {
                Object.entries(tokens).map((token, index) => {
                    let key = token[0];
                    let value = token[1];
                    return (
                        <TokenInput key={index} tokenKey={key} label={value.label}
                            tokens={tokens} setAction={setTokens} />
                    );
                })
            }
            <button className="button revert-button" onClick={() => resetTokens()}>Revert to default</button>
        </div>
    );
}

export default TokenSettings;