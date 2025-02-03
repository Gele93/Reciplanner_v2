import React from 'react'

function ActiveRecipe({ recipe }) {
    return (
        <div className='active-recipe'>
            <img src={recipe.image} alt="Original Image" onError={(e) => e.target.src = "/altfood.png"} />
            <div>{recipe.label}</div>
            <div>{recipe.startDate}</div>
            <div>{recipe.yield} yields</div>
            <div>{recipe.mealTypes.join(" - ")}</div>
            <div className='buttons'>
                <button className='edit'>Edit</button>
                <button className='delete'>Delete</button>
            </div>
        </div>)
}

export default ActiveRecipe