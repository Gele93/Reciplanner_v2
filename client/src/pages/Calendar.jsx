import React, { useEffect, useState, useContext } from 'react'
import "../css/calendar.css"
import { RecipeContext } from '../ContextProvider.jsx'
import { Link } from "react-router-dom"
import DateButtons from '../components/Calendar/Weekly/DateButtons.jsx'
import MealGrid from '../components/Calendar/Weekly/MealGrid.jsx'
import CalSummary from '../components/Calendar/Weekly/CalSummary.jsx'
import WeeklyStats from '../components/Calendar/Weekly/WeeklyStats.jsx'
import CalendarStyles from '../components/Calendar/CalendarStyles.jsx'
import { fillMealDetails, getCurFood } from '../scripts.js'

function Calendar({ setSelectedRecipe, setIsRecipeModal, setIsRecipeModalAdd, calendar }) {

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const meals = ["breakfast", "lunch", "dinner"]

    const [curFirstDay, setCurFirstDay] = useState(new Date().toISOString().slice(0, 10))
    const [curWeek, setCurWeek] = useState([])
    const [weeklyTotalKcal, setWeeklyTotalkcal] = useState(0)
    const [hoveredId, setHoveredId] = useState(0)

    const { user, setUser } = useContext(RecipeContext)

    useEffect(() => {
        if (curFirstDay) {
            let currentWeek = []
            currentWeek[0] = new Date(curFirstDay).toISOString().slice(0, 10)

            for (let i = 0; i < 6; i++) {
                let nextDay = new Date(currentWeek[i])
                nextDay.setDate(nextDay.getDate() + 1)
                nextDay = nextDay.toISOString().slice(0, 10)
                currentWeek.push(nextDay)
            }
            setCurWeek(currentWeek)
        }

    }, [curFirstDay])

    const handleDatePlusClick = () => {
        let nextWeekStart = new Date(curFirstDay)
        nextWeekStart.setDate(nextWeekStart.getDate() + 7)
        nextWeekStart = nextWeekStart.toISOString().slice(0, 10)
        setCurFirstDay(nextWeekStart)
    }

    const handleDateMinusClick = () => {
        let nextWeekStart = new Date(curFirstDay)
        nextWeekStart.setDate(nextWeekStart.getDate() - 7)
        nextWeekStart = nextWeekStart.toISOString().slice(0, 10)
        setCurFirstDay(nextWeekStart)
    }

    const calculateTotalWeeklyKcal = () => {
        try {
            let updatedTotalWeeklyKcal = 0
            for (let i = 0; i < 7; i++) {
                let checkDay = new Date(curFirstDay)
                checkDay.setDate(checkDay.getDate() + i)
                checkDay = checkDay.toISOString().slice(0, 10)

                if (calendar[checkDay]) {
                    calendar[checkDay].map(meal => {
                        if (typeof meal !== "string") {
                            updatedTotalWeeklyKcal += meal.caloriesPerServing
                        }
                    })
                }
            }
            setWeeklyTotalkcal(Math.round(updatedTotalWeeklyKcal))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        calculateTotalWeeklyKcal()
    }, [curWeek])


    const handleFoodClick = (recipe) => {
        setIsRecipeModal(true)
        setIsRecipeModalAdd(false)
        setSelectedRecipe(recipe)
    }

    const writeDayFromDate = (date) => {
        const currentDate = new Date(date)
        const dayOfWeek = currentDate.getDay()
        return daysOfWeek[dayOfWeek]
    }

    const calculateDailyCalNeeded = () => {
        let calNeed = 0
        if (user.gender === "male") {
            calNeed = (883 / 10) + ((134 / 10) * parseInt(user.weight)) + ((48 / 10) * parseInt(user.height)) - (57 / 10) * parseInt(user.age)
        } else {
            calNeed = (4475 / 10) + ((92 / 10) * user.weight) + ((30 / 10) * user.height) - (43 / 10) * user.age
        }
        return Math.round(calNeed)
    }

    const calculateDailyCalTook = (d, i) => {
        let dailyCalTook = 0
        if (calendar[d]) {
            calendar[d].map(m => {
                if (m.caloriesPerServing) {
                    dailyCalTook += m.caloriesPerServing
                }
            })
        }
        return Math.round(dailyCalTook)
    }

    const handleMouseOver = (day, meal) => {
        setHoveredId(fillMealDetails(day, meal, "id", calendar))
    }

    const handleMouseLeave = () => {
        setHoveredId(0)
    }

    console.log(calendar)

    return (
        <div className='calendar'>
            <DateButtons handleDateMinusClick={handleDateMinusClick} handleDatePlusClick={handleDatePlusClick} />
            <div className='days-of-week'>
                <div className='meal-type-labels'>
                    <div className='meal-type-bf'>Breakfast</div>
                    <div className='meal-type-l'>Lunch</div>
                    <div className='meal-type-d'>Dinner</div>
                    <div className='meal-type-cal-needed'>Cal needed</div>
                    <div className='meal-type-cal-ate'>Cal took</div>
                    <div className='meal-type-cal-dif'>Cal diff</div>
                </div>
                {curWeek.map((d, i) => (
                    <div key={`${d}${i}`} className={`${daysOfWeek[i]} day`} >
                        <div className='day-date'>{d}</div>
                        <div className='day-title'>{writeDayFromDate(d)}</div>
                        {meals.map((m) => (
                            fillMealDetails(d, m, "label", calendar) ? (
                                <MealGrid
                                    key={`${d}${m}`}
                                    day={d}
                                    meal={m}
                                    hoveredId={hoveredId}
                                    handleFoodClick={handleFoodClick}
                                    curFood={getCurFood(d, m, calendar)}
                                    handleMouseOver={handleMouseOver}
                                    handleMouseLeave={handleMouseLeave}
                                    fillMealDetails={fillMealDetails}
                                    calendar={calendar}
                                />
                            ) : (
                                <div key={`${d}${m}`}></div>
                            )
                        ))}
                        <CalSummary calculateDailyCalNeeded={calculateDailyCalNeeded} calculateDailyCalTook={calculateDailyCalTook} day={d} curWeekIndex={i} />
                    </div>
                ))}
                <WeeklyStats weeklyTotalKcal={weeklyTotalKcal} curFirstDay={curFirstDay} calendar={calendar} />
            </div>
            <CalendarStyles />
        </div >
    )
}

export default Calendar