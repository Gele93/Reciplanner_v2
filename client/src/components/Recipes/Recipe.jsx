import React from 'react'

function Recipe({recipe, openModal, index}) {

    const shortenTitle = (title) => {

        const maxLength = 25
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