import React, { useEffect, useState } from 'react'
import "../../css/recipelist.css"
import Recipe from './Recipe'
import PageButtons from './PageButtons'

function RecipeList({ filteredRecepies, openAddModal }) {

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

  return (
    <div className='recipe-list-container'>
      {recipesPerPages[curPage] &&
        recipesPerPages[curPage].map((recipe, i) => (
          <Recipe recipe={recipe} openAddModal={openAddModal} index={i} />
        ))}
      <div className='pages'>
        {recipesPerPages[curPage] &&
          <PageButtons
            handleNextPageClick={handleNextPageClick}
            handlePrevPageClick={handlePrevPageClick}
            handlePageNumberClick={handlePageNumberClick}
            pageNumbers={pageNumbers}
            curPage={curPage} />
        }
      </div>
    </div>

  )
}

export default RecipeList