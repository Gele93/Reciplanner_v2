import React, { useState, useEffect, useContext } from 'react';
import '../../css/recipemodal.css';
import CalendarModal from '../CalendarModal/CalendarModal';
import { RecipeContext } from '../../ContextProvider';
import Header from './Header';
import Description from './Description';
import Details from './Details';
import CalendarDetails from './CalendarDetails';
import Footer from './Footer';
import ConfirmToast from '../Toasts/ConfirmToast';

const RecipeModal = ({ isRecipeModalAdd, setIsRecipeModal, selectedRecipe, calendar, setCalendar, useAlertToast, recipes, setRecipes }) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [mealTypes, setMealTypes] = useState([]);
  const [servings, setServings] = useState(1);

  const [adjustedCalories, setAdjustedCalories] = useState(0)
  const [adjustedFat, setAdjustedFat] = useState(0)
  const [adjustedProtein, setAdjustedProtein] = useState(0)
  const [adjustedCarbs, setAdjustedCarbs] = useState(0)
  const [adjustedVitaminA, setAdjustedVitaminA] = useState(0)
  const [adjustedVitaminC, setAdjustedVitaminC] = useState(0)
  const [adjustedIngredients, setAdjustedIngredients] = useState([]);
  const [isCalendarModal, setIsCalendarModal] = useState(false)
  const [toastText, setToastText] = useState("")
  const [toastHeader, setToastHeader] = useState("")
  const [isConfirmToast, setIsConfirmToast] = useState(false)

  const { user, setUser } = useContext(RecipeContext)

  const handleCloseModal = () => {
    setIsRecipeModal(false);
  };

  const fetchPostNewRecipe = async (recipe) => {
    const userId = user.id
    let recipeToAdd = { ...recipe, userId }

    try {
      const response = await fetch(`https://localhost:7034/Recipes`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recipeToAdd,
        }),
      });

      if (response.ok) {
        useAlertToast(`${recipe.label} added successfully!`);
        const recipeId = await response.json()
        return recipeId
      } else {
        console.error('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    } finally {
      handleCloseModal();
      let updatedRecipes = [...recipes]
      updatedRecipes.push(recipeToAdd)
      setRecipes(updatedRecipes)
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
            if (calendar[curDate][mealIndex].id !== recipe.id) {
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

  const handleEditRecipe = async () => {
    if (mealTypes.length === 0) return

    let recipeToEdit = { ...selectedRecipe };
    recipeToEdit.yield = servings;
    recipeToEdit["startDate"] = date;
    recipeToEdit["mealTypes"] = mealTypes;

    if (checkEditAvailability(recipeToEdit)) {
      await fetchPatchEditedRecipe(recipeToEdit);
    } else {
      useAlertToast("Editing would cause overlapping")
    }

  };

  const handleAddRecipe = async () => {
    if (!user) return
    if (mealTypes.length === 0) return

    let recipeToAdd = { ...selectedRecipe }
    recipeToAdd.yield = servings
    recipeToAdd["startDate"] = date
    recipeToAdd["mealTypes"] = mealTypes
    recipeToAdd["caloriesPerServing"] = Math.round(recipeToAdd.calories / servings);

    if (checkAvailability(recipeToAdd)) {
      const addedRecipeId = await fetchPostNewRecipe(recipeToAdd)
      recipeToAdd["id"] = addedRecipeId
      updateCalendar(recipeToAdd)
    } else {
      useAlertToast("One or more meals overlapping!")
    }

  }

  const fetchPatchEditedRecipe = async (recipe) => {
    try {
      const response = await fetch(`https://localhost:7034/Recipes/${recipe.id}`, {
        method: 'PATCH',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recipe,
        }),
      });

      if (response.ok) {
        useAlertToast(`${recipe.label} updated successfully!`);
      } else {
        console.error('Failed to update recipe');
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    } finally {
      handleCloseModal();
      let updatedRecipes = [...recipes]
      updatedRecipes = updatedRecipes.map(r => r.id === recipe.id ? { ...recipe } : r)
      setRecipes(updatedRecipes)
    }
  };

  const fetchDeleteRecipe = async () => {
    try {
      const response = await fetch(`https://localhost:7034/Recipes/${selectedRecipe.id}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        useAlertToast(`${selectedRecipe.label} has been deleted!`)
        //        alert('Recipe deleted successfully!');
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    } finally {
      handleCloseModal();
      let updatedRecipes = [...recipes]
      updatedRecipes = updatedRecipes.filter(r => r.id != selectedRecipe.id)
      setRecipes(updatedRecipes)
      //  setIsConfirmToast(false)
    }
  };


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
    setToastText(`Would you like to delete ${selectedRecipe.label} from your recipes and calendar?`)
    setToastHeader(`Deleting ${selectedRecipe.label}`)
  }, [selectedRecipe])

  useEffect(() => {
    if (selectedRecipe && !isRecipeModalAdd) {
      setServings(selectedRecipe.yield);
      setDate(selectedRecipe.startDate);
      setMealTypes(selectedRecipe.mealTypes);
      adjustDetails();
    }
  }, [selectedRecipe, isRecipeModalAdd]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Header handleCloseModal={handleCloseModal} selectedRecipe={selectedRecipe} />
        <div className="modal-body">
          <div className="modal-image">
            <img src={selectedRecipe.image} alt={selectedRecipe.label} onError={(e) => e.target.src = "/altfood.png"} />
          </div>
          <Description selectedRecipe={selectedRecipe} adjustedVitaminA={adjustedVitaminA} adjustedVitaminC={adjustedVitaminC} />
          <Details
            adjustedCalories={adjustedCalories}
            selectedRecipe={selectedRecipe}
            adjustedIngredients={adjustedIngredients}
            adjustedFat={adjustedFat}
            adjustedProtein={adjustedProtein}
            adjustedCarbs={adjustedCarbs} />
          <CalendarDetails
            servings={servings}
            setServings={setServings}
            date={date}
            setDate={setDate}
            setIsCalendarModal={setIsCalendarModal}
            setMealTypes={setMealTypes}
            mealTypes={mealTypes}
          />
        </div>
        <Footer isRecipeModalAdd={isRecipeModalAdd} handleAddRecipe={handleAddRecipe} handleEditRecipe={handleEditRecipe} setIsConfirmToast={setIsConfirmToast} />
        {isCalendarModal &&
          <CalendarModal calendar={calendar} date={date} />
        }
      </div>
      {isConfirmToast &&
        <ConfirmToast
          confirmFunction={fetchDeleteRecipe}
          toastText={toastText}
          toastHeader={toastHeader}
          setIsConfirmToast={setIsConfirmToast}
        />}
    </div>
  );
};

export default RecipeModal;
