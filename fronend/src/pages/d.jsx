import { stayService } from '../services/stay.service.js'
import { orderService } from '../services/order.service'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, loadOrder, addOrder, updateOrder, removeOrder } from '../store/order.action'

export function StayManagement() {
    const loggedinUser = useSelector((state) => state.userModule.user)

    const [stays, setStays] = useState([])
    const [myOrders, setMyOrders] = useState([])
    const [pendingNum, setPendingNum] = useState(0)


    useEffect(() => {
        loadStay()
        getMyOrders()
    }, [])

    useEffect(() => {
        numOfPending()
    }, [myOrders])

    async function getMyOrders() {
        try {
            const orders = await orderService.getOrdersByUserId(loggedinUser._id)
            setMyOrders(orders)
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
    function numOfPending() {
        const pendingOrders = myOrders.filter(order => order.status === 'pending')
        setPendingNum(pendingOrders.length)
    }

    async function changeStatus(event, orderId, status) {
        event.preventDefault()
        const orderToUp = await loadOrder(orderId)
        orderToUp.status = status
        updateOrder(orderToUp)
        getMyOrders()
        // setOrderStatus('reject')
    }

    if (!stays) return <section>Add a home</section>

    return <section className="stayMenegment">

        <div className='menegmentMnue'>
            asd
            <div className='buttons'>
                <button className='showOrders'>orders</button>
                <button className='showStaye'>my stays</button>
            </div>
        </div>

        <div className='menegmentContant'>
            <div className='contantTitle'>
                hello {loggedinUser.fullname}! you have {pendingNum} orders
            </div>
            <div className='tableHead'>
                <div className='cell guest'>guest</div>
                <div className='cell stay'>stay</div>
                <div className='cell dates'>dates</div>
                <div className='cell price'>Price</div>
                <div className='cell status'>Status</div>
                <div className='cell actions'>Actions</div>


            </div>

            <div className='menegmentTable'>
                {
                    myOrders.map(order => {
                        if (order.status === 'pending') {
                            return <section className='tableRow cell pending' key={order._id}>
                                <div className='cell guest'>guest</div>
                                <div className='cell stay'>stay</div>
                                <div className='cell dates'>dates</div>

                                <div className='cell price'>Price</div>
                                <div className={`cell status ${order.status}`}>{order.status}</div>
                                <div className='cell actions'>
                                    <button className='approveBtn' onClick={(event) => changeStatus(event, order._id, 'approve')}>approve</button>
                                    <button className='rejectBtn' onClick={(event) => changeStatus(event, order._id, 'reject')}>reject</button>

                                </div>
                            </section>
                        } else {
                            return <section className='tableRow cell' key={order._id}>
                                <div className='cell guest'>guest</div>
                                <div className='cell stay'>stay</div>
                                <div className='cell dates'>dates</div>

                                <div className='cell price'>Price</div>
                                <div className={`cell status ${order.status}`}>{order.status}</div>
                                <div className='cell actions'>
                                    <button className='approveBtn disable' disabled='true' onClick={(event) => changeStatus(event, order._id, 'approve')}>approve</button>
                                    <button className='rejectBtn disable' disabled='true' onClick={(event) => changeStatus(event, order._id, 'reject')}>reject</button>

                                </div>
                            </section>
                        }


                    })
                }
            </div>
        </div>
    </section >
}

{/* <div className='order' >
    <div className='gusName'>{order.buyer}</div> */}