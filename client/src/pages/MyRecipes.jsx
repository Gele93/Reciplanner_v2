import { React, useState, useEffect } from 'react'
import "../css/myrecipes.css"
import SavedRecipe from '../components/MyRecipes/SavedRecipe'
import ActiveRecipe from '../components/MyRecipes/ActiveRecipe'
import { calculateEndDateOfRecipe } from '../scripts'

function MyRecipes({ recipes, setRecipes }) {

    const [activeRecipes, setActiveRecipes] = useState([])
    const [isSavedShown, setIsSavedShown] = useState(true)

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

    console.log(activeRecipes)

    return (
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
                {isSavedShown ?
                    recipes.map(recipe => (
                        <SavedRecipe recipe={recipe} />
                    ))
                    :
                    activeRecipes.map(recipe => (
                        <ActiveRecipe recipe={recipe} />
                    ))
                }

            </div>
        </div>
    )
}

export default MyRecipes