import React, { useEffect, useState, useContext } from 'react'
import "../css/calendar.css"
import Piechart from "../components/Piechart.jsx"
import { RecipeContext } from '../ContextProvider.jsx'
import { Link } from "react-router-dom"

function Calendar({ isRecipeModal, setRecipes, setSelectedRecipe, setIsRecipeModal, setIsRecipeModalAdd, calendar, setCalendar }) {

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const meals = ["breakfast", "lunch", "dinner"]

    const [curFirstDay, setCurFirstDay] = useState(new Date().toISOString().slice(0, 10))
    const [curWeek, setCurWeek] = useState([])
    const [weeklyTotalKcal, setWeeklyTotalkcal] = useState(0)

    const { user, setUser } = useContext(RecipeContext)

    /*
    useEffect(() => {
        console.log(calendar)
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`/api/recipes/${user._id}`)
                if (!response.ok) {
                    throw new Error("fetching recipes went wrong")
                }
                const updatedRecipes = await response.json()
                console.log(updatedRecipes)
                setRecipes(updatedRecipes)
            } catch (error) {
                console.error(error)
            }
        }
        fetchRecipes()
    }, [])

*/

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
                    //  const kcal = Math.round(totalKcal / parseInt(calendar[curDate][mealIndex].servings))
                    return kcalPerServing
                } else {
                    return calendar[curDate][mealIndex][curKey]
                }
            }
        }

        return false
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


    const getCurFood = (curDate, curMeal) => {
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
        const maxLength = 18
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
        console.log(calendar[d])
        if (calendar[d]) {
            calendar[d].map(m => {
                if (m.caloriesPerServing) {
                    dailyCalTook += m.caloriesPerServing
                }
            })
        }
        return Math.round(dailyCalTook)
    }


    return (
        <div className='calendar'>
            <div className='date'>
                <button className='date-minus' onClick={handleDateMinusClick} type='button'>← prev</button>
                <button className='date-plus' onClick={handleDatePlusClick} type='button'>next →</button>
            </div>
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
                    <div key={d} className={`${daysOfWeek[i]} day`} >
                        <div className='day-date'>{d}</div>
                        <div className='day-title'>{writeDayFromDate(d)}</div>
                        {meals.map((m, i) => (
                            fillMealDetails(d, m, "label") ? (
                                <div key={`${d}${m}`} className={`${m} food`} onClick={() => handleFoodClick(getCurFood(d, m))}>
                                    {fillMealDetails(d, m, "label") &&
                                        <div className='food-title'>{shortenTitle(fillMealDetails(d, m, "label"))}</div>
                                    }
                                    {fillMealDetails(d, m, "image") &&
                                        <img className='food-img' src={fillMealDetails(d, m, "image")} alt="Original Image" onError={(e) => e.target.src = "/altfood.png"} />
                                    }
                                    {fillMealDetails(d, m, "calories") &&
                                        <div className='food-kcal'>{fillMealDetails(d, m, "caloriesPerServing")} kcal</div>
                                    }
                                </div>
                            ) : (
                                <div key={`${d}${m}`}></div>
                            )

                        ))}

                        <div className='kcal-need'>{calculateDailyCalNeeded()}</div>
                        <div className='kcal-took'>{calculateDailyCalTook(d, i)}</div>
                        <div className={`kcal-diff ${calculateDailyCalTook(d, i) - calculateDailyCalNeeded() > 0 ? "positive" : "negative"}`}>{calculateDailyCalTook(d, i) - calculateDailyCalNeeded()}</div>
                    </div>
                ))}

                <div className='weekly-stat'>
                    <div className='stat-title'>Stats</div>
                    <div className='stat-weekly-kcal-title'>Total kcal:</div>
                    <div className='stat-weekly-kcal'>{weeklyTotalKcal}</div>
                    <div className='stat-chart'>
                        <Piechart curFirstDay={curFirstDay} calendar={calendar} />
                    </div>
                </div>
            </div>
            <div className='calendar-styles'>
                <Link to="/calendar-month"><button type='button' className='calendar-style monthly'>Monthly</button></Link>
                <Link to="/calendar"><button type='button' className='calendar-style weekly'>Weekly</button></Link>
            </div>
        </div >
    )
}

export default Calendar