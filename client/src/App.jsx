import { useEffect, useState, useContext } from 'react'
import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from "./pages/Recipes.jsx"
import Calendar from "./pages/Calendar.jsx"
import CalendarMonth from "./pages/CalendarMonth.jsx"
import RecipeModal from './components/RecipeModal.jsx';
import Home from "./pages/Home.jsx"
import Navbar from './components/Navbar.jsx';
import CreateUser from './pages/CreateUser.jsx';
import Profile from './components/Profile/Profile.jsx';
import TEST from './components/TEST.jsx';
import { Link } from 'react-router-dom';
import { RecipeContext } from "./ContextProvider"
import EditProfile from './pages/EditProfile.jsx';


function App() {

  const [isRecipeModal, setIsRecipeModal] = useState(false)
  const [isRecipeModalAdd, setIsRecipeModalAdd] = useState(true)
  const [calendar, setCalendar] = useState({})
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([])
  const [isLoginHighlight, setIsLoginHighlight] = useState(false)
  const [loginError, setLoginError] = useState("")  

  const { user, setUser } = useContext(RecipeContext)


  const updateCalendar = () => {
    let updatedCalendar = { ...calendar }
    recipes.map((recipe) => {

      let counter = recipe.yield
      let curDate = new Date(recipe.startDate)

      for (let i = 0; i < recipe.yield;) {

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
          // if (i.toString() === counter) break
        }
      }
    })
    setCalendar(updatedCalendar)
  }

  const fetchLogedInUser = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7034/User/${userId}`)
      if (!response.ok) {
        return null
      }
      const user = await response.json()
      return setUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setCalendar({})
    setRecipes([])
  }, [user])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://localhost:7034/Recipes`, {
          method: "GET",
          credentials: "include",
        })
        if (!response.ok) {
          throw new Error("fetching recipes went wrong")
        }
        const recipes = await response.json()
        setRecipes(recipes)
      } catch (error) {
        console.error(error)
      }
    }
    if (user) {
      fetchRecipes()
    }
  }, [user])

  useEffect(() => {
    if (recipes && user) {
      updateCalendar()
    }
  }, [recipes, user])

  useEffect(() => {
    const logedInUserId = localStorage.getItem("curUserId")
    if (logedInUserId) {
      fetchLogedInUser(logedInUserId)
    }
  }, [])

  //old header title 
  //reci<span className='p'>P</span>lanner

  return (
    <Router>
      <div className='app'>
        <header className='header'>
          <div className='header-title'>
            <Link to="/">
            <img className='logo' src='/reciplanner.png'/>
            </Link>
          </div>
          <Navbar setIsLoginHighlight={setIsLoginHighlight} setLoginError={setLoginError} />
          <Profile />
        </header>
        <Routes>
          <Route path='/' element={<Home isLoginHighlight={isLoginHighlight} setIsLoginHighlight={setIsLoginHighlight} loginError={loginError} setLoginError={setLoginError} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} setSelectedRecipe={setSelectedRecipe} />} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/edit-profile/:userid' element={<EditProfile />} />
          <Route path='/recipes' element={<Recipes setSelectedRecipe={setSelectedRecipe} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} />} />
          <Route path='/calendar' element={<Calendar isRecipeModal={isRecipeModal} setRecipes={setRecipes} setSelectedRecipe={setSelectedRecipe} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} calendar={calendar} setCalendar={setCalendar}/>} />
          <Route path='/calendar-month' element={<CalendarMonth isRecipeModal={isRecipeModal} setRecipes={setRecipes} setSelectedRecipe={setSelectedRecipe} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} calendar={calendar} setCalendar={setCalendar} />} />
          <Route path='/test' element={<TEST />} />
        </Routes>
        {isRecipeModal && <RecipeModal isRecipeModal={isRecipeModal} isRecipeModalAdd={isRecipeModalAdd} setIsRecipeModal={setIsRecipeModal} selectedRecipe={selectedRecipe} calendar={calendar} setCalendar={setCalendar}/>}
        <footer className='footer'>
          <p className='copyright'>&copy; 2024 reciPlanner. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}


export default App
