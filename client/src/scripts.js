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
        const response = await fetch("https://localhost:7034/User/login", {
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