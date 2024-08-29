
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from "../components/Login.jsx"
import '../css/home.css';

function Home({ setIsRecipeModal, setIsRecipeModalAdd, setSelectedRecipe, isLoginHighlight, loginError, setLoginError, setIsLoginHighlight }) {
    const [recipes, setRecipes] = useState([]);
    const [randomIngredient, setRandomIngredient] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const ingredients = [
        "chicken", "beef", "carrot", "broccoli", "tofu", "salmon",
        "rice", "potato", "mushroom", "spinach", "tomato", "pork",
        "zucchini", "eggplant", "lentils", "quinoa", "shrimp",
        "avocado", "garlic", "onion", "bell pepper", "cauliflower",
        "cabbage", "kale", "sweet potato", "turkey", "bacon",
        "peanut butter", "almond", "walnut", "cucumber", "chickpeas"
    ];


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



    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setIsLoading(true)
                const app_id = "178c9822";
                const app_key = "431ecb24042ab21d36088d8d4e110c38";

                const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
                setRandomIngredient(randomIngredient);
                const response = await fetch(`https://api.edamam.com/search?q=${randomIngredient}&app_id=${app_id}&app_key=${app_key}`);
                const data = await response.json();

                const recipeTitles = [];

                const uniqueRecipes = data.hits.map(hit => hit.recipe).filter(recipe => {
                    if (recipeTitles.includes(recipe.label)) {
                        return false;
                    } else {
                        recipeTitles.push(recipe.label);
                        return true;
                    }
                });

                setRecipes(uniqueRecipes.slice(0, 10));

            }
            catch (error) {
                console.error(error);
            }
            finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500)
            }

        };
        fetchRecipes();
    }, []);

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setIsRecipeModalAdd(true);
        setIsRecipeModal(true);
    };

    return (
        <div className='home'>
            <div className="login-container">
                <h1 className='welcome-title'>Welcome to reciPlanner!</h1>
                <p className='welcome-msg'> Dive into a culinary journey with reciPlanner, your ultimate tool for meal planning and recipe discovery. Whether you're a seasoned chef or just getting started in the kitchen, our platform is designed to help you organize your meals with ease.</p>
                <Login isLoginHighlight={isLoginHighlight} loginError={loginError} setLoginError={setLoginError} setIsLoginHighlight={setIsLoginHighlight}/>
            </div>
            <div className='slide-outter-container'>
                {isLoading ? <div className='loading'></div> :
                    <>
                        <div className='slide-title'> {`Dishes with ${randomIngredient}`} </div>
                        <div className='slide-container'>
                            <div className='slide-elements'>
                                {recipes.map((recipe) => (
                                    <div className='slide-recipe' key={recipe.label} onClick={() => openModal(recipe)}>
                                        <h2 className='slide-recipe-title'>{shortenTitle(recipe.label)}</h2>
                                        <img className='slide-recipe-img' src={recipe.image}></img>
                                        <div className='slide-recipe-details'>
                                            <h3 className='slide-recipe-detail'>{recipe.totalTime} mins</h3>
                                            <h3 className='slide-recipe-detail'>{Math.round(recipe.calories)} kcal</h3>
                                        </div>
                                        <div className='label-container'>
                                            {recipe.dietLabels.map((label, i) => (
                                                <h3 key={i} className='recipe-labels'>{label}</h3>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Home
