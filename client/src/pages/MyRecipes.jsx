import { React, useState, useEffect } from 'react'
import "../css/myrecipes.css"
import SavedRecipe from '../components/MyRecipes/SavedRecipe'
import ActiveRecipe from '../components/MyRecipes/ActiveRecipe'
import ConfirmToast from '../components/Toast/ConfirmToast'
import { calculateEndDateOfRecipe } from '../scripts'

function MyRecipes({ recipes, setRecipes, setSelectedRecipe, setIsRecipeModal, setIsRecipeModalAdd }) {

    const [activeRecipes, setActiveRecipes] = useState([])
    const [isSavedShown, setIsSavedShown] = useState(true)
    const [isConfirmToast, setIsConfirmToast] = useState(false)
    const [recipeToDelete, setRecipeToDelete] = useState()
    const [toastText, setToastText] = useState("")
    const [toastHeader, setToastHeader] = useState("")

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`https://localhost:7034/Recipes`, {
                    method: "GET",
                    credentials: "include",
                })
                if (!response.ok) {
                    throw new Error("fetching recipes went wrong")
                }
                const recipes = await response.json()
                setRecipes(recipes)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRecipes()
    }, [])

    useEffect(() => {
        let updatedActiveRecipes = []
        if (recipes) {
            const today = new Date()
            recipes.map(r => {
                if (today <= calculateEndDateOfRecipe(r)) {
                    updatedActiveRecipes.push(r)
                }
            })
        }
        setActiveRecipes(updatedActiveRecipes)
    }, [recipes])


    const handleDeleteRecipe = async (recipe) => {
        try {
            const response = await fetch(`https://localhost:7034/Recipes/${recipe.id}`, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Recipe deleted successfully!');
            } else {
                console.error('Failed to delete recipe');
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
        } finally {
            let updatedRecipes = [...recipes]
            updatedRecipes = updatedRecipes.filter(r => r.id != recipe.id)
            setRecipes(updatedRecipes)
            setIsConfirmToast(false)
        }
    };


    useEffect(() => {
        if (recipeToDelete) {
            setToastText(`Would you like to delete ${recipeToDelete.label} from your recipes and calendar?`)
            setToastHeader(`Deleting ${recipeToDelete.label}`)
        }
    }, [recipeToDelete])

    return (
        <>
            <div className='my-recipes-container'>
                <div className='my-recipes-header'>
                    <div className='saved-recipes-button-container'>
                        <button className={`saved-recipes-button ${isSavedShown && "is-active"}`}
                            onClick={() => setIsSavedShown(true)}>
                            Saved recipes
                        </button>
                    </div>
                    <div className='active-recipes-button-container'>
                        <button className={`active-recipes-button ${!isSavedShown && "is-active"}`}
                            onClick={() => setIsSavedShown(false)}>
                            Active recipes
                        </button>
                    </div>
                </div>
                <div className='my-recipes'>
                    {
                        isSavedShown ?
                            recipes.map(recipe => (
                                <SavedRecipe key={recipe.id} recipe={recipe} />
                            ))
                            :
                            activeRecipes.map(recipe => (
                                <ActiveRecipe key={recipe.id}
                                    recipe={recipe}
                                    setSelectedRecipe={setSelectedRecipe}
                                    setIsRecipeModal={setIsRecipeModal}
                                    setIsRecipeModalAdd={setIsRecipeModalAdd}
                                    isConfirmToast={isConfirmToast}
                                    setIsConfirmToast={setIsConfirmToast}
                                    setRecipeToDelete={setRecipeToDelete}
                                />
                            ))
                    }
                </div>

            </div>
            {isConfirmToast &&
                <ConfirmToast
                    confirmFunction={handleDeleteRecipe}
                    recipeToDelete={recipeToDelete}
                    toastText={toastText}
                    toastHeader={toastHeader}
                    setIsConfirmToast={setIsConfirmToast}
                />}
        </>
    )
}

export default MyRecipes