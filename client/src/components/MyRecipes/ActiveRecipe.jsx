import { React, useState } from 'react'
import CalendarModal from '../CalendarModal/CalendarModal'

function ActiveRecipe({ recipe, calendar, setIsConfirmToast, setRecipeToDelete, openEditModal }) {

  const [isCalendarModal, setIsCalendarModal] = useState(false)

  const handleDeleteRecipe = (recipe) => {
    setRecipeToDelete(recipe)
    setIsConfirmToast(true)
  }

  const handleCalendarMouseOver = () => {
    setIsCalendarModal(true)
  }

  const handleCalendarMouseOut = () => {
    setIsCalendarModal(false)
  }

  return (
    <>
      <div className='active-recipe'>
        <img src={recipe.image} alt="Original Image" onError={(e) => e.target.src = "/altfood.png"} />
        <div>{recipe.label}</div>
        <div>{recipe.startDate}</div>
        <div>{recipe.yield} yields</div>
        <div>{recipe.mealTypes.join(" - ")}</div>
        <div className='calendar-modal-div' >
          <img className='calendar-modal-icon' src='/calendar.png' onMouseOver={handleCalendarMouseOver} onMouseOut={handleCalendarMouseOut}></img>
        </div>
        <div className='buttons'>
          <button className='edit' onClick={() => openEditModal(recipe)}>Edit</button>
          <button className='delete' onClick={() => handleDeleteRecipe(recipe)} >Delete</button>
        </div>
      </div>
      {isCalendarModal &&
        <CalendarModal calendar={calendar} date={recipe.startDate} hoveredId={recipe.id} setIsCalendarModal={setIsCalendarModal} />
      }
    </>
  )
}

export default ActiveRecipe