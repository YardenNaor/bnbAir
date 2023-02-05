import { Link } from 'react-router-dom'
import { Routes, Route, useParams } from 'react-router-dom';
import { orderService } from '../services/order.service.js'
import { useNavigate } from 'react-router-dom'
import confirmed from '../assets/img/confirmed.svg'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../services/stay.service.js'
import { Aprove } from '../cmps/stays/aprove'

export function Book() {

    const loggedinUser = useSelector((state) => state.userModule.user)
    const stays = useSelector((state) => state.stayModule.stays)

    // const params = new URLSearchParams(window.location.search)
    // const entries = params.entries()

    // const queryObject = Object.fromEntries(entries)

    let { hostId, timeStart, timeEnd, Adulst, kids, Infants, Pets, totalPrice, stay } = useParams()

    const [guests, setguests] = useState([])
    const [order, setOrder] = useState({})
    const [currStay, setCurrStay] = useState('')
    const [modal, setmodal] = useState(false)


    useEffect(() => {
        getNumOfGuests(Adulst, kids, Infants, Pets)
        getNewOrder(hostId, totalPrice, timeStart, timeEnd, Adulst, kids, Infants, Pets, stay)

    }, [])


    async function getNewOrder(HostId, price, timeStart, timeEnd, Adulst, kids, Infants, Pets, stay) {
        console.log('stay at getNewOrder', stay)
        const stayName = await stayService.getById(stay)
        console.log('stayName at ger nae order:', stayName.name)
        const newOrder = emptyOrder()
        newOrder.hostId = HostId
        console.log('loggedinUser at getNewOrder:',loggedinUser)
        if (loggedinUser) newOrder.buyer = { "_id": loggedinUser._id, "fullname": loggedinUser.fullname }
        console.log('newOrder.buyer:',newOrder.buyer)
        newOrder.totalPrice = price
        newOrder.startDate = timeStart
        newOrder.endDate = timeEnd
        newOrder.guests = { Adulst, kids, Infants, Pets }
        newOrder.stay = { _id: stay, name: stayName.name }
        console.log('stay ar getneworder:', stay)
        // order.msgs = []
        newOrder.status = 'Pending'
        // console.log('new oreder:', newOrder.stay)
        setOrder(newOrder)
        loadStay(newOrder)
    }
    // console.log(order.stay)

    async function loadStay(order) {
        // console.log('order.stay at loadStay:', order.stay)
        try {
            const stay = await stayService.getById(order.stay._id)
            setCurrStay(stay)
        } catch (err) {
            console.log(err)
        }
    }


    function getNumOfGuests(Adulst, kids, Infants, Pets) {
        Adulst = Number(Adulst)
        kids = Number(kids)
        Infants = Number(Infants)
        Pets = Number(Pets)

        const adultsNum = Adulst + kids
        let line = adultsNum + ' guests' 
        if (Infants > 0) {
            line = line + ', ' + Infants + ' Infants '
        }
        if (Pets > 0) {
            line = line + ', ' + Pets + ' Pets '
        }

        setguests(line)
    }

    function emptyOrder() {
        const order = orderService.getEmptyOrder()
        return order
    }

    function randImg() {

        const randNum = getRandomInt(1)
        let gender = (randNum > 0.6) ? 'male' : 'female'

        return `https://xsgames.co/randomusers/avatar.php?g=${gender}`

    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


// console.log('order befor redering at book :',order )
    const img = randImg()
    if (!order || !currStay) return 'lodding...'
    return (
        <section className='book'>
            <div className='RequestTitle'>
                <div className='RequestTitleContant'>
                    {/* <div className='backto'>←</div> */}
                    <div className='RequestTitleContantTitle'>Request to book</div>
                </div>
            </div>
            <div className='mainBook'>
                <div className='pay'>
                    <div className='YourTrip'>Your trip</div>

                    <div className='YourTripData'>
                        <div className='detail'>
                            <div className='firsDetail'>Dates</div>
                            <div className='secendDetail'>{order.startDate} - {order.endDate}</div>
                        </div>
                        <button className='edit'>Edit</button>
                    </div>

                    <div className='YourTripData'>
                        <div className='detail'>
                            <div className='firsDetail'>Guests</div>
                            <div className='secendDetail'>{guests}</div>
                        </div>
                        <button className='edit'>Edit</button>
                    </div>

                    <div className='required'>
                        <div className='requiredContant'>

                            <div className='requiredTitle'>Required for your trip</div>
                            <div className='break'></div>
                            <div className='message'>Message the Host</div>
                            <div className='messageExp'>Let the Host know why you're traveling and when you'll check in.</div>
                            <div className='host'>
                                <div className='hostDetContant'>
                                    <img className="hostImg" src={`${img}`} />
                                    <div className='hostDet'>
                                        <div className='hostName'>{currStay.host.fullname}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='msgDiv'>
                                <textarea className='textarea'></textarea>
                            </div>
                        </div>

                        <div className='confirmed'>
                            <div className='confirmedContant'>
                                <img className="confirmedImg" src={confirmed} />
                                <div className='confirmedTxt'>
                                    <div className='confirmedFirst'>Your reservation won't be confirmed until the Host accepts your request (within 24 hours).</div>
                                    <div className='confirmedSecend'>You won't be charged until then.</div>

                                </div>
                            </div>
                            {
                                <div className='requestContainer'>
                                    <button className='request' onClick={() => setmodal(true)}>Request to book</button>
                                </div>
                                // : <LoginSignup isLoginModalShown={isLoginModalShown} setIsLoginModalShown={setIsLoginModalShown} />
                            }
                        </div>
                    </div>
                </div>


                <div className='details'>
                    <div className='detailsBox'>
                        <div className='detailsBoxContant'>

                            <div className='boxTitle'>
                                <div className='boxTitleContant'>
                                    <img className='titleImg' src={currStay['imgUrls'][0]}></img>
                                    <div className='titles'>
                                        <div className='firstTitle'>{currStay.stayType}</div>
                                        <div className='secendTitle'>{currStay.name}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='protected'>
                                <div className='protectedContant'>Your booking is protected by AirCover</div>
                            </div>

                            <div className='priceTitleContainer'>
                                <div className='priceTitleContant'>Price details</div>
                            </div>

                            <div className='priceDet'>
                                <div className='priceDetContainer'>
                                    <div className='calc'>{currStay.price}₪ x 5 nights</div>
                                    <div className='resolve'>{currStay.price * 5}₪</div>
                                </div>
                                <div className='priceDetContainer secend'>
                                    <div className='calc'>serviceFee</div>
                                    <div className='resolve'>{(currStay.price * 5) * 0.1}₪</div>
                                </div>
                                <hr className='breakLine'></hr>
                                <div className='priceDetContainer'>
                                    <div className='totalTitle'>Total (ILS)</div>
                                    <div className='totalFee'>{currStay.price * 5 + (currStay.price * 5) * 0.1}₪</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* <div className='bookFooter'>dsf</div> */}

            {modal && <Aprove order={order} />}

        </section>
    )

}
