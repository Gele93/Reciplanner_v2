import { React, useEffect, useState } from 'react'

function SavedRecipe({ recipe, openAddModal }) {

    return (
        <div className='saved-recipe'>
            <img
                src={recipe.image}
                alt="Recipe"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/altfood.png"
                }}
            />
            <div>{recipe.label}</div>
            <div>{recipe.dietLabels[0]}</div>
            <div>{recipe.totalTime} mins</div>
            <div>{recipe.caloriesPerServing} cal</div>
            <div>
                <button onClick={() => openAddModal(recipe)}  className='add'>Add to calendar</button>
            </div>
        </div>
    )
}

export default SavedRecipe