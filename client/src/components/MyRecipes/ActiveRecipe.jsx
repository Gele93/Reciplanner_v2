import { React, useState } from 'react'

function ActiveRecipe({ recipe, setSelectedRecipe, setIsRecipeModal, setIsRecipeModalAdd, isConfirmToast, setIsConfirmToast, setRecipeToDelete }) {


  const handleEditRecipe = (recipe) => {
    setIsRecipeModal(true)
    setIsRecipeModalAdd(false)
    setSelectedRecipe(recipe)
  }

  const handleDeleteRecipe = (recipe) => {
    setRecipeToDelete(recipe)
    setIsConfirmToast(true)
  }

  return (
    <div className='active-recipe'>
      <img src={recipe.image} alt="Original Image" onError={(e) => e.target.src = "/altfood.png"} />
      <div>{recipe.label}</div>
      <div>{recipe.startDate}</div>
      <div>{recipe.yield} yields</div>
      <div>{recipe.mealTypes.join(" - ")}</div>
      <div className='buttons'>
        <button className='edit' onClick={() => handleEditRecipe(recipe)}>Edit</button>
        <button className='delete' onClick={() => handleDeleteRecipe(recipe)} >Delete</button>
      </div>
    </div>
  )
}

export default ActiveRecipe