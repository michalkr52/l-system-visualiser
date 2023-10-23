import "./styles/RecipeLoader.css";
import data from "../recipes.json";
import { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { DrawingSettingsContext } from "../contexts/DrawingSettingsContext";
import { AlgorithmContext } from "../contexts/AlgorithmContext";

function RecipeLoader() {
    const { setDeltaAngle } = useContext(DrawingSettingsContext);
    const { rules, setAxiom, setRules, onConfirm } = useContext(AlgorithmContext);

    const recipes = data.recipes;
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const loadRecipe = (recipe) => {
        setIsLoading(true);
        setDeltaAngle(recipe.angle);
        setAxiom(recipe.axiom);
        setRules(recipe.rules);
    };

    useEffect(() => {
        if (isLoading) {
            onConfirm();
            handleCloseModal();
            setIsLoading(false);
        }
    }, [rules]);

    return (
        <div id="recipe-loader">
            <button onClick={handleOpenModal}>Load from recipe</button>
            <ReactModal id="recipe-modal" isOpen={isModalOpen} ariaHideApp={false}>
                <div id="recipe-list">
                    {recipes.map((recipe, index) => {
                        return (
                            <div key={index} className="recipe-entry" onClick={loadRecipe.bind(null, recipe)}>
                                <div className="recipe-name">{recipe.name}</div>
                            </div>
                        );
                    })}
                </div>
                <button onClick={handleCloseModal} className="close-button">{"\u00d7"}</button>
            </ReactModal>
        </div>
    );
}

export default RecipeLoader;