import React, { useEffect, useState } from 'react'


export function CapacityFilter({ handleChange, filterBy }) {


    const [filterByCapacity, setfilterByCapacity] = useState(filterBy.capacity)

    useEffect(() => {
        handleChange({ name: 'capacity', value: filterByCapacity })
    }, [filterByCapacity])

    function onSetCount(type, diff) {
        setfilterByCapacity(prevFilter => {
            prevFilter[type] = prevFilter[type] + diff
            prevFilter.total = prevFilter.total + diff
            return ({ ...prevFilter })
        })
    }

    const { pets, adults, infants, kids } = filterByCapacity
    return (
        <section className="capacity-filter-inputs">
            <div className='count-input'>
                <div className='txt'><div className='title'>Adults</div><div className='desc'>Ages 13 or above</div></div>
                <div className='btns-container'>
                    <button disabled={adults ? false : true} onClick={() => onSetCount('adults', -1)}>-</button>
                    <div>{adults}</div>
                    <button onClick={() => onSetCount('adults', 1)}>+</button></div>

            </div>
            <div className='count-input'>
                <div className='txt'><div className='title'>Children</div><div className='desc'>Ages 2-12</div> </div>
                <div className='btns-container'>
                    <button disabled={kids ? false : true} onClick={() => onSetCount('kids', -1)}>-</button>
                    <div>{kids}</div>
                    <button onClick={() => onSetCount('kids', 1)}>+</button></div>

            </div>
            <div className='count-input'>
                <div className='txt'><div className='title'>Infants</div><div className='desc'>Under 2</div></div>
                <div className='btns-container'>
                    <button disabled={infants ? false : true} onClick={() => onSetCount('infants', -1)}>-</button>
                    <div>{infants}</div>
                    <button onClick={() => onSetCount('infants', 1)}>+</button></div>

            </div>
            <div className='count-input'>
                <div className='txt'><div className='title'>Pets</div><div className='desc'>Bringing a service animal</div>  </div>
                <div className='btns-container'>
                    <button disabled={pets ? false : true} onClick={() => onSetCount('pets', -1)}>-</button>
                    <div>{pets}</div>
                    <button onClick={() => onSetCount('pets', 1)}>+</button></div>

            </div>
        </section>
    )
}

// {{adultsCount} ? disabled ={false}: disabled ={true} }