import { func } from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useParams } from 'react-router-dom';
import { stayService } from '../services/stay.service.js'
import { orderService } from '../services/order.service.js'


import { TitleContant } from '../cmps/stays/titleContant.jsx'

import { Detailes } from '../cmps/stays/detailes.jsx'
import { Reviwes } from '../cmps/stays/reviwes.jsx'
import { Place } from '../cmps/stays/place.jsx'
import { HostedLeft } from '../cmps/stays/hosted-left.jsx'
import { HostedRight } from '../cmps/stays/hosted-right.jsx'
import { ToKnow } from '../cmps/stays/toKnow.jsx'
import { FirstFooter } from '../cmps/stays/firstFooter.jsx'
import { SecendFooter } from '../cmps/stays/secendFooter.jsx'
import { Galery } from '../cmps/stays/galery.jsx'
import { useSearchParams } from 'react-router-dom'


export function StayDetails() {

    const [searchParams] = useSearchParams();

    let { id } = useParams()

    const [capacityModal, setCapacityModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)
    const [stay, setStay] = useState(null)
    const [order, setOrder] = useState({})
    const [guests, setguests] = useState({})
    const [dates, setDates] = useState({ timeStart: 'Feb 4', timeEnd: 'Feb 9' })
    const [guestsNum, setGuestsNum] = useState(1 + 'guest')
    // const [rate, setRate] = useState(0)  


    // const stay = useSelector((state) => state.stayModule.stay)


    const [filterBy, setFilterBy] = useState({
        maxPrice: Infinity,
        type: '',
        maxCapacity: Infinity,
    })
    const params = new URLSearchParams(window.location.search)
    const entries = params.entries()

    const queryObject = Object.fromEntries(entries)


    useEffect(() => {
        loadStay(id)

    }, [])

    useEffect(() => {
        initOrder()
    }, [])

    useEffect(() => {
        onAddGuest(guests)
    }, [guests])

    useEffect(() => {
        onPickDates()
    }, [dates])


    async function loadStay(id) {
        try {
            const stay = await stayService.getById(id)
            setStay(stay)

        } catch (err) {
            console.log(err)
        }
    }


    function initOrder() {

        const newOrder = _emptyOrder()
        newOrder.status = "pending"
        newOrder.guests = { Adults: 1, Kids: 0, Infants: 0, Pets: 0 }
        setOrder(newOrder)
        setguests(newOrder.guests)
    }


    function onAddGuest() {
        const sum = numOfGuests()
        order.guests = guests
    }

    function onPickDates() {
        order['startDate'] = dates.startDate
        order['endDate'] = dates.endDate
    }
    function numOfGuests() {
        const gusts = guests
        const adultsNum = gusts.Adults + gusts.Kids
        let line = adultsNum + ' guest'
        if (gusts.Infants > 0) {
            line = line + ', ' + gusts.Infants + ' Infants '
        }
        if (gusts.Pets > 0) {
            line = line + ', ' + gusts.Pets + ' Pets '
        }
        setGuestsNum(line)
        return line
    }

    function _emptyOrder() {
        const order = orderService.getEmptyOrder()
        return order
    }


    function handleClick(ev) {
        const txt = 'eact-datepicker__day react-datepicker__day--react-datepicker__day--disabled'
        const target = ev.target.className
        console.log(target)

        const notOpenCapacity = ['title', 'guestsModal', 'guests bookingBtn', 'capacityLabel', 'chosingGuestsBtn', 'capacityLabel first', 'chosingGuests', '<empty string>']

        if (!notOpenCapacity.includes(ev.target.className, 0)) setCapacityModal(false)
        // if (!target.match(`react-datepicker`) && !target.match(`checkInBtn bookingBtn`) && !target.match('times')) setDateModal(false)
    }


    if (!stay) {
        return <div className="loader"></div>
    }
    return <section className='stays' onClick={handleClick} >

        <div className='detailesMain'>
            <TitleContant stay={stay} setCapacityModal={setCapacityModal} />
            <Galery stay={stay} setCapacityModal={setCapacityModal} />

            <Detailes dates={dates} setDates={setDates} stay={stay} order={order} guestsNum={guestsNum} setguests={setguests} guests={guests} capacityModal={capacityModal} setCapacityModal={setCapacityModal} setDateModal={setDateModal} dateModal={dateModal} />


            <Reviwes stay={stay} setCapacityModal={setCapacityModal} />
            {/* <FirstFooter setCapacityModal={setCapacityModal} /> */}
        </div>


    </section>
}