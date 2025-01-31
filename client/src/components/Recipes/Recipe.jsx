import React from 'react'
import { shortenTitle } from '../../scripts'

function Recipe({recipe, openModal, index}) {

    return (
        <div className='recipe' key={`${recipe.label}recipes${index}`} onClick={() => openModal(recipe)}>
            <h2 className='recipe-title'>{shortenTitle(recipe.label)}</h2>
            <img className='recipe-img' src={recipe.image}></img>
            <div className='recipe-details'>
                <h3 className='recipe-detail'>{recipe.totalTime} mins</h3>
                <h3 className='recipe-detail'>{Math.round(recipe.calories / recipe.yield)} kcal</h3>
            </div>
            <div className='label-container'>
                {recipe.dietLabels.map((label, i) => (
                    <h3 key={`${label}label${i}`} className='recipe-labels'>{label}</h3>
                ))}
            </div>
        </div>
    )
}

export default Recipe