import React, { useEffect, useState } from 'react'
import "../css/calendar.css"
import Piechart from "./Piechart.jsx"


function Calendar({ isRecipeModal, setRecipes, setSelectedRecipe, setIsRecipeModal, setIsRecipeModalAdd, calendar, setCalendar }) {

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const meals = ["breakfast", "lunch", "dinner"]

    const [curFirstDay, setCurFirstDay] = useState(new Date().toISOString().slice(0, 10))
    const [curWeek, setCurWeek] = useState([])


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
            for (let i = 0; i < 6; i++) {
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
            return Math.round(updatedTotalWeeklyKcal)
        } catch (error) {
            console.error(error)
        }
    }


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
                </div>
                {curWeek.map((d, i) => (
                    <div key={i} className={`${daysOfWeek[i]} day`} >
                        <div className='day-date'>{d}</div>
                        <div className='day-title'>{daysOfWeek[i]}</div>
                        {meals.map((m, i) => (
                            fillMealDetails(d, m, "label") ? (
                                <div key={i} className={`${m} food`} onClick={() => handleFoodClick(getCurFood(d, m))}>
                                    {fillMealDetails(d, m, "label") &&
                                        <div className='food-title'>{fillMealDetails(d, m, "label")}</div>
                                    }
                                    {fillMealDetails(d, m, "image") &&
                                        <img className='food-img' src={fillMealDetails(d, m, "image")} />
                                    }
                                    {fillMealDetails(d, m, "calories") &&
                                        <div className='food-kcal'>{fillMealDetails(d, m, "caloriesPerServing")} kcal</div>
                                    }
                                </div>
                            ) : (
                                <div></div>
                            )

                        ))}

                        <div className='kcal-daily'></div>
                    </div>
                ))}

                <div className='weekly-stat'>
                    <div className='stat-title'>Stats</div>
                    <div className='stat-weekly-kcal-title'>Total kcal:</div>
                    <div className='stat-weekly-kcal'>{calculateTotalWeeklyKcal()}</div>
                    <div className='stat-chart'>
                        <Piechart curFirstDay={curFirstDay} calendar={calendar} />
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Calendar