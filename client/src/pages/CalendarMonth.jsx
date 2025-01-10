import React, { useEffect, useState, useContext } from 'react'
import "../css/calendarmonth.css"
import { RecipeContext } from '../ContextProvider.jsx'
import { Link } from "react-router-dom"

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

            for (let i = 0; i < 4; i++) {
                firstMonday = new Date(firstMonday)
                firstMonday.setDate(firstMonday.getDate() + 7)
                firstMonday = firstMonday.toISOString().slice(0, 10)
                updatedWeeks.push(firstMonday)
            }

            setWeeks(updatedWeeks)
        }
    }, [today])


    const fillMealDetails = (curDate, curMeal, curKey) => {
        let mealIndex = 0
        switch (curMeal) {
            case "breakfast": mealIndex = 0
                break;
            case "lunch": mealIndex = 1
                break;
            case "dinner": mealIndex = 2
                break;
        }

        if (calendar[curDate]) {
            if (calendar[curDate][mealIndex] !== curMeal) {
                if (curKey === "caloriesPerServing") {
                    const kcalPerServing = Math.round(calendar[curDate][mealIndex][curKey])
                    return kcalPerServing
                } else {
                    return calendar[curDate][mealIndex][curKey]
                }
            }
        }
        return false
    }


    const getCurFood = (curDate, curMeal) => {
        let mealIndex = 0

        console.log(curDate, curMeal)

        switch (curMeal) {
            case "breakfast": mealIndex = 0
                break;
            case "lunch": mealIndex = 1
                break;
            case "dinner": mealIndex = 2
                break;
        }

        console.log(calendar)

        if (calendar[curDate]) {
            if (calendar[curDate][mealIndex] !== curMeal) {
                return calendar[curDate][mealIndex]
            }
        }
        return false
    }

    const handleFoodClick = (recipe) => {
        setIsRecipeModal(true)
        setIsRecipeModalAdd(false)
        setSelectedRecipe(recipe)
    }

    const shortenTitle = (title) => {
        if (!title) return
        const maxLength = 20
        if (title.length < maxLength) {
            return title
        }

        const words = title.split(" ")
        let wordIndex = 0
        let totalChar = 0

        for (let i = 0; i < words.length; i++) {
            totalChar += words[i].length + 1
            if (totalChar > maxLength) {
                wordIndex = i - 1
                break
            }
        }

        const wordsOfShortTitle = []
        for (let i = 0; i < wordIndex; i++) {
            wordsOfShortTitle.push(words[i])
        }

        let shortenedTitle = wordsOfShortTitle.join(" ")
        shortenedTitle = shortenedTitle + "..."
        return shortenedTitle

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
                                            {fillMealDetails(calculateCurDayFromMonday(d, j, false), m, "label") &&
                                                <div onClick={() => handleFoodClick(getCurFood(calculateCurDayFromMonday(d, j, false), m))} className='food-title-month'>{shortenTitle(fillMealDetails(calculateCurDayFromMonday(d, j, false), m, "label"))}</div>
                                            }

                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ))}
            </div>
            <div className='calendar-styles'>
                <Link to="/calendar-month"><button type='button' className='calendar-style monthly'>Monthly</button></Link>
                <Link to="/calendar"><button type='button' className='calendar-style weekly'>Weekly</button></Link>
            </div>
        </div >
    )
}

export default CalendarMonth