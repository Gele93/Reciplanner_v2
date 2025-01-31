import React from 'react'

function CalendarDetails({ servings, setServings, date, setDate, setIsCalendarModal, setMealTypes, mealTypes }) {

    const increaseServings = () => setServings(prev => prev + 1);
    const decreaseServings = () => setServings(prev => prev > 1 ? prev - 1 : 1);

    const handleCalendarMouseOut = () => {
        setIsCalendarModal(false)
    }

    const handleCalendarMouseOver = () => {
        setIsCalendarModal(true)
    }


    const handleCheckChange = (e) => {
        const curMealType = e.target.name
        let updatedMealTypes = [...mealTypes]
        if (e.target.checked) {
            updatedMealTypes.push(curMealType)
        } else {
            updatedMealTypes = updatedMealTypes.filter(m => m !== curMealType)
        }

        updatedMealTypes = updatedMealTypes.sort((a, b) => {
            if (a === "breakfast") return -1
            if (a === "lunch" && b === "dinner") return -1
            if (a === "lunch" && b === "breakfast") return 1
            if (a === "dinner") return 1
        })

        setMealTypes(updatedMealTypes)
    }

    return (
        <div className="info-container">
            <div className='container-title'>
                <strong>Calendar Details</strong>
            </div>
            <div className="servings-container">
                <div className='info-label' >Servings:</div>
                <div className="servings-control">
                    <button className="servings-button" onClick={decreaseServings}>-</button>
                    <input type="number" value={servings} readOnly />
                    <button className="servings-button" onClick={increaseServings}>+</button>
                </div>
            </div>
            <div className="date-container">
                <div className='info-label'>Starting Date:</div>
                <div className='date-input'>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className='calendar-modal-div' onMouseOver={handleCalendarMouseOver} onMouseOut={handleCalendarMouseOut}>
                    <img className='calendar-modal-icon' src='/calendar.png'></img>
                </div>
            </div>
            <div className="meal-types-container">
                <div className='info-label'>Meal Types:</div>
                <div className="meal-type-control">
                    <div className='meal-type-tick'>
                        <label htmlFor="breakfast">Breakfast</label>
                        <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="breakfast" name='breakfast' checked={mealTypes.includes('breakfast')} />
                    </div>
                    <div className='meal-type-tick'>
                        <label htmlFor="lunch">Lunch</label>
                        <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="lunch" name='lunch' checked={mealTypes.includes('lunch')} />
                    </div>
                    <div className='meal-type-tick'>
                        <label htmlFor="dinner">Dinner</label>
                        <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="dinner" name='dinner' checked={mealTypes.includes('dinner')} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarDetails