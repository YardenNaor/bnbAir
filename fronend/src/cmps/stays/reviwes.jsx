import React, { useEffect, useState } from 'react'
import { utilService } from '../../services/util.service.js'
import {ReviewsMsg} from './reviewsMsg.jsx'

export function Reviwes({ stay ,setCapacityModal}) {

    const [avgRate, setAvgRate] = useState(0)
    const [numReviews, setNumReviews] = useState(0)

    useEffect(() => {
        calcRate()
        calcaAvgRate()
        a()

    }, [])

    const reviewsRate = stay['statReviews']
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

    function calcaAvgRate() {
        const avg = (rates.Cleanliness + rates.Communication + rates.CheckIn + rates.Accuracy + rates.Location + rates.Location) / 6
        setAvgRate(Math.floor(avg * 10) / 10)
    }


    function a() {
        if (stay.reviews.length > 1) {
            setNumReviews(stay.reviews.length + ' reviews')
        } else {
            setNumReviews(stay.reviews.length + ' review')
        }
    }

    if (stay.reviews) {
        return <section className="reviwes" onClick={() => setCapacityModal(false)}>
            <div className="reviewTitle"> ★ {avgRate} · {numReviews}</div>
            <div className="reviwesRate">
                <div className='reviwesTable'>

                    <div className="cleanliness scaleRate">
                        <div className="rateTitle">Cleanliness</div>
                        <div className='prograsDiv'>
                            <progress className='prograsBar' value={reviewsRate.Cleanliness} max="5"></progress>
                            <div className='rateNum'>{reviewsRate.Cleanliness}</div>
                        </div>
                    </div>

                    <div className="cleanliness scaleRate">
                        <div className="rateTitle">Accuracy</div>
                        <div className='prograsDiv'>
                            <progress className='prograsBar' value={reviewsRate.Accuracy} max="5"></progress>
                            <div className='rateNum'>{reviewsRate.Accuracy}</div>
                        </div>
                    </div>

                    <div className="communication scaleRate">
                        <div className="rateTitle">Communication</div>
                        <div className='prograsDiv'>
                            <progress className='prograsBar' value={reviewsRate.Communication} max="5"></progress>
                            <div className='rateNum'>{reviewsRate.Communication}</div>
                        </div>
                    </div>

                    <div className="location scaleRate">
                        <div className="rateTitle">Location</div>
                        <div className='prograsDiv'>
                            <progress className='prograsBar' value={reviewsRate.Location} max="5"></progress>
                            <div className='rateNum'>{reviewsRate.Location}</div>
                        </div>
                    </div>

                    <div className="checkIn scaleRate">
                        <div className="rateTitle">Check-in</div>
                        <div className='prograsDiv'>
                            <progress className='prograsBar' value={reviewsRate.CheckIn} max="5"></progress>
                            <div className='rateNum'>{reviewsRate.CheckIn}</div>
                        </div>
                    </div>

                    <div className="value scaleRate">
                        <div className="rateTitle">Value</div>
                        <div className='prograsDiv'>
                            <progress className='prograsBar' value={reviewsRate.Value} max="5"></progress>
                            <div className='rateNum'>{reviewsRate.Value}</div>
                        </div>
                    </div>
                </div>

                <ReviewsMsg stay={stay}/>



            </div>

        </section>
    } else {
        return <section className="reviwesEmpty" onClick={() => setCapacityModal(false)}>
            <div className="">No reviews (yet)</div>
            <div className="">This host has 15 reviews for other places to stay. Show other reviews</div>
        </section>
    }

}