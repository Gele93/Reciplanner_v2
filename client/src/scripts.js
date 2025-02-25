export const fillMealDetails = (curDate, curMeal, curKey, calendar) => {
    let mealIndex = 0
    switch (curMeal) {
        case "breakfast": mealIndex = 0
            break;
        case "lunch": mealIndex = 1
            break;
        case "dinner": mealIndex = 2
            break;
    }

    if (calendar[curDate]) {
        if (calendar[curDate][mealIndex] !== curMeal) {
            if (curKey === "caloriesPerServing") {
                const kcalPerServing = Math.round(calendar[curDate][mealIndex][curKey])
                return kcalPerServing
            } else {
                return calendar[curDate][mealIndex][curKey]
            }
        }
    }
    return false
}


export const getCurFood = (curDate, curMeal, calendar) => {
    let mealIndex = 0

    switch (curMeal) {
        case "breakfast": mealIndex = 0
            break;
        case "lunch": mealIndex = 1
            break;
        case "dinner": mealIndex = 2
            break;
    }

    if (calendar[curDate]) {
        if (calendar[curDate][mealIndex] !== curMeal) {
            return calendar[curDate][mealIndex]
        }
    }
    return false
}


export const shortenTitle = (title, maxLength) => {
    if (!title) return
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



export const fetchLogin = async (loginData) => {
    try {
        const response = await fetch("/api/User/login", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                loginData,
            ),
        })
        if (!response.ok) {
            return null
        }
        const user = await response.json()
        return user
    } catch (error) {
        console.error(error)
    }
}

export const fetchLogout = async () => {
    try {
        const response = await fetch("/api/User/logout", {
            method: 'POST',
            credentials: "include",
        })
        if (!response.ok) {
            throw new Error("Logout went wrong")
        }
    } catch (error) {
        console.error(error)
    }
}

export const fetchLogedInUser = async (userId) => {
    try {
        const response = await fetch(`/api/User/${userId}`, {
            method: "GET",
            credentials: "include"
        })
        if (!response.ok) {
            return null
        }
        const user = await response.json()
        return user
    } catch (error) {
        console.error(error)
    }
}

export const fetchRecipes = async () => {
    try {
        const response = await fetch(`/api/Recipes`, {
            method: "GET",
            credentials: "include"
        })
        if (!response.ok) {
            throw new Error("fetching recipes went wrong")
        }
        const recipes = await response.json()
        return recipes
    } catch (error) {
        console.error(error)
    }
}

export const calculateEndDateOfRecipe = (recipe) => {
    let daysPassed = 0
    const startDate = new Date(recipe.startDate)
    let endDate = new Date(startDate)

    for (let i = 0; i < recipe.yield;) {
        for (const mealType of recipe.mealTypes) {
            i++
        }
        daysPassed++
    }

    endDate.setDate(startDate.getDate() + daysPassed)
    return endDate
}