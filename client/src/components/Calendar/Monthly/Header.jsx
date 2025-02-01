import React from 'react'

function Header({curMonth, daysOfWeek}) {
    return (
        <>
            <div className='curmonth'>{curMonth}</div>
            <div className='day-titles'>
                {daysOfWeek.map((d) => (
                    <div key={d} className='day-title-month'>{d}</div>
                ))}
            </div>
        </>
    )
}

export default Header