import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import "../css/piechart.css"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

function Piechart({ curFirstDay, calendar }) {

    const [fat, setFat] = useState(0)
    const [sugar, setSugar] = useState(0)
    const [chocdf, setChocdf] = useState(0)
    const [procnt, setProcnt] = useState(0)

    const calculateTotalWeeklyNutritients = () => {
        try {
            let updatedTotalWeeklyFat = 0
            let updatedTotalWeeklySugar = 0
            let updatedTotalWeeklyChocdf = 0
            let updatedTotalWeeklyProcnt = 0
            for (let i = 0; i < 6; i++) {
                let checkDay = new Date(curFirstDay)
                checkDay.setDate(checkDay.getDate() + i)
                checkDay = checkDay.toISOString().slice(0, 10)
                if (calendar[checkDay]) {
                    calendar[checkDay].map(meal => {
                        if (typeof meal !== "string") {
                            updatedTotalWeeklyFat += meal.totalNutrients.FAT.quantity
                            updatedTotalWeeklySugar += meal.totalNutrients.SUGAR.quantity
                            updatedTotalWeeklyChocdf += meal.totalNutrients.CHOCDF.quantity
                            updatedTotalWeeklyProcnt += meal.totalNutrients.PROCNT.quantity
                        }
                    })
                }
            }

            setFat(Math.round(updatedTotalWeeklyFat))
            setSugar(Math.round(updatedTotalWeeklySugar))
            setChocdf(Math.round(updatedTotalWeeklyChocdf))
            setProcnt(Math.round(updatedTotalWeeklyProcnt))

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        calculateTotalWeeklyNutritients()
    }, [calendar, curFirstDay])


    //create PieChart:

    ChartJS.register(Title, Tooltip, Legend, ArcElement);


    // Data for the pie chart

    const data = {
        labels: [`Fat (${(fat/(fat+sugar+chocdf+procnt)).toFixed(2)*100}%)`, `Sugar (${(sugar/(fat+sugar+chocdf+procnt)).toFixed(2)*100}%)`, `Carbs (${(chocdf/(fat+sugar+chocdf+procnt)).toFixed(2)*100}%)`, `Protein (${(procnt/(fat+sugar+chocdf+procnt)).toFixed(2)*100}%)`],
        datasets: [
            {
                label: 'Nutrients',
                data: [fat, sugar, chocdf, procnt],
                backgroundColor: [
                    '#6B8E23',
                    '#F3C5C5 ',
                    '#F4A460',
                    '#4682B4'
                ],
                borderColor: [
                    '#387F39',
                    '#387F39',
                    '#387F39',
                    '#387F39',
                ],
                borderWidth: 1,
            },
        ],
    };


    // Options for the pie chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (context.parsed !== null) {
                            label += ': ' + context.parsed;
                        }
                        return label;
                    }
                }
            }
        },
    };



    return (
        <div className='piechart'>
            <Pie className='pie' data={data} options={options} />
        </div>
    )
}

export default Piechart