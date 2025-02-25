import React from 'react'
import '../css/recipes.css'
import Filter from '../components/Recipes/Filter'
import RecipeList from '../components/Recipes/RecipeList'
import { useEffect, useState } from 'react'


function Recipes({ openAddModal  }) {
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
            <RecipeList openAddModal={openAddModal} filteredRecepies={filteredRecepies}/>
        </div>
    )
}

export default Recipes