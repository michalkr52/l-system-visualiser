import "./styles/RecipeCard.css";
import { useState } from "react";

function RecipeCard(props) {
    const { recipe, onLoad } = props;
    const { name, group, notes, axiom, rules, angle, tokens, lengthFactor, widthFactor, imageName } = recipe;
    const [ expanded, setExpanded ] = useState(false);

    const imageDirPath = process.env.PUBLIC_URL + "/recipe-icons/";
    const imagePath = imageName ? imageDirPath + imageName : imageDirPath + "recipe-placeholder.png";

    return (
        <div className="recipe-card">
            <div className="recipe-main">
                <div className="recipe-card-left">
                    <div className="recipe-name">{name}</div>
                    { group ? 
                        <div className="recipe-group">{group}</div>
                    : "" }
                    <div className="recipe-tokens">Tokens: {tokens}</div>
                </div>
                <button className="button recipe-load-button" onClick={onLoad}>Load</button>
                <img className="recipe-image" src={imagePath} alt={name} />
                { expanded ?
                    <button className="button recipe-expand" onClick={() => setExpanded(false)}>&#x25B2;</button>
                :
                    <button className="button recipe-expand" onClick={() => setExpanded(true)}>&#x25BC;</button>
                }
            </div>
            { expanded ?
                <div className="recipe-extended" >
                    <hr />
                    {notes !== null ?
                        <div className="recipe-notes">{notes}</div>
                    : null}
                    <div className="recipe-extended-settings">
                        <div className="recipe-extended-settings-left">
                            <div className="recipe-axiom">Axiom: {axiom}</div>
                            {angle !== null ?
                                <div className="recipe-angle">Angle: {angle}&#176;</div>
                            : null }
                            {lengthFactor !== null ?
                                <div className="recipe-length-factor">Length factor: {lengthFactor}</div>
                            : null }
                        </div>
                        <div className="recipe-rules">
                            Rules: {rules.map((rule, index) => {
                                return (
                                    <div key={index}>{rule.predecessor} &rarr; {rule.successor}</div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            : null }
        </div>
    );
}

export default RecipeCard;