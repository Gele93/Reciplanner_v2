import React from 'react'

function Description({ selectedRecipe, adjustedVitaminA, adjustedVitaminC }) {
    return (
        <div className="modal-description">
            <div className='container-title'>
                <strong>Descriptions</strong>
            </div>
            <div className='box-text-container'>
                <div><strong>Source:</strong> {selectedRecipe.source}</div>
                <div><strong>Cuisine:</strong> {selectedRecipe.cuisineType}</div>
                <div><strong>Dish Type:</strong> {selectedRecipe.dishType}</div>
                <div><strong>Vitamins:</strong> Vitamin A: {adjustedVitaminA.toFixed(2)}Î¼g, Vitamin C: {adjustedVitaminC.toFixed(2)}mg</div>
                <div><strong>Diet Labels:</strong> {selectedRecipe.dietLabels.join(', ')}</div>
                <div><strong>Health Labels:</strong> {selectedRecipe.healthLabels.join(', ')}</div>
                <a className='full-recipe-button' href={selectedRecipe.url}>View Full Recipe</a>
            </div>
        </div>
    )
}

export default Description