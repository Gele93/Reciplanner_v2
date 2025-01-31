import React from 'react'

function PageButtons({ handlePrevPageClick, handleNextPageClick, handlePageNumberClick, pageNumbers, curPage }) {
    return (
        <>
            <button onClick={handlePrevPageClick} type='button' className='prev-page'>← prev</button>
            {pageNumbers.map(p => (
                <button key={p} onClick={() => handlePageNumberClick(p)} className={`page-number ${p == curPage+1 ? "active-page" : ""}`} type='button'>{p}</button>
            ))}
            <button onClick={handleNextPageClick} type='button' className='next-page'>next →</button>
        </>
    )
}

export default PageButtons