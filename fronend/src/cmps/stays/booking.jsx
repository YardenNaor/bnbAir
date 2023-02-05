import React, { useEffect, useState } from 'react'
// import {GuestsModal} from './guestsModal.jsx'
import { DateFilter } from '../date-filter.jsx'
import { CapacityBooking } from './capacityTemp.jsx'
import { Link } from 'react-router-dom'
import { stayService } from '../../services/stay.service'
import { useDispatch, useSelector } from 'react-redux'
import { uptadeFilter } from '../../store/stay.actions'



export function Booking({ dates, img, setDates, stay, guestsNum, guests, setguests, avgRate, setCapacityModal, capacityModal, dateModal, setDateModal, handleChange, order }) {

    const currFilterBy = useSelector((state) => state.stayModule.filterBy)
    const [filterBy, setFilterBy] = useState(currFilterBy)
    const [price, setPrice] = useState({})


    useEffect(() => {
        calcPrice()
    }, [])

    useEffect(() => {
        uptadeFilter(filterBy)
    }, [filterBy])

    function handleChange({ name: field, value }) {
        console.log('at handle change:', field, value)
        const timeStart = `${new Date(value.timeStampStart).toLocaleString('en', { month: 'short' })} ${new Date(value.timeStampStart).getDate()}`
        const timeEnd = `${new Date(value.timeStampEnd).toLocaleString('en', { month: 'short' })} ${new Date(value.timeStampEnd).getDate()}`
        setDates({ timeStart, timeEnd })
    }

    function setDateTxt(type) {
        let date = (type === 'in') ? currFilterBy.datesRange.startDate : currFilterBy.datesRange.endDate
        const txt = `${new Date(date).toLocaleString('en', { month: 'short' })} ${new Date(date).getDate()}`
        return txt
    }

    function addGuest(guest, diff) {

        const maxCapacity = stay.capacity
        const numOfGuests = guests.Adults + guests.Kids

        if (numOfGuests < maxCapacity) {
            guests[guest] += diff

            if (guests['Adults'] < 1) guests['Adults'] = 1
            if (guests['Kids'] < 0) guests['Kids'] = 0

        } else {
            if (diff === -1 && guest != 'Infants' && guest != 'Pets') {

                guests[guest] += diff
                if (guests['Adults'] < 1) guests['Adults'] = 1
                if (guests['Kids'] < 0) guests['Kids'] = 0
            }
        }

        if (guest === 'Infants') {
            guests[guest] += diff

            if (guests['Infants'] < 0) guests['Infants'] = 0
            if (guests['Infants'] > 5) guests['Infants'] = 5
        }
        if (guest === 'Pets') {
            guests[guest] += diff

            if (guests['Pets'] < 0) guests['Pets'] = 0
            if (guests['Pets'] > 5) guests['Pets'] = 5
        }
        const cuurNumOfGuests = guests.Adults + guests.Kids
        const newGuests = guests
        setguests({ ...guests, newGuests })
        // uptadeFilter({ ...filterBy, [field]: value })
        setFilterBy({ ...filterBy, ['capacity']: { ...filterBy.capacity, newGuests } })
    }



    function calcPrice() {
        const totalNightsPrice = stay.price * 5
        const servicefee = Math.floor((0.1 * stay.price * 5) * 10) / 10
        setPrice({ totalNightsPrice, servicefee, total: totalNightsPrice + servicefee })
    }


    const params = new URLSearchParams(window.location.search)
    const entries = params.entries()
    const queryObject = Object.fromEntries(entries)
    const currParams = stayService.getParams(currFilterBy)


    return <section className="booking" >


        <div className="bookingBox">
            <div className='topBookingBox'>
                <span className='price'><span className='currency'>&#x20aa;</span>{stay.price}<span className='night'> night</span></span>
                {
                    avgRate > 0 &&
                    <div className='rate'>
                        ★{avgRate}·<span className='reviewsBtn'>{stay.reviews.length} reviews</span>
                    </div>
                }
            </div>

            <div className="boxContantTop">

                <div className="checkInBtn bookingBtn" onClick={() => setDateModal(true)}>
                    <div className='times'><span>CHECK-IN</span><p>{dates.timeStart ? dates.timeStart : setDateTxt('in')}</p></div>
                    <div className='times'><span>CHECKOUT</span><p>{dates.timeEnd ? dates.timeEnd : setDateTxt('out')}</p></div>

                    {/* {dates.timeStart} |{dates.timeEnd} */}
                </div>

                <button className="guests bookingBtn" onClick={() => setCapacityModal(true)}><span>GUESTS</span><p>{guestsNum}</p></button>
            </div>
            {capacityModal && <CapacityBooking addGuest={addGuest} guests={guests} dates={dates} />}
            {dateModal && <div className='calender'>
                {/* <div className="full-screen show" onClick={() => setDateModal(false)} ></div> */}
                <DateFilter 
            
                handleChange={handleChange} isBooking={true} 
                setDateModal={setDateModal} /></div>}
            <Link to={`/stay/book/${stay.host._id}/${dates.timeStart}/${dates.timeEnd}/${guests.Adults}/${guests.Kids}/${guests.Infants}/${guests.Pets}/${price.total}/${stay._id}`} className="reservBtn">Reserve</Link>

            <div className='wontharged'>You won't be charged yet</div>

            <div className='sum'>
                <div className='billingCalc'>
                    <div className='calcDetail'>&#x20aa;{stay.price} x 5 nights</div>
                    <div className='calc'> &#x20aa;{price.totalNightsPrice} </div>
                </div>

                <div className='billingCalc'>
                    <div className='calcDetail'>Service fee</div>
                    <div className='calc'>&#x20aa;{price.servicefee} </div>
                </div>

            </div>


            <div className='total'>
                <div className='calcDetail'>Total</div>
                <div className='calc'>&#x20aa;{price.total} </div>
            </div>


        </div>

    </section>
}