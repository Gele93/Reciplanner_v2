import React, { useEffect } from 'react'

function TEST() {

    useEffect(() => {
        const fetchTest = async () => {

         //   const resp = await fetch("/api/Recipes/test")
            const resp = await fetch("https://localhost:7034/Recipes/test")
            const test = await resp.text()
            console.log(resp)
            console.log(test)
            if (!resp.ok) {
                console.log ("Not good :(")
            } else {
                console.log(test, "Good ! :)") 
            }
        }
        fetchTest()
    })


    return (
        <div>TEST</div>
    )
}

export default TEST