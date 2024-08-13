import React from 'react'
import '../css/recipes.css'
import Filter from './Filter'
import RecipeList from './RecipeList'

function Recipes() {
    return (
        <div className='recipes'>
            <Filter />

            <RecipeList />

        </div>
    )
}

export default Recipes