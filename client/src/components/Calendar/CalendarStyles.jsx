import React from 'react'
import { Link } from 'react-router-dom'

function CalendarStyles() {
    return (
        <div className='calendar-styles'>
            <Link to="/calendar-month"><button type='button' className='calendar-style monthly'>Monthly</button></Link>
            <Link to="/calendar"><button type='button' className='calendar-style weekly'>Weekly</button></Link>
        </div>
    )
}

export default CalendarStyles