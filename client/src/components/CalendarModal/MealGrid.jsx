import React from 'react'

function MealGrid({ meal, day, image, calories, caloriesPerServing }) {
    return (
        <div key={`${day}${meal}`} className={`${meal}-modal food-modal`}>
            {image &&
                <img className='food-img-modal' src={image} onError={(e) => e.target.src = "/altfood.png"} />
            }
            {calories &&
                <div className='food-kcal-modal'>{caloriesPerServing} kcal</div>
            }
        </div>
    )
}

export default MealGrid