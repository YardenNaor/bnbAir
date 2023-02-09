import { Booking } from './booking.jsx'
import { StayDetailesContent } from './stay-detailes-content.jsx'

import React, { useEffect, useState } from 'react'
import { utilService } from '../../services/util.service.js'

export function Detailes({ dates, setDates, stay, order, guestsNum, setguests, guests, capacityModal, setCapacityModal, dateModal, setDateModal }) {

    const rate = calcRate()
    const img = randImg()

    function handleChange({ name: field, value }) {
        console.log('at handle change:', value)
        // setFilterBy({ ...filterBy, [field]: value })
    }

    function calcRate() {
        let sumRates = 0
        const numOfreviews = stay['reviews'].length
        stay['reviews'].forEach(review => {
            sumRates += review.rate
        })

        const rate = sumRates / numOfreviews
        return Math.floor(rate * 10) / 10;
    }

    const rates = stay['statReviews']
    let avgRate = calcaAvgRate()

    function calcaAvgRate() {

        const avg = utilService.getRandomIntInclusive(40, 50) / 10
        //  (rates.Cleanliness + rates.Communication + rates.CheckIn + rates.Accuracy + rates.Location + rates.Location) / 6
        return Math.floor(avg * 10) / 10
    }

    function randImg() {

        const randNum = getRandomInt(1)
        let gender = (randNum > 0.6) ? 'male' : 'female'

        return `https://xsgames.co/randomusers/avatar.php?g=${gender}`

    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // "Cleanliness": 0,
    //     "Communication": 0,
    //     "CheckIn": 0,
    //     "Accuracy": 0,
    //     "Location": 0,
    //     "Value": 0

    return <section className="detailes">
        <div className='detailes-container'>
            <StayDetailesContent stay={stay} img={img} rate={rate} avgRate={avgRate} setCapacityModal={setCapacityModal} />
            <Booking dates={dates} img={img} setDates={setDates} stay={stay} order={order} guestsNum={guestsNum} setguests={setguests} guests={guests} rate={rate} avgRate={avgRate} capacityModal={capacityModal} setCapacityModal={setCapacityModal} dateModal={dateModal} setDateModal={setDateModal} handleChange={handleChange} />
        </div>


    </section>
}