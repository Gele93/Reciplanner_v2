import React from 'react'

function MealGrid({ day, meal, hoveredId, handleFoodClick, curFood, handleMouseOver, handleMouseLeave, fillMealDetails }) {

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

    return (
        <div key={`${day}${meal}`}
            className={`${meal} food ${fillMealDetails(day, meal, "id") === hoveredId && "hovered-recipe"} `}
            onClick={() => handleFoodClick(curFood)}
            onMouseOver={() => handleMouseOver(day, meal)}
            onMouseLeave={() => handleMouseLeave()}>
            {fillMealDetails(day, meal, "label") &&
                <div className='food-title'>{shortenTitle(fillMealDetails(day, meal, "label"))}</div>
            }
            {fillMealDetails(day, meal, "image") &&
                <img className='food-img' src={fillMealDetails(day, meal, "image")} alt="Original Image" onError={(e) => e.target.src = "/altfood.png"} />
            }
            {fillMealDetails(day, meal, "calories") &&
                <div className='food-kcal'>{fillMealDetails(day, meal, "caloriesPerServing")} kcal</div>
            }
        </div>
    )
}

export default MealGrid