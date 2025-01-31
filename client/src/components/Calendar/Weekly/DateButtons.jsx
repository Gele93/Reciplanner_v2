import React from 'react'

function DateButtons({ handleDateMinusClick, handleDatePlusClick }) {
    return (
        <div className='date'>
            <button className='date-minus' onClick={handleDateMinusClick} type='button'>← prev</button>
            <button className='date-plus' onClick={handleDatePlusClick} type='button'>next →</button>
        </div>
    )
}

export default DateButtons