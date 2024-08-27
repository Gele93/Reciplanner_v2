import React from 'react'
import '../css/recipes.css'
import Filter from '../components/Filter'
import RecipeList from '../components/RecipeList'
import { useEffect, useState } from 'react'


function Recipes({ setIsRecipeModal, setIsRecipeModalAdd, setSelectedRecipe  }) {
    const [name, setName] = useState(``)
    const [filteredRecepies, setfilteredRecepies] = useState([])
    const [calories, setCalories] = useState(``)
    const [diet, setDiet] = useState(``)
    const [fetchable, setFetchable] = useState(false)
    const[mealType, setMealType]= useState(``)
    const[health, setHealth]=useState(``)


    return (
        <div className='recipes'>
            <Filter setName={setName} setDiet={setDiet}
                name={name} diet={diet} calories={calories} mealType={mealType}
                health={health}
                setCalories={setCalories} setFetchable={setFetchable}
                filteredRecepies={filteredRecepies} setfilteredRecepies={setfilteredRecepies}
                setMealType={setMealType} setHealth={setHealth}
            />
            <RecipeList setSelectedRecipe={setSelectedRecipe} filteredRecepies={filteredRecepies} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} />
        </div>
    )
}

export default Recipes