import { stayService } from '../services/stay.service.js'
import { orderService } from '../services/order.service'
import { SetIsUserModalShown } from '../store/stay.actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, loadOrder, addOrder, updateOrder, removeOrder } from '../store/order.action'
import { OrderShow } from '../cmps/stayMnegmant/orders'
import { StaysShow } from '../cmps/stayMnegmant/stays'



export function StayManagement() {
    const loggedinUser = useSelector((state) => state.userModule.user)
    // const isUserModalShown = useSelector((state) => state.stayModule.isUserModalShown)

    const [myStays, setMyStays] = useState([])
    const [myOrders, setMyOrders] = useState([])
    const [pendingNum, setPendingNum] = useState(0)
    const [info, setInfo] = useState('orders')


    useEffect(() => {
        loadOrders()
        getMyStays()
        getMyOrders()
    }, [])


    useEffect(() => {
        numOfPending()
    }, [myOrders])

    async function getMyOrders() {
        try {
            const orders = await orderService.query({ hostId: loggedinUser._id })
            setMyOrders(orders)
        } catch (err) {
            console.log(err)
        }
    }

    async function getMyStays() {
        try {
            const stays = await stayService.getStaysByUserId(loggedinUser._id)
            setMyStays(stays)
        } catch (err) {
            console.log(err)
        }
    }

    function numOfPending() {
        const pendingOrders = myOrders.filter(order => order.status === 'Pending')
        setPendingNum(pendingOrders.length)
    }

    async function changStatus(orderId, status) {
        console.log('orderId at changStatus:',orderId)
        try {
            const orderToUp = await loadOrder(orderId)
            console.log('orderToUp at changStatus', orderToUp)
            orderToUp.status = status
            updateOrder(orderToUp)
            getMyOrders()
        } catch (err) {
            console.log('failed to load order:')
        }
    }

    // console.log('isUserModalShown:',isUserModalShown)

    if (!myStays) return <section>Add a home</section>
    return <section className="stayMenegment">
        {info === 'orders' && < OrderShow loggedinUser={loggedinUser} pendingNum={pendingNum} myOrders={myOrders} changStatus={changStatus} />}
        {info === 'stays' && < StaysShow loggedinUser={loggedinUser} myStays={myStays} myOrders={myOrders} changStatus={changStatus} />}


    </section>
}

{/* <div className='order' >
    <div className='gusName'>{order.buyer}</div> */}