import React from 'react'
import '../css/recipes.css'
import Filter from './Filter'
import RecipeList from './RecipeList'
import { useEffect, useState } from 'react'


function Recipes({ setIsRecipeModal, setIsRecipeModalAdd, setSelectedRecipe  }) {
    const [name, setName] = useState(``)
    const [filteredRecepies, setfilteredRecepies] = useState([])
    const [calories, setCalories] = useState(``)
    const [diet, setDiet] = useState(``)
    const [fetchable, setFetchable] = useState(false)


    return (
        <div className='recipes'>
            <Filter setName={setName} setDiet={setDiet}
                name={name} diet={diet} calories={calories}
                setCalories={setCalories} setFetchable={setFetchable}
                filteredRecepies={filteredRecepies} setfilteredRecepies={setfilteredRecepies}
            />
            <RecipeList setSelectedRecipe={setSelectedRecipe} filteredRecepies={filteredRecepies} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} />
        </div>
    )
}

export default Recipes