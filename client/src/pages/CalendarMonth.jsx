import React, { useEffect, useState, useContext } from 'react'
import "../css/calendarmonth.css"
import { RecipeContext } from '../ContextProvider.jsx'
import { getCurFood, fillMealDetails } from '../scripts.js'
import CalendarStyles from '../components/Calendar/CalendarStyles.jsx'
import Header from '../components/Calendar/Monthly/Header.jsx'
import DateButtons from '../components/Calendar/Monthly/DateButtons.jsx'
import MealGrid from '../components/Calendar/Monthly/MealGrid.jsx'

function CalendarMonth({ setSelectedRecipe, setIsRecipeModal, setIsRecipeModalAdd, calendar }) {

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const meals = ["breakfast", "lunch", "dinner"]

    const [today, setToday] = useState(new Date().toISOString().slice(0, 10))
    const [weeks, setWeeks] = useState([])
    const [curMonth, setCurMonth] = useState("")
    const [firstShownDay, setFirstShownDay] = useState("")
    const [lastShownDay, setLastShownDay] = useState("")
    const [hoveredId, setHoveredId] = useState(0)

    useEffect(() => {
        if (today) {
            const monthIndex = parseInt(today.split("-")[1]) - 1
            setCurMonth(months[monthIndex])
        }
    }, [today])

    useEffect(() => {
        if (today) {
            let firstDayOfMonth = today.split("-")
            firstDayOfMonth[2] = "01"
            firstDayOfMonth = new Date(firstDayOfMonth.join("-"))
            let daysDiffToMonday = (firstDayOfMonth.getDay() + 6) % 7;

            let firstMonday = new Date(firstDayOfMonth)
            firstMonday.setDate(firstDayOfMonth.getDate() - daysDiffToMonday)

            setFirstShownDay(firstMonday.toISOString().slice(0, 10))
            let updatedLastShownDay = new Date(firstMonday)
            updatedLastShownDay.setDate(updatedLastShownDay.getDate() + (5 * 7 - 1))
            setLastShownDay(updatedLastShownDay.toISOString().slice(0, 10))

            let updatedWeeks = [firstMonday.toLocaleDateString('en-CA')]

            for (let i = 0; i < 5; i++) {
                firstMonday = new Date(firstMonday)
                firstMonday.setDate(firstMonday.getDate() + 7)
                firstMonday = firstMonday.toISOString().slice(0, 10)
                updatedWeeks.push(firstMonday)
            }

            setWeeks(updatedWeeks)
        }
    }, [today])

    const handleFoodClick = (recipe) => {
        setIsRecipeModal(true)
        setIsRecipeModalAdd(false)
        setSelectedRecipe(recipe)
    }

    const calculateCurDayFromMonday = (monday, index, isDayOnly) => {
        let curDay = new Date(monday)
        curDay.setDate(curDay.getDate() + index)
        curDay = curDay.toISOString().slice(0, 10)
        if (isDayOnly) {
            return curDay.split("-")[2]
        }
        return curDay
    }

    const handleMonthMinusClick = () => {
        let prevMonthLastDay = new Date(firstShownDay)
        prevMonthLastDay.setDate(prevMonthLastDay.getDate() - 1)
        setToday(prevMonthLastDay.toISOString().slice(0, 10))
    }
    const handleMonthPlusClick = () => {
        let nextMonthFirstDay = new Date(lastShownDay)
        nextMonthFirstDay.setDate(nextMonthFirstDay.getDate() + 5)
        setToday(nextMonthFirstDay.toISOString().slice(0, 10))

    }

    return (
        <div className='calendar-month'>
            <Header curMonth={curMonth} daysOfWeek={daysOfWeek} />
            <DateButtons handleMonthMinusClick={handleMonthMinusClick} handleMonthPlusClick={handleMonthPlusClick} />
            <div className='days-of-month'>
                {weeks.map((d, i) => (
                    daysOfWeek.map((w, j) => (
                        <div key={`${d}${j}`} className='food-month-container'>
                            <div className='food-date-month'>{calculateCurDayFromMonday(d, j, true)}</div>
                            <div key={`${d}${w}`} className={`food-month`} >
                                <MealGrid
                                hoveredId={hoveredId}
                                setHoveredId={setHoveredId}
                                    fillMealDetails={fillMealDetails}
                                    curDay={calculateCurDayFromMonday(d, j, false)}
                                    meals={meals}
                                    d={d}
                                    calendar={calendar}
                                    handleFoodClick={handleFoodClick}
                                    getCurFood={getCurFood}
                                />
                            </div>
                        </div>
                    ))
                ))}
            </div>
            <CalendarStyles />
        </div >
    )
}

export default CalendarMonth