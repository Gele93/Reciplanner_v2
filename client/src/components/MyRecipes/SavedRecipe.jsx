import React from 'react'

function SavedRecipe({ recipe }) {
    return (
        <div className='saved-recipe'>
            <img src={recipe.image} alt="Original Image" onError={(e) => e.target.src = "/altfood.png"} />
            <div>{recipe.label}</div>
            <div>{recipe.dietLabels[0]}</div>
            <div>{recipe.totalTime} mins</div>
            <div>{recipe.caloriesPerServing} cal</div>
            <div>
                <button className='add'>Add to calendar</button>
            </div>
        </div>
    )
}

export default SavedRecipe