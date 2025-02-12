import React from 'react'
import { shortenTitle } from '../../../scripts'

function MealGrid({ day, meal, hoveredId, handleFoodClick, curFood, handleMouseOver, handleMouseLeave, fillMealDetails, calendar }) {
    return (
        <div key={`${day}${meal}`}
            className={`${meal} food ${fillMealDetails(day, meal, "id", calendar) === hoveredId && "hovered-recipe"} `}
            onClick={() => handleFoodClick(curFood)}
            onMouseOver={() => handleMouseOver(day, meal)}
            onMouseLeave={() => handleMouseLeave()}>
            {fillMealDetails(day, meal, "label", calendar) &&
                <div className='food-title'>{shortenTitle(fillMealDetails(day, meal, "label", calendar), 20)}</div>
            }
            {fillMealDetails(day, meal, "image", calendar) &&
                <img className='food-img' src={fillMealDetails(day, meal, "image", calendar)} alt="Original Image" onError={(e) => e.target.src = "/altfood.png"} />
            }
            {fillMealDetails(day, meal, "calories", calendar) &&
                <div className='food-kcal'>{fillMealDetails(day, meal, "caloriesPerServing", calendar)} kcal</div>
            }
        </div>
    )
}

export default MealGrid