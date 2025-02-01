import { React } from 'react'
import { shortenTitle } from '../../../scripts'

function MealGrid({ meals, fillMealDetails, curDay, m, d, calendar, handleFoodClick, getCurFood, hoveredId, setHoveredId }) {


    const handleMouseOver = (day, meal) => {
        setHoveredId(fillMealDetails(day, meal, "id", calendar))
    }

    const handleMouseLeave = () => {
        setHoveredId(0)
    }

    console.log(calendar)

    return (
        <div key={`${d}-${fillMealDetails(curDay, m, "id", calendar)}`} className='meal-container-month'>
            {meals.map((m) => (
                fillMealDetails(curDay, m, "label", calendar) &&
                <div onClick={() => handleFoodClick(getCurFood(curDay, m, calendar))}
                    onMouseOver={() => handleMouseOver(curDay, m)}
                    onMouseLeave={() => handleMouseLeave()}
                    className={`${m}-month food-title-month ${fillMealDetails(curDay, m, "id", calendar) === hoveredId ? "hovered-recipe-month" : ""}`}>
                    {shortenTitle(fillMealDetails(curDay, m, "label", calendar))}
                </div>

            ))}
        </div>
    )
}

export default MealGrid