import React, { useEffect, useState } from 'react'
import MealGrid from './MealGrid'
import { fillMealDetails } from '../../scripts'
import "../../css/calendarmodal.css"


function CalendarModal({ calendar, date, hoveredId, setIsCalendarModal }) {

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const meals = ["breakfast", "lunch", "dinner"]

    const [curWeek, setCurWeek] = useState([])

    useEffect(() => {
        if (date) {
            let checkDate = new Date(date)
            checkDate.setDate(checkDate.getDate() - (checkDate.getDay() - 1))
            checkDate = checkDate.toISOString().slice(0, 10)

            let currentWeek = []
            currentWeek[0] = new Date(checkDate).toISOString().slice(0, 10)

            for (let i = 0; i < 6; i++) {
                let nextDay = new Date(currentWeek[i])
                nextDay.setDate(nextDay.getDate() + 1)
                nextDay = nextDay.toISOString().slice(0, 10)
                currentWeek.push(nextDay)
            }
            setCurWeek(currentWeek)
        }

    }, [date])

    /*
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
*/


    return (
        <div className='calendar-modal' onMouseOver={() => setIsCalendarModal(true)} onMouseOut={() => setIsCalendarModal(false)}>
            <div className='days-of-week-modal'>
                <div className='meal-type-labels-modal'>
                    <div className='top-left-corner'>Week of {date} </div>
                    <div className='meal-type-bf-modal'>Breakfast</div>
                    <div className='meal-type-l-modal'>Lunch</div>
                    <div className='meal-type-d-modal'>Dinner</div>
                </div>
                {curWeek.map((d, i) => (
                    <div key={d} className={`${daysOfWeek[i]} day-modal`} >
                        <div className='day-date-modal'>{d}</div>
                        <div className='day-title-modal'>{daysOfWeek[i]}</div>
                        {meals.map((m, i) => (
                            fillMealDetails(d, m, "label", calendar) ? (
                                <MealGrid
                                    day={d}
                                    meal={m}
                                    isHovered={hoveredId === fillMealDetails(d, m, "id", calendar)}
                                    image={fillMealDetails(d, m, "image", calendar)}
                                    calories={fillMealDetails(d, m, "calories", calendar)}
                                    caloriesPerServing={fillMealDetails(d, m, "caloriesPerServing", calendar)}
                                />
                            ) : (
                                <div key={`${d}${m}`}></div>
                            )
                        ))}
                        <div className='kcal-daily-modal'></div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default CalendarModal
