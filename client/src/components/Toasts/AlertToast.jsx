import React from 'react'
import "../../css/AlertToast.css"

function AlertToast({ alertToastText, isAlertToast, setIsAlertToast }) {
    return (
        <div className={`alert-toast ${isAlertToast ? "show" : ""}`}>
            <div className='toast-body'>
                <p className='toast-text'>
                    {alertToastText}
                </p>
                <div className='buttons-container'>
                        <button className='toast-button-ok' onClick={() => setIsAlertToast(false)}>Ok</button>
                    </div>
            </div>
        </div>
    )
}

export default AlertToast