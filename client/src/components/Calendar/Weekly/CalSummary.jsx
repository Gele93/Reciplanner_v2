import React from 'react'

function CalSummary({ calculateDailyCalNeeded, calculateDailyCalTook, day, curWeekIndex}) {
    return (
        <>
            <div className='kcal-need'>{calculateDailyCalNeeded()}</div>
            <div className='kcal-took'>{calculateDailyCalTook(day, curWeekIndex)}</div>
            <div className={`kcal-diff ${calculateDailyCalTook(day, curWeekIndex) - calculateDailyCalNeeded() > 0 ? "positive" : "negative"}`}>
                {calculateDailyCalTook(day, curWeekIndex) - calculateDailyCalNeeded()}
            </div>
        </>
    )
}

export default CalSummary