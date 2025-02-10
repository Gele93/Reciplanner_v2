import React from 'react'
import { shortenTitle } from '../../scripts'

function SlidingRecipe({recipe, openModal}) {
    return (
        <div className='slide-recipe' onClick={() => openModal(recipe)}>
            <h2 className='slide-recipe-title'>{shortenTitle(recipe.label, 20)}</h2>
            <img className='slide-recipe-img' src={recipe.image}></img>
            <div className='slide-recipe-details'>
                <h3 className='slide-recipe-detail'>{recipe.totalTime} mins</h3>
                <h3 className='slide-recipe-detail'>{Math.round(recipe.calories)} kcal</h3>
            </div>
            <div className='label-container'>
                {recipe.dietLabels.map((label, i) => (
                    <h3 key={i} className='recipe-labels'>{label}</h3>
                ))}
            </div>
        </div>
    )
}

export default SlidingRecipe