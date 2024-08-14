import React, { useState, useEffect } from 'react';
import '../css/recipemodal.css';
import Draggable from "react-draggable";

const RecipeModal = ({ isRecipeModalAdd, setIsRecipeModal, selectedRecipe, calendar, setCalendar }) => {
  const [servings, setServings] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [mealTypes, setMealTypes] = useState([]);

  const [adjustedCalories, setAdjustedCalories] = useState(0)
  const [adjustedFat, setAdjustedFat] = useState(0)
  const [adjustedProtein, setAdjustedProtein] = useState(0)
  const [adjustedCarbs, setAdjustedCarbs] = useState(0)
  const [adjustedVitaminA, setAdjustedVitaminA] = useState(0)
  const [adjustedVitaminC, setAdjustedVitaminC] = useState(0)

  const handleCloseModal = () => {
    setIsRecipeModal(false);
  };

  const handleCheckChange = (e) => {
    const curMealType = e.target.name
    let updatedMealTypes = [...mealTypes]
    if (e.target.checked) {
      updatedMealTypes.push(curMealType)
    } else {
      updatedMealTypes = updatedMealTypes.filter(m => m !== mealTypes)
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
      const response = await fetch('/api/recipes', {
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

  const updateCalendar = (recipe) => {

    let counter = servings
    let curDate = new Date(recipe.startDate)
    let updatedCalendar = { ...calendar }

    for (let i = 0; i < counter;) {

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
        updatedCalendar[curDate][mealIndex] = recipe

        i++
        if (i.toString() === counter) break
      }
    }

    setCalendar(updatedCalendar)
  }


  const handleAddRecipe = async () => {

    if (mealTypes.length === 0) return

    let recipeToAdd = { ...selectedRecipe }
    recipeToAdd.yield = servings
    recipeToAdd["startDate"] = date
    recipeToAdd["mealTypes"] = mealTypes
    recipeToAdd["caloriesPerServing"] = recipeToAdd.calories / recipeToAdd.yield;

    if (checkAvailability(recipeToAdd)) {
      updateCalendar(recipeToAdd)
      await fetchPostNewRecipe(recipeToAdd)
    }

  }


  const handleEditRecipe = async () => {
    if (mealTypes.length === 0) return

    let recipeToEdit = { ...selectedRecipe };
    recipeToEdit.yield = servings;
    recipeToEdit["startDate"] = date;
    recipeToEdit["mealTypes"] = mealTypes;

    // updateCalendar(recipeToEdit);
    await fetchPatchEditedRecipe(recipeToEdit);
    window.location.reload()


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
        handleCloseModal();
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const increaseServings = () => setServings(prev => prev + 1);
  const decreaseServings = () => setServings(prev => prev > 1 ? prev - 1 : 1);

  const adjustDetails = () => {
    setAdjustedCalories(Math.round((selectedRecipe.calories / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)) // anyag összmennyisége / adagszám =  1 adag és * új adagszámmal (servings)
    setAdjustedFat((selectedRecipe.totalNutrients.FAT.quantity / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)
    setAdjustedProtein((selectedRecipe.totalNutrients.PROCNT.quantity / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)
    setAdjustedCarbs((selectedRecipe.totalNutrients.CHOCDF.quantity / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)
    setAdjustedVitaminA((selectedRecipe.totalNutrients.VITA_RAE.quantity / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)
    setAdjustedVitaminC((selectedRecipe.totalNutrients.VITC.quantity / (isRecipeModalAdd ? selectedRecipe.yield : selectedRecipe.servings)) * servings)
  }

  useEffect(() => {
    if (selectedRecipe) {
      adjustDetails()
    }
  }, [selectedRecipe, servings])

  return (
    <div className="modal-overlay">
      <Draggable cancel="input, .modal-close-button, label, .modal-footer, img" bounds={{ top: -200, left: -1300, right: 250, bottom: 100 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>{selectedRecipe.label}</h2>
            <button onClick={handleCloseModal} className="modal-close-button">X</button>
          </div>
          <div className="modal-body">
            <div className="modal-image">
              <img src={selectedRecipe.image} alt={selectedRecipe.label} />
            </div>
            <div className="modal-description">
              <div id='descriptionTitle'>
                <p><strong>Descriptions</strong></p>
              </div>
              <p><strong>Source:</strong> {selectedRecipe.source}</p>
              <p><strong>Cuisine:</strong> {selectedRecipe.cuisineType}</p>
              <p><strong>Dish Type:</strong> {selectedRecipe.dishType}</p>
              <p><strong>Ingredients:</strong> {selectedRecipe.ingredientLines.join(', ')}</p>
              <p><strong>Nutrition:</strong> Fat: {adjustedFat.toFixed(2)}g, Protein: {adjustedProtein.toFixed(2)}g, Carbs: {adjustedCarbs.toFixed(2)}g</p>
              <p><strong>Vitamins:</strong> Vitamin A: {adjustedVitaminA.toFixed(2)}%, Vitamin C: {adjustedVitaminC.toFixed(2)}%</p>
              <p><strong>Diet Labels:</strong> {selectedRecipe.dietLabels.join(', ')}</p>
              <p><strong>Health Labels:</strong> {selectedRecipe.healthLabels.join(', ')}</p>
              <a href={selectedRecipe.url}>View Full Recipe</a>
            </div>
            <div className="kcal-container">
              <h3>{adjustedCalories} kcal</h3>
            </div>
            <div className="time-container">
              <h3>{selectedRecipe.totalTime} prep time</h3>
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
              </div>
              <div className="meal-types-container">
                <label htmlFor="breakfast">Breakfast</label>
                <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="breakfast" name='breakfast' />
                <label htmlFor="lunch">Lunch</label>
                <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="lunch" name='lunch' />
                <label htmlFor="dinner">Dinner</label>
                <input onChange={(e) => handleCheckChange(e)} type="checkbox" id="dinner" name='dinner' />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {isRecipeModalAdd ? (
              <button onClick={handleAddRecipe}>Add Recipe</button>)
              : (
                <>
                  <button onClick={handleEditRecipe}>Edit Recipe</button>
                  <button onClick={fetchDeleteRecipe}>Delete Recipe</button>
                </>
              )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default RecipeModal;