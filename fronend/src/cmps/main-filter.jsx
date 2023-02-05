
import React, { useRef, useEffect, useState } from 'react'
import { LocationFilter } from './location-filter'
import { DateFilter } from './date-filter'
import { CapacityFilter } from './capacity-filter'
import { LocationList } from './location-list'
import { uptadeFilter } from '../store/stay.actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';



export function MainFilter({ filterType, isFilterShown, setIsFilterShown, setDateTxt, onFocus }) {
    // const elBtn = useRef();
    const currFilterBy = useSelector((state) => state.stayModule.filterBy)

    const [currFilterType, setFilterType] = useState(filterType)
    const [filterBy, setFilterBy] = useState(currFilterBy)
    const [IsFocused, setIsFocused] = useState(false)


    useEffect(() => {
        uptadeFilter(filterBy)
    }, [filterBy])

    useEffect(() => {
        showFilter(filterType)
    }, [])

    function handleChange({ name: field, value }) {
        console.log('at handle change:', value)
        setFilterBy({ ...filterBy, [field]: value })
    }

    function onSaveFilter(ev) {
        ev.preventDefault()
        setIsFilterShown(false)
    }

    function showFilter(type, ev) {
        console.log('type at show filter', type)
        switch (type) {
            case 'date':
                return <DateFilter
                    handleChange={handleChange}
                    filterBy={filterBy} />
            case 'capacity':
                return <CapacityFilter
                    handleChange={handleChange}
                    filterBy={filterBy} />
            case 'list':
                if (ev) ev.stopPropagation()
                return <LocationList
                    handleChange={handleChange}
                    filterBy={filterBy} />
            default:
                return <LocationFilter
                    handleChange={handleChange}
                    filterBy={filterBy} />
        }
    }

    function setGuestsCountTxt() {
        const { adults, kids, infants, pets, total } = currFilterBy.capacity
        console.log('currFilterBy:', currFilterBy.capacity)
        if (!total) return 'Add guests'
        const adultsNum = adults + kids
        let txt = adultsNum > 1 ? adultsNum + ' guests' : adultsNum + ' guest'
        if (infants) {
            txt = txt + ', ' + infants + '...'
        }

        return txt
    }

    const { region, txt, datesRange } = currFilterBy
    const { timeStampStart, timeStampEnd } = datesRange

    let params = new URLSearchParams(window.location.search);
    let entries = params.entries();

    console.log('Object.fromEntries(entries);:', Object.fromEntries(entries))

    return (
        <section className={`filter-layout  ${(isFilterShown) ? 'open' : 'close'}`}>
            <div className='filter-container-big'>
                <div className='location-inputs'  >

                    <button className='loaction-btn' onClick={(ev) => {
                        setFilterType('location')
                        onFocus(ev.currentTarget)
                    }}>
                        <div className='title'>where</div>
                        <input type="text" name="txt" value={txt}
                            placeholder={((!txt && !region) || (region === 'flexible')) ? 'Search destination' : region}
                            onChange={(ev) => {
                                handleChange(ev.target)
                                showFilter('list', ev)
                            }} />
                    </button>
                </div><span className='line'></span>
                <button className='checkIn-btn' onClick={(ev) => {
                    setFilterType('date')
                    onFocus(ev.currentTarget)
                }}>
                    <div className='btn-txt'><div className='title' >Check in</div>
                        <div className='desc'>{timeStampStart ? setDateTxt('in') : 'Add dates'}</div>
                    </div>
                </button><span className='line'></span>
                <button className='checkOut-btn' onClick={(ev) => {
                    setFilterType('date')
                    onFocus(ev.currentTarget)
                }}>
                    <div className='btn-txt'><div className='title'>Check out</div>
                        <div className='desc'>{timeStampEnd ? setDateTxt('out') : 'Add dates'}</div>
                    </div>
                </button><span className='line'></span>
                <div className='last-input' onClick={(ev) => onFocus(ev.currentTarget)} >
                    <button className='who-btn' onClick={() => setFilterType('capacity')}>
                        <div className='btn-txt'>
                            <div className='title'>Who</div>
                            <div className='desc'>{setGuestsCountTxt()}</div>
                        </div>
                    </button>
                    <form onSubmit={onSaveFilter}>
                        <button className="search-btn" >
                            <svg className='svg-white'
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" role="presentation"
                                focusable="false" >
                                <g fill="none">
                                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                                </g>
                            </svg>
                            <span> Search</span>
                        </button>
                    </form>
                </div>
                {showFilter(currFilterType)}
            </div>
        </section>
    )
}

