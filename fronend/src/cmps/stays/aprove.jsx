import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { orderService } from '../../services/order.service'


export function Aprove({ order }) {
    const navigate = useNavigate();


    useEffect(() => {
        setTimeout(backToHome, 2000)
    }, [])


    function backToHome() {
        saveOrder()
        navigate(`/`)

    }

    function saveOrder() {
        console.log('order in saveOrder:',order)
        orderService.save(order)
    }
    return <section className="aprove">
        <div className="aproveContant">
            <div className='Congrat'>Congratulations! </div>
            <p className="title">Your bnbAir reservation has been received and is now pending approval from the host. </p>
            <p className="title ">You will receive a notification once the host confirms or declines the booking. Thank you for choosing Airbnb for your stay!</p>

            <div className="therdTitle">You will return to home page automatically</div>
        </div>
    </section>
}