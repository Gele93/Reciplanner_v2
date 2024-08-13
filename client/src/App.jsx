import { useEffect, useState } from 'react'
import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from "./components/Recipes.jsx"
import Calendar from "./components/Calendar.jsx"
import RecipeModal from './components/RecipeModal.jsx';
import Home from "./components/Home.jsx"
import Navbar from './components/Navbar.jsx';
import { Link } from 'react-router-dom';

function App() {

  //modál nyitva van-é?
  const [isRecipeModal, setIsRecipeModal] = useState(false)
  //új recipe vagy modif recip ? milyen feccs menejen?
  const [isRecipeModalAdd, setIsRecipeModalAdd ] = useState(true)




  return (
    <Router>
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
          <Route path='/' element={<Home />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/calendar' element={<Calendar />} />
        </Routes>
        {isRecipeModal && <RecipeModal />}
        <footer className='footer'>
          <p>&copy; 2024 reciPlanner. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}


export default App
