import React from 'react'
import "../css/filter.css"
import { useEffect, useState } from 'react'
import { APP_ID, APP_KEY } from "../apikey.js"


function Filter({ setfilteredRecepies, health, name, diet, calories, setCalories, setName, setDiet, setMealType, mealType, setHealth }) {

    let boxes = document.querySelectorAll("input[type=checkbox]");

    boxes.forEach(b => b.addEventListener("change", tick));
    function tick(e) {
        let state = e.target.checked;
        boxes.forEach(b => b.checked = false);
        e.target.checked = state;
    }


    function filterToURL() {
        let url = ""
        let urlName = `https://api.edamam.com/api/recipes/v2?type=public&q=${name}&app_id=${APP_ID}&app_key=${APP_KEY}`
        let urlNoName = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
        url = name ? urlName : urlNoName

        calories ? url = url + `&calories=${calories}` : null
        diet ? url = url + `&diet=${diet}` : null
        mealType ? url = url + `&mealType=${mealType}` : null
        health ? url = url + `&health=${health}` : null
        return url
    }

    const fetchRecipes = async (fetchUrl) => {
        try {
            const response = await fetch(fetchUrl)
            if (!response.ok) {
                throw new Error("fetching recipes went wrong")
            }
            const recipesObj = await response.json()
            setfilteredRecepies(recipesObj.hits)

        } catch (error) {

        }
    }

    const handleSearchClcik = () => {
        const searchUrl = filterToURL()
        fetchRecipes(searchUrl)
    }


    const handleCheckChange = (e) => {

        let changedMealType = e.target.value

        let updatedMealType = ""
        if (e.target.checked) {
            updatedMealType = changedMealType
        } else {
            updatedMealType = ""
        }
        setMealType(updatedMealType)
    }


    return (
        <div className='filter-container'>
            <h1 className='filter-title'>Filter recipes</h1>
            <form className='filter-form'>
                <div className='filter-row'>
                    <label className='filter-label'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} id="Name" className='filter-input' type='text' />
                </div>
                <div className='filter-row'>
                    <label className='filter-label'>Diet</label>
                    <select onChange={(e) => setDiet(e.target.value)} name="diets" className='filter-input'>
                        <option value="">--None--</option>
                        <option value="balanced">Balanced</option>
                        <option value="high-fiber">High fiber</option>
                        <option value="high-protein">High protein</option>
                        <option value="low-carb">Low carb</option>
                        <option value="low-fat">Low fat</option>
                        <option value="low-sodium">Low sodium</option>
                    </select>

                </div>
                <div className='filter-row'>
                    <label className='filter-label'>Health</label>
                    <select onChange={(e) => setHealth(e.target.value)} name="healths" className='filter-input'>
                        <option value="">--None--</option>
                        <option value="alcohol-cocktail">Alcohol cocktail</option>
                        <option value="celery-free">Celery free</option>
                        <option value="egg-free">Egg free</option>
                        <option value="fish-free">Fish free</option>
                        <option value="fodmap-free">Fodmap free</option>
                        <option value="gluten-free">Gluten free</option>
                        <option value="immuno-supportive">Immuno supportive</option>
                        <optgroup label='Life Style'>
                            <option value="alcohol-free">Alcohol free</option>
                            <option value="keto-friendly">Keto Friendly</option>
                            <option value="vegan">Vegan</option>
                        </optgroup>
                        <optgroup label='Allergies'>
                            <option value="shellfish-free">Shellfish free</option>
                            <option value="peanut-free">Peanut free</option>
                            <option value="mustard-free">Mustard free</option>
                            <option value="crustacean-free">Low carb</option>
                            <option value="dairy-free">Diary free</option>
                        </optgroup>



                    </select>

                </div>
                <div className='filter-row'>
                    <label className='filter-label'>Calories</label>
                    <input onChange={(e) => setCalories(e.target.value)} id="Calories" className='filter-input' type='text' placeholder="(example 100-300)" />
                </div>
                <div className='meal-type-check-box'>
                    <div className='check-box-row'>
                        <label htmlFor='bf'>Breakfast</label>
                        <input onClick={(e) => handleCheckChange(e)} id="bf" type="checkbox" name="mealType" value="Breakfast" className='meal-type-input' />
                    </div>
                    <div className='check-box-row'>
                        <label htmlFor='l'>Lunch</label>
                        <input onClick={(e) => handleCheckChange(e)} id="l" type="checkbox" name="mealType" value="Lunch" className='meal-type-input' />
                    </div>
                    <div className='check-box-row'>
                        <label htmlFor='d'>Dinner</label>
                        <input onClick={(e) => handleCheckChange(e)} id="d" type="checkbox" name="mealType" value="Dinner" className='meal-type-input' />
                    </div>
                    <div className='check-box-row'>
                        <label htmlFor='s'>Snak</label>
                        <input onClick={(e) => handleCheckChange(e)} id="s" type="checkbox" name="mealType" value="Snack" className='meal-type-input' />
                    </div>
                </div>

                <button className="filterButton" type="button" onClick={handleSearchClcik}>Search</button>

            </form>
        </div>

    )
}

export default Filter