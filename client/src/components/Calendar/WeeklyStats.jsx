import React from 'react'
import Piechart from "../Piechart.jsx"


function WeeklyStats({weeklyTotalKcal, curFirstDay, calendar}) {
  return (
                <div className='weekly-stat'>
                    <div className='stat-title'>Stats</div>
                    <div className='stat-weekly-kcal-title'>Total kcal:</div>
                    <div className='stat-weekly-kcal'>{weeklyTotalKcal}</div>
                    <div className='stat-chart'>
                        <Piechart curFirstDay={curFirstDay} calendar={calendar} />
                    </div>
                </div>  )
}

export default WeeklyStats