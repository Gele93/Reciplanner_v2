import React from 'react'

function Footer({ handleAddRecipe, handleEditRecipe, fetchDeleteRecipe, isRecipeModalAdd }) {
    return (
        <div className="modal-footer">
            {isRecipeModalAdd ? (
                <button className="modal-footer-Add" onClick={handleAddRecipe}>Add Recipe</button>)
                : (
                    <div className='modal-footer-edit-delete'>
                        <button className="modal-footer-Edit" onClick={handleEditRecipe}>Edit Recipe</button>
                        <button className="modal-footer-Delete" onClick={fetchDeleteRecipe}>Delete Recipe</button>
                    </div>
                )}
        </div>
    )
}

export default Footer