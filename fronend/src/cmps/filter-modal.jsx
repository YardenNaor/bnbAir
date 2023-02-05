
import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { amenities } from "../services/stay.service"
import { useSelector } from 'react-redux'

import { loadStays } from '../store/stay.actions'


export function FilterModal({ setIsFilterModalShown, stays, filterBy }) {

    // const stays = useSelector((state) => state.stayModule.stays)
    // const filterBy = useSelector((state) => state.stayModule.filterBy)

    const [isListLong, setIsListLong] = useState(false)

    function handleChange(field, value, count) {
        console.log('field,value,count:', field, value, count)
    }

    function getRoomsInputs(type) {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8]
            
            return <div className={`range ${type}`} key={type}>
            <div className="any-btn">Any</div> {nums.map((num) => {
                return <div className="number" onClick={() => handleChange('roomsAndBeds', type, num)}>
                    {num === 8 ? num + '+' : num}
                </div>
            })
        }
        </div>
    }

    function getAmenitiesInputs() {
        return <div className="amenities-inputs">
            {amenities.map((amenity, index) => {
                if (!isListLong && index > 6) return
                return <div className="amenity" key={amenity}>
                    <input type="checkbox" onChange={() => handleChange('amenities', amenity)} />
                    <span>{amenity}</span>
                </div>
            })}
        </div>
    }

    return <section className="filter-modal">
        <header>
            <button className='x-btn' onClick={() => setIsFilterModalShown(false)}><svg viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                focusable="false">
                <path d="m6 6 20 20" /><path d="m26 6-20 20" /></svg>
            </button>
            <div className="txt">Filter</div>
        </header>
        <main>

        <div className="price-filter">
            <h2 className="title">Price range</h2>
            <p>{`The average nightly price is`}</p>
        </div>
        <div className="beds-and-rooms-filter">
            <h2>Rooms and beds</h2>
            <div className="bedrooms">
                <h3>Bedrooms</h3>
                {getRoomsInputs('bedrooms')}
            </div>
            <div className="beds">
                <h3>Beds</h3>
                {getRoomsInputs('beds')}
            </div>
            <div className="bathrooms" >
                <h3>Bathrooms</h3>
                {getRoomsInputs('bathrooms')}</div>
        </div>
        <div className="Amenities-filter">
            <h2>Essentials</h2>
            <div>
                {getAmenitiesInputs()}
                <button onClick={() => setIsListLong(prevState => !prevState)}>{isListLong ? 'Show less' : 'Show more'}</button>
            </div>
        </div>
        </main>
        <footer>
            <button onClick={() => handleChange('clean')}>Clear all</button>
            <Link to='/'>{`Show ${stays.length} homes`}</Link>
        </footer>
    </section>

}