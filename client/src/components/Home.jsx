import React from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'


function Home() {

    const healthLabels = [
        "Sugar-Conscious",
        "Keto-Friendly",
        "Gluten-Free",
        "Wheat-Free",
        "Egg-Free",
        "Peanut-Free",
        "Tree-Nut-Free",
        "Soy-Free",
        "Fish-Free",
        "Shellfish-Free",
        "Pork-Free",
        "Red-Meat-Free",
        "Crustacean-Free",
        "Celery-Free",
        "Mustard-Free",
        "Sesame-Free",
        "Lupine-Free",
        "Mollusk-Free",
        "Alcohol-Free",
        "Sulfite-Free",
        "FODMAP-Free",
        "Immuno-Supportive"
    ]

    return (
        <div className='home'>
            <div className='login-container'>
                <h1 className='welcome-title'>Welcome to reciPlanner!</h1>
                <p className='welcome-msg'> Welcome to our recipe haven! Discover a world of culinary inspiration with our handpicked recipes, tips, and tricks. Whether you're a seasoned chef or a kitchen newbie, we have something to spark your cooking creativity and make every meal special. Dive in and start exploring today!</p>
                <Link className='login-button' to="/recipes">See recipes</Link>
            </div>
            <div className='slide-outter-container'>
                <div className='slide-title'>Hottest Dishes</div>
                <div className='slide-container'>
                    <div className='slide-elements'>
                        <div className='slide-recipe'>
                            <h2 className='slide-recipe-title'>Pörkölt1</h2>
                            <img className='slide-recipe-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJUh7lRyRNXAW6lCuH01i0bRjfBtj3ZuuUMw&s'></img>
                            <div className='slide-recipe-details'>
                                <h3 className='slide-recipe-detail'>120 mins</h3>
                                <h3 className='slide-recipe-detail'>500 kcal</h3>
                            </div>
                            <div className='label-container'>
                                {healthLabels.map((l, i) => (
                                    <h3 key={i} className='recipe-labels'>{l}</h3>
                                ))}
                            </div>
                        </div>
                        <div className='slide-recipe'>
                            <h2 className='slide-recipe-title'>Pörkölt2</h2>
                            <img className='slide-recipe-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJUh7lRyRNXAW6lCuH01i0bRjfBtj3ZuuUMw&s'></img>
                            <div className='slide-recipe-details'>
                                <h3 className='slide-recipe-detail'>120 mins</h3>
                                <h3 className='slide-recipe-detail'>500 kcal</h3>
                            </div>
                            <div className='label-container'>
                                {healthLabels.map((l, i) => (
                                    <h3 key={i} className='recipe-labels'>{l}</h3>
                                ))}
                            </div>
                        </div>
                        <div className='slide-recipe'>
                            <h2 className='slide-recipe-title'>Pörkölt3</h2>
                            <img className='slide-recipe-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJUh7lRyRNXAW6lCuH01i0bRjfBtj3ZuuUMw&s'></img>
                            <div className='slide-recipe-details'>
                                <h3 className='slide-recipe-detail'>120 mins</h3>
                                <h3 className='slide-recipe-detail'>500 kcal</h3>
                            </div>
                            <div className='label-container'>
                                {healthLabels.map((l, i) => (
                                    <h3 key={i} className='recipe-labels'>{l}</h3>
                                ))}
                            </div>
                        </div>
                        <div className='slide-recipe'>
                            <h2 className='slide-recipe-title'>Pörkölt4</h2>
                            <img className='slide-recipe-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJUh7lRyRNXAW6lCuH01i0bRjfBtj3ZuuUMw&s'></img>
                            <div className='slide-recipe-details'>
                                <h3 className='slide-recipe-detail'>120 mins</h3>
                                <h3 className='slide-recipe-detail'>500 kcal</h3>
                            </div>
                            <div className='label-container'>
                                {healthLabels.map((l, i) => (
                                    <h3 key={i} className='recipe-labels'>{l}</h3>
                                ))}
                            </div>
                        </div>
                        <div className='slide-recipe'>
                            <h2 className='slide-recipe-title'>Pörkölt5</h2>
                            <img className='slide-recipe-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJUh7lRyRNXAW6lCuH01i0bRjfBtj3ZuuUMw&s'></img>
                            <div className='slide-recipe-details'>
                                <h3 className='slide-recipe-detail'>120 mins</h3>
                                <h3 className='slide-recipe-detail'>500 kcal</h3>
                            </div>
                            <div className='label-container'>
                                {healthLabels.map((l, i) => (
                                    <h3 key={i} className='recipe-labels'>{l}</h3>
                                ))}
                            </div>
                        </div>
                        <div className='slide-recipe'>
                            <h2 className='slide-recipe-title'>Pörkölt6</h2>
                            <img className='slide-recipe-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJUh7lRyRNXAW6lCuH01i0bRjfBtj3ZuuUMw&s'></img>
                            <div className='slide-recipe-details'>
                                <h3 className='slide-recipe-detail'>120 mins</h3>
                                <h3 className='slide-recipe-detail'>500 kcal</h3>
                            </div>
                            <div className='label-container'>
                                {healthLabels.map((l, i) => (
                                    <h3 key={i} className='recipe-labels'>{l}</h3>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home