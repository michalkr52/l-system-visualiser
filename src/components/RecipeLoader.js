import "./styles/RecipeLoader.css";
import data from "../assets/recipes.json";
import { useContext, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { DrawingSettingsContext } from "../contexts/DrawingSettingsContext";
import { AlgorithmContext } from "../contexts/AlgorithmContext";
import RecipeCard from "./RecipeCard";

function RecipeLoader() {
    const { setDeltaAngle, resetTokens } = useContext(DrawingSettingsContext);
    const { rules, setAxiom, setRules, onConfirm } = useContext(AlgorithmContext);

    const recipes = data.recipes;
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const loadRecipe = (recipe) => {
        setIsLoading(true);
        resetTokens();
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
            <button className="button" onClick={handleOpenModal}>Load from recipe</button>
            <ReactModal id="recipe-modal" isOpen={isModalOpen} ariaHideApp={false}
                overlayClassName={"recipe-modal-overlay"} className={"modal"}>
                <div className="recipe-list-title">Recipes</div>
                <div id="recipe-list">
                    {recipes.map((recipe, index) => {
                        return (
                            <RecipeCard key={index} recipe={recipe} onLoad={() => loadRecipe(recipe)} />
                        );
                    })}
                </div>
                <button onClick={handleCloseModal} className="button close-button">&#xd7;</button>
            </ReactModal>
        </div>
    );
}

export default RecipeLoader;