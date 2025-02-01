import React from 'react'

function DateButtons({ handleMonthMinusClick, handleMonthPlusClick }) {
    return (
        <>
            <button onClick={handleMonthMinusClick} className='date-minus-month' type='button'>← prev</button>
            <button onClick={handleMonthPlusClick} className='date-plus-month' type='button'>next →</button>
        </>
    )
}

export default DateButtons