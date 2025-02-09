import React from 'react'
import "../../css/ConfirmToast.css"

function ConfirmToast({ confirmFunction, toastText, setIsConfirmToast, recipeToDelete, toastHeader }) {
    return (
        <div className='confirm-toast-modal'>
            <div className='confirm-toast'>
                <div className='toast-header'>
                    {toastHeader}
                </div>
                <div className='toast-body'>
                    <p className='toast-text'>
                        {toastText}
                    </p>
                    <div className='buttons-container'>
                        <button className='toast-button confirm' onClick={() => confirmFunction(recipeToDelete)}>Confirm</button>
                        <button className='toast-button cancel' onClick={() => setIsConfirmToast(false)} >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmToast