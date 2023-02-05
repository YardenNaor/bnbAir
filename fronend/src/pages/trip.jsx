import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userService } from '../services/user.service'

import { StayManagement } from "../pages/stay-management"
import { orderService } from '../services/order.service'
import { ChartBuyer } from '../cmps/chart-buyer'
import { stayService } from '../services/stay.service'

export function Trip() {

    const loggedinUser = useSelector((state) => state.userModule.user)
    const [myOrders, setMyOrders] = useState(null)
    const [numStatusPending, setNumStatusPending] = useState(null)
    const [numStatusApproved, setNumStatusApproved] = useState(null)
    const [numStatusDeclined, setNumStatusDeclined] = useState(null)
    const [isImagesLoaded, setIsImagesLoaded] = useState(false)


    const [stayId, setStayId] = useState([])
    const [locationStay, setLocationStay] = useState([])
    const [locationCity, setLocationCity] = useState([])
    const [locationCountry, setLocationCountry] = useState([])

    useEffect(() => {
        if (!loggedinUser) return
        const userId = loggedinUser._id
        getMyOrders()

    }, [])

    useEffect(() => {
        console.log(numStatusApproved)
        console.log(numStatusDeclined)
        console.log(numStatusPending)
    }, [numStatusApproved, numStatusDeclined, numStatusPending, myOrders])

    // console.log('hi'!)
    async function loadStayImages(data) {
        console.log(data)
        const arrStays = []
        const staysLocations = []
        const staysLocatCity = []
        const staysLocatCountry = []
        try {
            for (const item in data) {
                console.log(item)
                const stayId = data[item].stay._id
                // console.log(stayId)
                const stayById = await stayService.getById(stayId)
                console.log(stayById)
                const location = `${stayById.loc.city}, ${stayById.loc.country}`
                const locCity = `${stayById.loc.city} ,`
                const locCountry = `${stayById.loc.country}`
                arrStays.push(stayById.imgUrls[0])

                staysLocatCity.push(locCity)
                staysLocatCountry.push(locCountry)
                // staysLocations.push
                // console.log(stays.imgUrls[0])
            }
            setStayId(arrStays)
            // setLocationStay(staysLocations)
            setLocationCity(staysLocatCity)
            setLocationCountry(staysLocatCountry)

            setIsImagesLoaded(true)


        } catch (err) {
            console.log('err', err)
        }
        console.log(data)
    }

    function numStatusOrder(orders) {
        const objStatus = {
            'pending': 0,
            'declined': 0,
            'approved': 0
        }

        for (const status in objStatus) {
            const res = orders.filter(order => order.status === status)
            objStatus[status] = res.length
        }
        return objStatus
    }

    async function getMyOrders() {
        try {
            const orders = await orderService.query({ buyerId: loggedinUser._id })
            setMyOrders(orders)

            const objStatus = numStatusOrder(orders)
            setNumStatusPending(objStatus.pending)
            setNumStatusApproved(objStatus.approved)
            setNumStatusDeclined(objStatus.declined)

            console.log(objStatus)
            loadStayImages(orders)

        } catch (err) {
            console.log(err)
        }
    }

    return <div>
        {!isImagesLoaded && <div class="loader"></div>}
        {!myOrders && <div>&nbsp;</div>}
        {myOrders && <section className="trip-containter" >
            <div className="trip-header">
                Reservations
            </div>
            <div className="trip-data">
                {/* <Table data={myOrders} /> */}

                <div>

                    {isImagesLoaded &&
                        <div>

                            <div className='trip-table'>
                                <div className="trip-headers">
                                    <div className="trip-header">
                                        Guests
                                    </div>
                                    <div className="trip-header">
                                        Check-In
                                    </div>
                                    <div className="trip-header">
                                        Check-Out
                                    </div>
                                    <div className="trip-header">
                                        Booked
                                    </div>
                                    <div className="trip-header">
                                        Location
                                    </div>
                                    <div className="trip-header">
                                        Payment
                                    </div>
                                    <div className="trip-header">
                                        Status
                                    </div>
                                </div>
                            </div>
                            <div className='data-body'>
                                {myOrders.map((row, index) => {
                                    { console.log(row.status) }
                                    return (
                                        <div className='trip-body-containter'>
                                            <div className="trip-body image">{<img className='trip-image' src={`${stayId[index]}`}></img>}
                                            </div>
                                            <div className="trip-body">
                                                {row.startDate}
                                            </div>
                                            <div className="trip-body">
                                                {row.endDate}
                                            </div>
                                            <div className="trip-body">
                                                {row.startDate}
                                            </div>
                                            <div className="trip-body">
                                                {locationCity[index]}
                                                <br></br>
                                                {locationCountry[index]}
                                            </div>
                                            <div className="trip-body">
                                                {row.totalPrice}<span> &#8362;</span>
                                            </div>
                                            <div className={`trip-body ${row.status}`}>
                                                {row.status}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* <table className="trip-table">
                                <thead className="trip-thead">
                                    <tr className="trip-tr">
                                        <th key={10} className="trip-td">Stay</th>
                                        {/* <th key={11} className="trip-td">Guests</th> */}
                            {/* <th key={12} className="trip-td">Check-In</th>
                            <th key={13} className="trip-td">Check-Out</th>
                            <th key={14} className="trip-td">Booked</th>
                            <th key={15} className="trip-td">Location</th>
                            <th key={16} className="trip-td">Total-Payout</th>
                            <th key={17} className="trip-td">Status</th>
                        </tr>
                                </thead> */}
                            {/* <tbody>
                                {myOrders.map((row, index) => {
                                    return (
                                        <tr key={index} className="trip-tr-body">
                                            <td className="trip-td-body image">{<img className='trip-image' src={`${stayId[index]}`}></img>}</td>
                                            {/* <td className="trip-td-body">{row.guests.adults}</td> */}
                            {/* <td className="trip-td-body">{row.startDate}</td>
                                            <td className="trip-td-body">{row.endDate}</td>
                                            <td className="trip-td-body">{row.startDate}</td>
                                            <td className="trip-td-body">{locationStay[index]}</td>
                                            <td className="trip-td-body price">{row.totalPrice}<span> &#8362;</span></td>
                                            <td className={`trip-td-body ${row.status}`}>{row.status}</td>
                                        </tr>) */}
                            {/* // })}
                            </tbody>
                        </table> * /} */}
                            {/* <ChartBuyer numStatusPending={numStatusPending} numStatusApproved={numStatusApproved} numStatusDeclined={numStatusDeclined} /> */}
                        </div>
                    }
                </div>
            </div >
        </section >
        }
    </div >
}


