import React from 'react'
import "../css/filter.css"
import { useEffect, useState } from 'react'
import { APP_ID, APP_KEY } from "../apikey.js"


function Filter({ setfilteredRecepies , name, diet, calories, setCalories, setName, setDiet }) {


    function filterToURL() {
        let url = ""
        let urlName = `https://api.edamam.com/api/recipes/v2?type=public&q=${name}&app_id=${APP_ID}&app_key=${APP_KEY}`
        let urlNoName = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
        url = name ? urlName : urlNoName

        calories ? url = url + `&calories=${calories}` : null
        diet ? url = url + `&diet=${diet}` : null
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
                    <input id="diet" onChange={(e) => setDiet(e.target.value)} className='filter-input' type='text' />
                </div>
                <div className='filter-row'>
                    <label className='filter-label'>Calories</label>
                    <input onChange={(e) => setCalories(e.target.value)} id="Calories" className='filter-input' type='text' placeholder="(example 100-300)" />
                </div>
                <button type="button" onClick={handleSearchClcik}>Search</button>
            </form>

        </div>

    )
}

export default Filter