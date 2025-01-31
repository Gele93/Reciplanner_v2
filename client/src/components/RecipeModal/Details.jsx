import React from 'react'

function Details({ adjustedCalories, selectedRecipe, adjustedIngredients, adjustedFat, adjustedProtein, adjustedCarbs }) {
    return (
        <div className="details-container">
            <div className='details'>
                <div className='container-title'>
                    <strong>Meal Details</strong>
                </div>
                <div className='box-text-container'>
                    <h3> Calories: <span className='span'>{adjustedCalories} kcal ({Math.round(selectedRecipe.caloriesPerServing)} kcal / serving)</span></h3>
                    <h3>Preparation time: <span className='span'>{selectedRecipe.totalTime > 0 ? `${selectedRecipe.totalTime} mins` : 'No prep time'}</span></h3>
                    <div className='ingredients'>
                        <h3><strong>Ingredients:</strong></h3>
                        <ul>
                            {adjustedIngredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <h3 className='nutrition'><strong>Nutrition:</strong> Fat: <span className='span'>{adjustedFat.toFixed(2)}g, Protein: {adjustedProtein.toFixed(2)}g, Carbs: {adjustedCarbs.toFixed(2)}g</span></h3>
                </div>
            </div>
        </div>
    )
}

export default Details