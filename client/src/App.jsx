import { useEffect, useState, useContext } from 'react'
import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from "./pages/Recipes.jsx"
import Calendar from "./pages/Calendar.jsx"
import CalendarMonth from "./pages/CalendarMonth.jsx"
import RecipeModal from './components/RecipeModal/RecipeModal.jsx';
import Home from "./pages/Home.jsx"
import Navbar from './components/Navbar.jsx';
import CreateUser from './pages/CreateUser.jsx';
import Profile from './components/Profile/Profile.jsx';
import MyRecipes from './pages/MyRecipes.jsx';
import { Link } from 'react-router-dom';
import { RecipeContext } from "./ContextProvider"
import EditProfile from './pages/EditProfile.jsx';
import AlertToast from './components/Toasts/AlertToast.jsx';
import { fetchRecipes, fetchLogedInUser } from './scripts.js';


function App() {

  const [isRecipeModal, setIsRecipeModal] = useState(false)
  const [isRecipeModalAdd, setIsRecipeModalAdd] = useState(true)
  const [calendar, setCalendar] = useState({})
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([])
  const [isLoginHighlight, setIsLoginHighlight] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [isAlertToast, setIsAlertToast] = useState(false)
  const [alertToastText, setAlertToastText] = useState(false)
  const { user, setUser } = useContext(RecipeContext)


  const updateCalendar = () => {
    let updatedCalendar = {}  //deleted {...calendar}
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
        }
      }
    })
    setCalendar(updatedCalendar)
  }

  const getRecipes = async () => {
    const recipes = await fetchRecipes()
    setRecipes(recipes)
  }

  const getLogedInUser = async (userId) => {
    const user = await fetchLogedInUser(userId)
    setUser(user)
    return user
  }


  useEffect(() => {
    const logedInUserId = localStorage.getItem("curUserId")
    if (logedInUserId) {
      if (getLogedInUser(logedInUserId)) {
        localStorage.setItem("curUserId", 0)
      }
    }
  }, [])

  useEffect(() => {
    if (user) {
      setCalendar({})
      setRecipes([])
      getRecipes()
    }
  }, [user])

  useEffect(() => {
    if (recipes && user) {
      updateCalendar()
    }
  }, [recipes, user])


  const useAlertToast = (alertText) => {
    setAlertToastText(alertText)
    setIsAlertToast(true)
    setTimeout(() => setIsAlertToast(false), 5000);
  }

  return (
    <Router>
      <div className='app'>
        <header className='header'>
          <div className='header-title'>
            <Link to="/">
              <img className='logo' src='/reciplanner.png' />
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
          <Route path='/calendar' element={<Calendar isRecipeModal={isRecipeModal} setRecipes={setRecipes} setSelectedRecipe={setSelectedRecipe} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} calendar={calendar} setCalendar={setCalendar} />} />
          <Route path='/calendar-month' element={<CalendarMonth isRecipeModal={isRecipeModal} setRecipes={setRecipes} setSelectedRecipe={setSelectedRecipe} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} calendar={calendar} setCalendar={setCalendar} />} />
          <Route path='/my-recipes' element={<MyRecipes recipes={recipes} setRecipes={setRecipes} setSelectedRecipe={setSelectedRecipe} setIsRecipeModal={setIsRecipeModal} setIsRecipeModalAdd={setIsRecipeModalAdd} updateCalendar={updateCalendar} useAlertToast={useAlertToast} isAlertToast={isAlertToast} setIsAlertToast={setIsAlertToast} alertToastText={alertToastText} />} />
        </Routes>
        {isRecipeModal && <RecipeModal isRecipeModal={isRecipeModal} isRecipeModalAdd={isRecipeModalAdd} setIsRecipeModal={setIsRecipeModal} selectedRecipe={selectedRecipe} calendar={calendar} setCalendar={setCalendar} useAlertToast={useAlertToast} isAlertToast={isAlertToast} alertToastText={alertToastText} setIsAlertToast={setIsAlertToast} recipes={recipes} setRecipes={setRecipes} />}
        <footer className='footer'>
          <p className='copyright'>&copy; 2024 reciPlanner. All rights reserved.</p>
        </footer>
        {
          <AlertToast
            alertToastText={alertToastText}
            isAlertToast={isAlertToast}
            setIsAlertToast={setIsAlertToast}
          />
        }
      </div>
    </Router>
  )
}


export default App
