import React, { useState, useEffect, useContext } from 'react';
import '../css/recipemodal.css';
import Draggable from "react-draggable";
import CalendarModal from './CalendarModal';
import { RecipeContext } from '../ContextProvider';

const RecipeModal = ({ isRecipeModal, isRecipeModalAdd, setIsRecipeModal, selectedRecipe, calendar, setCalendar }) => {
  const [servings, setServings] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [mealTypes, setMealTypes] = useState([]);

  const [adjustedCalories, setAdjustedCalories] = useState(0)
  const [adjustedFat, setAdjustedFat] = useState(0)
  const [adjustedProtein, setAdjustedProtein] = useState(0)
  const [adjustedCarbs, setAdjustedCarbs] = useState(0)
  const [adjustedVitaminA, setAdjustedVitaminA] = useState(0)
  const [adjustedVitaminC, setAdjustedVitaminC] = useState(0)
  const [adjustedIngredients, setAdjustedIngredients] = useState([]);

  const { user, setUser } = useContext(RecipeContext)

  //calendarmodal
  const [isCalendarModal, setIsCalendarModal] = useState(false)

  const handleCalendarMouseOut = () => {
    setIsCalendarModal(false)
  }

  const handleCalendarMouseOver = () => {
    setIsCalendarModal(true)
  }
  //calendarmodal


  const handleCloseModal = () => {
    setIsRecipeModal(false);
  };

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

  const fetchPostNewRecipe = async (recipe) => {
    try {
      const response = await fetch(`/api/recipes/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recipe,
        }),
      });

      if (response.ok) {
        alert('Recipe added successfully!');
      } else {
        console.error('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    } finally {
      handleCloseModal();
    }
  };


  const checkAvailability = (recipe) => {
    let counter = servings
    let curDate = new Date(recipe.startDate)

    for (let i = 0; i < counter;) {
      curDate = new Date(curDate)
      if (i !== 0) {
        curDate.setDate(curDate.getDate() + 1)
      }
      curDate = curDate.toISOString().slice(0, 10)
      for (let j = 0; j < recipe.mealTypes.length; j++) {

        if (calendar[curDate]) {
          if (!calendar[curDate].includes(recipe.mealTypes[j])) {
            return false
          }
        }

        i++
        if (i.toString() === counter) break
      }
    }
    return true
  }

  const checkEditAvailability = (recipe) => {
    let counter = servings
    let curDate = new Date(recipe.startDate)

    for (let i = 0; i < servings;) {
      curDate = new Date(curDate)
      if (i !== 0) {
        curDate.setDate(curDate.getDate() + 1)
      }
      curDate = curDate.toISOString().slice(0, 10)
      for (let j = 0; j < recipe.mealTypes.length; j++) {
        if (calendar[curDate]) {
          if (!calendar[curDate].includes(recipe.mealTypes[j])) {

            let mealIndex = 0
            switch (recipe.mealTypes[j]) {
              case "breakfast": mealIndex = 0
                break;
              case "lunch": mealIndex = 1
                break;
              case "dinner": mealIndex = 2
                break;
            }
            if (calendar[curDate][mealIndex]._id !== recipe._id) {
              if (counter > 0) {
                return false

              }
            }
          }
        }
        counter--
        i++
      }

    }
    return true
  }


  const updateCalendar = (recipe) => {

    let counter = servings
    let curDate = new Date(recipe.startDate)
    let updatedCalendar = { ...calendar }

    for (let i = 0; i < servings;) {
      curDate = new Date(curDate)
      if (i !== 0) {
        curDate.setDate(curDate.getDate() + 1)
      }
      curDate = curDate.toISOString().slice(0, 10)

      for (let j = 0; j < recipe.mealTypes.length; j++) {
        if (!updatedCalendar[curDate]) {
          updatedCalendar[curDate] = ["breakfast", "lunch", "dinner"]
        }

        let mealIndex = 0
        switch (recipe.mealTypes[j]) {
          case "breakfast": mealIndex = 0
            break;
          case "lunch": mealIndex = 1
            break;
          case "dinner": mealIndex = 2
            break;
        }
        if (counter > 0) {
          updatedCalendar[curDate][mealIndex] = recipe
        }

        counter--
        i++
      }
    }
    setCalendar(updatedCalendar)
  }


  const handleAddRecipe = async () => {

    if (!user) return
    if (mealTypes.length === 0) return

    let recipeToAdd = { ...selectedRecipe }
    recipeToAdd.yield = servings
    recipeToAdd["startDate"] = date
    recipeToAdd["mealTypes"] = mealTypes
    recipeToAdd["caloriesPerServing"] = recipeToAdd.calories / servings;

    if (checkAvailability(recipeToAdd)) {
      updateCalendar(recipeToAdd)
      await fetchPostNewRecipe(recipeToAdd)
    } else {
      alert("One or more meals overlapping!")
    }

  }


  const handleEditRecipe = async () => {
    if (mealTypes.length === 0) return

    let recipeToEdit = { ...selectedRecipe };
    recipeToEdit.yield = servings;
    recipeToEdit["startDate"] = date;
    recipeToEdit["mealTypes"] = mealTypes;

    if (checkEditAvailability(recipeToEdit)) {
      await fetchPatchEditedRecipe(recipeToEdit);
      window.location.reload()
    } else {
      alert("Editing would cause overlapping")
    }

  };

  const fetchPatchEditedRecipe = async (recipe) => {
    try {
      const response = await fetch(`/api/recipes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recipe,
        }),
      });

      if (response.ok) {
        alert('Recipe updated successfully!');
      } else {
        console.error('Failed to update recipe');
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    } finally {
      handleCloseModal();
    }
  };

  const fetchDeleteRecipe = async () => {
    try {
      const response = await fetch(`/api/recipes/${selectedRecipe._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Recipe deleted successfully!');
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    } finally {
      handleCloseModal();
      window.location.reload()
    }
  };

  const increaseServings = () => setServings(prev => prev + 1);
  const decreaseServings = () => setServings(prev => prev > 1 ? prev - 1 : 1);


  const adjustDetails = () => {
    const baseServings = isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings; //Á
    const multiplier = servings / baseServings;  //Á

    setAdjustedCalories(Math.round((selectedRecipe.calories / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)) // anyag összmennyisége / adagszám =  1 adag és * új adagszámmal (servings)
    setAdjustedFat((selectedRecipe.totalNutrients.FAT.quantity / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)
    setAdjustedProtein((selectedRecipe.totalNutrients.PROCNT.quantity / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)
    setAdjustedCarbs((selectedRecipe.totalNutrients.CHOCDF.quantity / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)
    setAdjustedVitaminA(selectedRecipe.totalNutrients.VITA_RAE.quantity); //mikrogram
    setAdjustedVitaminC(selectedRecipe.totalNutrients.VITC.quantity); //miligram

    const adjustedIngredientsList = selectedRecipe.ingredientLines.map((ingredient) => { //Á
      return multiplyIngredient(ingredient, multiplier);
    });
    setAdjustedIngredients(adjustedIngredientsList);
  };

  const multiplyIngredient = (ingredient, multiplier) => { //Á
    const parts = ingredient.split(' ');
    const firstPart = parseFloat(parts[0]);

    if (!isNaN(firstPart)) {

      parts[0] = (firstPart * multiplier).toFixed(2);
      return parts.join(' ');
    } else {
      return ingredient;
    }
  };

  useEffect(() => {
    if (selectedRecipe) {
      adjustDetails()
    }
  }, [selectedRecipe, servings])


  useEffect(() => {
    if (selectedRecipe && !isRecipeModalAdd) {
      setServings(selectedRecipe.servings);
      setDate(selectedRecipe.startDate);
      setMealTypes(selectedRecipe.mealTypes);
      adjustDetails();
    }
  }, [selectedRecipe, isRecipeModalAdd]);

  return (
    <div className="modal-overlay">
      <Draggable cancel="input, .modal-close-button, label, .modal-footer, img, .modal-description, .details-container, .servings-container, .info-container" bounds={{ top: -200, left: -1300, right: 250, bottom: 100 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h2 className='modal-header-title'>{selectedRecipe.label}</h2>
            <button onClick={handleCloseModal} className="modal-close-button">❌</button>
          </div>
          <div className="modal-body">
            <div className="modal-image">
              <img src={selectedRecipe.image} alt={selectedRecipe.label} onError={(e) => e.target.src = "/altfood.png"} />
            </div>
            <div className="modal-description">
              <div id='descriptionTitle'>
                <strong>Descriptions</strong>
              </div>
              <p><strong>Source:</strong> {selectedRecipe.source}</p>
              <p><strong>Cuisine:</strong> {selectedRecipe.cuisineType}</p>
              <p><strong>Dish Type:</strong> {selectedRecipe.dishType}</p>
              <p><strong>Vitamins:</strong> Vitamin A: {adjustedVitaminA.toFixed(2)}Î¼g, Vitamin C: {adjustedVitaminC.toFixed(2)}mg</p>
              <p><strong>Diet Labels:</strong> {selectedRecipe.dietLabels.join(', ')}</p>
              <p><strong>Health Labels:</strong> {selectedRecipe.healthLabels.join(', ')}</p>
              <a href={selectedRecipe.url}>View Full Recipe</a>
            </div>
            <div>
              <div className="details-container">
                <h3> Calories: <span className='span'>{adjustedCalories} kcal ({Math.round(selectedRecipe.caloriesPerServing)} kcal / serving)</span></h3>
                <h3>Preparation time: <span className='span'>{selectedRecipe.totalTime > 0 ? `${selectedRecipe.totalTime} mins` : 'No prep time'}</span></h3>
                <div className='ingredients'>
                  <h3><strong>Ingredients:</strong></h3>
                  <ul>
                    {adjustedIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <h3 className='nutrition'><strong>Nutrition:</strong> Fat: <span className='span'>{adjustedFat.toFixed(2)}g, Protein: {adjustedProtein.toFixed(2)}g, Carbs: {adjustedCarbs.toFixed(2)}g</span></h3>
              </div>
            </div>
            <div className="info-container">
              <div className="servings-container">
                <label>Servings</label>
                <div className="servings-control">
                  <button className="servings-button" onClick={decreaseServings}>-</button>
                  <input type="number" value={servings} readOnly />
                  <button className="servings-button" onClick={increaseServings}>+</button>
                </div>
              </div>
              <div className="date-container">
                <label>Starting Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <div className='calendar-modal-div' onMouseOver={handleCalendarMouseOver} onMouseOut={handleCalendarMouseOut}>
                  <img className='calendar-modal-icon' src='/calendar.png'></img>
                </div>
              </div>
              <div className="meal-types-container">
                <label htmlFor="breakfast">Breakfast</label>
                <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="breakfast" name='breakfast' checked={mealTypes.includes('breakfast')} />
                <label htmlFor="lunch">Lunch</label>
                <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="lunch" name='lunch' checked={mealTypes.includes('lunch')} />
                <label htmlFor="dinner">Dinner</label>
                <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="dinner" name='dinner' checked={mealTypes.includes('dinner')} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {isRecipeModalAdd ? (
              <button className="modal-footer-Add" onClick={handleAddRecipe}>Add Recipe</button>)
              : (
                <div className='modal-footer-edit-delete'>
                  <button className="modal-footer-Edit" onClick={handleEditRecipe}>Edit Recipe</button>
                  <button className="modal-footer-Delete" onClick={fetchDeleteRecipe}>Delete Recipe</button>
                </div>
              )}
          </div>

          {isCalendarModal &&
            <CalendarModal calendar={calendar} date={date} />
          }
        </div>
      </Draggable>
    </div>
  );
};

export default RecipeModal;