import { useEffect, useState, useContext } from 'react'
import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from "./components/Recipes.jsx"
import Calendar from "./components/Calendar.jsx"
import RecipeModal from './components/RecipeModal.jsx';
import Home from "./components/Home.jsx"
import Navbar from './components/Navbar.jsx';
import CreateUser from './pages/CreateUser.jsx';
import { Link } from 'react-router-dom';
import  ContextProvider  from './ContextProvider.jsx';

function App() {

  const [isRecipeModal, setIsRecipeModal] = useState(false)
  const [isRecipeModalAdd, setIsRecipeModalAdd] = useState(true)
  const [calendar, setCalendar] = useState({})
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([])

  const updateCalendar = () => {
    let updatedCalendar = { ...calendar }

    recipes.map((recipe) => {

      let counter = recipe.servings
      let curDate = new Date(recipe.startDate)

      for (let i = 0; i < recipe.servings;) {

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
            //      console.log(curDate)
            //    console.log(updatedCalendar[curDate][mealIndex], recipe.label)

            updatedCalendar[curDate][mealIndex] = recipe
          }

          counter--
          i++
          // if (i.toString() === counter) break
        }
      }
    })
    console.log(updatedCalendar)
    setCalendar(updatedCalendar)
  }


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes")
        if (!response.ok) {
          throw new Error("fetching recipes went wrong")
        }
        const recipes = await response.json()
        setRecipes(recipes)
      } catch (error) {
        console.error(error)
      }
    }
    fetchRecipes()
  }, [])


  useEffect(() => {
    if (recipes) {
      updateCalendar()
      //  recipes.map(r => updateCalendar(r))
    }
  }, [recipes])


  return (
    <Router>
      <ContextProvider>
        <div className='app'>
          <header className='header'>
            <div className='header-title'>
              <Link to="/">
                reci<span className='p'>P</span>lanner
              </Link>
            </div>
            <Navbar />
          </header>
          <Routes>
            <Route path='/' element={<Home setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} setSelectedRecipe={setSelectedRecipe} />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path='/recipes' element={<Recipes setSelectedRecipe={setSelectedRecipe} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} />} />
            <Route path='/calendar' element={<Calendar isRecipeModal={isRecipeModal} setRecipes={setRecipes} setSelectedRecipe={setSelectedRecipe} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} calendar={calendar} setCalendar={setCalendar} />} />
          </Routes>
          {isRecipeModal && <RecipeModal isRecipeModal={isRecipeModal} isRecipeModalAdd={isRecipeModalAdd} setIsRecipeModal={setIsRecipeModal} selectedRecipe={selectedRecipe} calendar={calendar} setCalendar={setCalendar} />}
          <footer className='footer'>
            <p>&copy; 2024 reciPlanner. All rights reserved.</p>
          </footer>
        </div>
      </ContextProvider>
    </Router>
  )
}


export default App
