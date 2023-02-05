import { stayService } from '../services/stay.service.js'
import { orderService } from '../services/order.service'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function StayMenegment() {
    const loggedinUser = useSelector((state) => state.userModule.user)

    const [stays, setStays] = useState([])
    const [orders, setorders] = useState([])

    useEffect(() => {
        loadStay()
        loadOrders()
    }, [])

    async function loadOrders() {
        try {
            const orders = await orderService.query()
            const myOrders = orders.filter(order => order.hostId === loggedinUser._id)
            setorders(myOrders)
        } catch (err) {
            console.log(err)
        }
    }

    async function loadStay() {
        try {
            const stays = await stayService.getAllStays()
            const ownerStays = stays.filter(stay => stay.host._id === loggedinUser._id)
            setStays(ownerStays)
        } catch (err) {
            console.log(err)
        }
    }
    // console.log(orders)

    if (!stays) return <div class="loader"></div>

    return <section className="stayMenegment">

        <div className='menegmentMnue'>
            <div className='buttons'>
                <button className='showOrders'>orders</button>
                <button className='showStaye'>my stays</button>
            </div>
        </div>

        <div className='menegmentContant'>
            <div className='contantTitle'>
                hello {loggedinUser.fullname}! you have 0
            </div>
            <div className='menegmentTable'>
                {
                    orders.map(order => {
                        console.log(order)
                        return order.buyer
                        
                    })
                }
        </div>
    </div>
    </section >
}

{/* <div className='order' >
    <div className='gusName'>{order.buyer}</div> */}