import React from 'react'
import SlidingRecipe from './SlidingRecipe'

function Slide({ randomIngredient, recipes, openModal }) {
    return (
        <div className='slide-wraper'>
            <div className='slide-title'> {`Dishes with ${randomIngredient}`} </div>
            <div className='slide-container'>
                <div className='slide-elements'>
                    {recipes.map((recipe) => (
                        <SlidingRecipe  key={recipe.uri} recipe={recipe} openModal={openModal} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slide