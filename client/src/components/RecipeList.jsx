import React, { useEffect, useState } from 'react'
import "../css/recipelist.css"

function RecipeList({ setSelectedRecipe, filteredRecepies, setIsRecipeModal, setIsRecipeModalAdd }) {

  const [recipesPerPages, setRecipesPerPages] = useState({})
  const [curPage, setCurPage] = useState(0)
  const [pageNumbers, setPageNumbers] = useState([])

  useEffect(() => {
    if (filteredRecepies) {
      let updatedRecipesPerPages = {}
      let updatedPageNumbers = []
      for (let i = 0; i < Math.ceil(filteredRecepies.length / 8); i++) {
        updatedPageNumbers.push(i + 1)
        for (let j = 0; j < 8; j++) {

          if ((i * 8) + j < filteredRecepies.length - 1) {

            if (!updatedRecipesPerPages[i]) {
              updatedRecipesPerPages[i] = []
            }
            if (filteredRecepies[(i * 8) + j].recipe) {
              updatedRecipesPerPages[i].push(filteredRecepies[(i * 8) + j].recipe)
            }
          }
        }
      }
      setPageNumbers(updatedPageNumbers)
      setRecipesPerPages(updatedRecipesPerPages)
    }
  }, [filteredRecepies])


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

  const handleNextPageClick = () => {

    let lastPage = 0

    for (const key in recipesPerPages) {
      lastPage = key
    }

    let updatedPage = curPage
    if (curPage < lastPage) {
      updatedPage++
    }

    setCurPage(updatedPage)
  }
  const handlePrevPageClick = () => {

    let updatedPage = curPage
    if (curPage > 0) {
      updatedPage--
    }

    setCurPage(updatedPage)
  }

  const handlePageNumberClick = (p) => {
    setCurPage(p - 1)
  }

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeModalAdd(true);
    setIsRecipeModal(true);
  };

  return (
    <div className='recipe-list-container'>

      {recipesPerPages[curPage] &&
        recipesPerPages[curPage].map((recipe, i) => (
          <div className='recipe' key={`${recipe.label}recipes${i}`} onClick={() => openModal(recipe)}>
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
        ))}
      <div className='pages'>
        {recipesPerPages[curPage] &&
          <>
            <button onClick={handlePrevPageClick} type='button' className='prev-page'>← prev</button>
            {pageNumbers.map(p => (
              <button key={p} onClick={() => handlePageNumberClick(p)} className='page-number' type='button'>{p}</button>
            ))}
            <button onClick={handleNextPageClick} type='button' className='next-page'>next →</button>
          </>
        }
      </div>
    </div>

  )
}

export default RecipeList