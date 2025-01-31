import React, { useEffect, useState, useContext } from 'react'
import "../css/calendarmonth.css"
import { RecipeContext } from '../ContextProvider.jsx'
import { Link } from "react-router-dom"
import { getCurFood, fillMealDetails, shortenTitle } from '../scripts.js'
import CalendarStyles from '../components/Calendar/CalendarStyles.jsx'

function CalendarMonth({ isRecipeModal, setRecipes, setSelectedRecipe, setIsRecipeModal, setIsRecipeModalAdd, calendar, setCalendar }) {

    const daysOfWeekFromSunday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const meals = ["breakfast", "lunch", "dinner"]

    const [today, setToday] = useState(new Date().toISOString().slice(0, 10))
    const [weeks, setWeeks] = useState([])
    const [curMonth, setCurMonth] = useState("")
    const [firstShownDay, setFirstShownDay] = useState("")
    const [lastShownDay, setLastShownDay] = useState("")
    const [hoveredId, setHoveredId] = useState(0)


    const { user, setUser } = useContext(RecipeContext)

    useEffect(() => {
        if (today) {
            const monthIndex = parseInt(today.split("-")[1]) - 1
            setCurMonth(months[monthIndex])
        }
    }, [today])

    console.log(calendar)

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

            console.log(updatedWeeks)

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

    const handleMouseOver = (day, meal) => {
        setHoveredId(fillMealDetails(day, meal, "id", calendar))
    }

    const handleMouseLeave = () => {
        setHoveredId(0)
    }

    console.log(calendar)

    return (
        <div className='calendar-month'>

            <div className='curmonth'>{curMonth}</div>

            <button onClick={handleMonthMinusClick} className='date-minus-month' type='button'>← prev</button>
            <button onClick={handleMonthPlusClick} className='date-plus-month' type='button'>next →</button>

            <div className='day-titles'>
                {daysOfWeek.map((d) => (
                    <div key={d} className='day-title-month'>{d}</div>
                ))}
            </div>

            <div className='days-of-month'>
                {weeks.map((d, i) => (
                    daysOfWeek.map((w, j) => (
                        <div key={`${d}${j}`} className='food-month-container'>
                            <div className='food-date-month'>{calculateCurDayFromMonday(d, j, true)}</div>
                            <div key={`${d}${w}`} className={`food-month`} >
                                <div className='meal-container-month' key={`${d}`}>
                                    {meals.map((m) => (
                                        <>
                                            {fillMealDetails(calculateCurDayFromMonday(d, j, false), m, "label", calendar) &&
                                                <div onClick={() => handleFoodClick(getCurFood(calculateCurDayFromMonday(d, j, false), m, calendar))}
                                                    onMouseOver={() => handleMouseOver(d, m)}
                                                    onMouseLeave={() => handleMouseLeave()}
                                                    className={`food-title-month ${fillMealDetails(d, m, "id", calendar) === hoveredId && "hovered-recipe"}`}>
                                                    {shortenTitle(fillMealDetails(calculateCurDayFromMonday(d, j, false), m, "label", calendar))}
                                                </div>
                                            }

                                        </>
                                    ))}
                                </div>
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