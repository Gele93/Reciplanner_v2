import React from 'react'
import SlidingRecipe from './SlidingRecipe'

function Slide({ randomIngredient, recipes, openAddModal }) {
    return (
        <div className='slide-wraper'>
            <div className='slide-title'> {`Dishes with ${randomIngredient}`} </div>
            <div className='slide-container'>
                <div className='slide-elements'>
                    {recipes.map((recipe) => (
                        <SlidingRecipe  key={recipe.uri} recipe={recipe} openAddModal={openAddModal} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slide