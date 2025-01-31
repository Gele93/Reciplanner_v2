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


export const shortenTitle = (title) => {
    if (!title) return
    const maxLength = 20
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