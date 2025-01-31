import React from 'react'

function Header({handleCloseModal, selectedRecipe}) {
    return (
        <div className="modal-header">
            <h2 className='modal-header-title'>{selectedRecipe.label}</h2>
            <button onClick={handleCloseModal} className="modal-close-button">❌</button>
        </div>
    )
}

export default Header