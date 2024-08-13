import React from 'react'
import "../css/filter.css"

function Filter() {
    return (
        <div className='filter-container'>
            <h1 className='filter-title'>Filter recipes</h1>
            <form className='filter-form'>
                <div className='filter-row'>
                    <label className='filter-label'>Name</label>
                    <input className='filter-input' type='text' />
                </div>
                <div className='filter-row'>
                    <label className='filter-label'>NameName</label>
                    <input className='filter-input' type='text' />
                </div>
                <div className='filter-row'>
                    <label className='filter-label'>NameNamame</label>
                    <input className='filter-input' type='text' />
                </div>
                <div className='filter-row'>
                    <label className='filter-label'>NameName</label>
                    <input className='filter-input' type='text' />
                </div>
            </form>
        </div>
    )
}

export default Filter