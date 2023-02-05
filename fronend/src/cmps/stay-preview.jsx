import { useState, useRef, createRef, useEffect } from "react"

import React from 'react';
import { utilService } from "../services/util.service"

export function StayPreview({ stay, addStayIdToWishList, userWishList }) {
// console.log('stay at preview:',stay )
    const [wishListModal, SetwishListModal] = useState(false)
    const [avgRate, setAvgRate] = useState(0)
    const [currentIdx, setCurrentIdx] = useState(0)

    const [randDistanceKm, setRandDistanceKm] = useState(null)
    const [randDate, setRandDate] = useState(null)

    useEffect(()=>{
        setRandDistanceKm(getRandomKm())
        setRandDate(getRandomDate())
    }, [])

    const [isColoredRed, setIsColoredRed] = useState(false)
    let slides = [];

    useEffect(() => {

        calcaAvgRate()

        if (!userWishList.length) return
        const isInWishList = userWishList.find(element => element === stay._id)

    }, [userWishList])

    getSlides()
    function getSlides() {
        stay.imgUrls.map(item => {
            slides.push({ url: item })
        })
        if (slides.length > 5)
            slides.splice(0, 5)
    }

    const myRef = useRef(new Array());
    const refLeftArraw = useRef(null)
    const refRightArraw = useRef(null)
    const refWishList = useRef(false)

    myRef.current = slides.map((element, i) => myRef.current[i] ?? createRef())

    useEffect(() => {
        // first time entring the home page
        const element = myRef.current;
        element[0].current.style.backgroundColor = '#fff'
        element[0].current.style.opacity = 1

        refLeftArraw.current.style.opacity = 0
        refLeftArraw.current.style.cursor = 'auto'
        refLeftArraw.current.style.pointerEvents = 'none';
    }, [])

    function goToPrevious(ev) {
        ev.stopPropagation()

        const isFirstSlide = currentIdx === 0
        const newIndex = isFirstSlide ? 0 : currentIdx - 1

        if (newIndex === 0) {
            refLeftArraw.current.style.opacity = 0
            refLeftArraw.current.style.cursor = 'auto'
            refLeftArraw.current.style.pointerEvents = 'none';
        } else {
            refRightArraw.current.style.opacity = 1
            refRightArraw.current.style.cursor = 'pointer'
            refRightArraw.current.style.pointerEvents = 'auto';
        }

        setCurrentIdx(newIndex)

        //changing colors of dots
        changeDotToOriginalClr(currentIdx)
        changeDotColorToChoosen(newIndex)
    }

    function goToNext(ev) {
        ev.stopPropagation()

        const isLastSlide = currentIdx === slides.length - 1
        const newIndex = isLastSlide ? slides.length - 1 : currentIdx + 1;

        if (newIndex === slides.length - 1) {
            refRightArraw.current.style.opacity = 0
            refRightArraw.current.style.cursor = 'auto'
            refRightArraw.current.style.pointerEvents = 'none';
        } else {
            refLeftArraw.current.style.opacity = 1
            refLeftArraw.current.style.cursor = 'pointer'
            refLeftArraw.current.style.pointerEvents = 'auto';
        }

        setCurrentIdx(newIndex)

        //changing colors of dots
        changeDotToOriginalClr(currentIdx)
        changeDotColorToChoosen(newIndex)
    }

    function changeDotToOriginalClr(currentIdx) {
        const element = myRef.current;
        element[currentIdx].current.style.backgroundColor = '#fff'
        element[currentIdx].current.style.opacity = 0.6

    }

    function changeDotColorToChoosen(newIndex) {
        const element = myRef.current;
        element[newIndex].current.style.backgroundColor = '#fff'
        element[newIndex].current.style.opacity = 1
    }

    function onAddToWishList(ev) {
        if (!isColoredRed) {
            refWishList.current.style.fill = '#FF385C'
            setIsColoredRed(true)
        }else{
            refWishList.current.style.fill = 'rgba(0, 0, 0, 0.5)'
            setIsColoredRed(false)
        }

        addStayIdToWishList(stay._id)
        SetwishListModal(true)

    }
    const rates = stay['statReviews']

    function calcaAvgRate() {
        const avg = (rates.Cleanliness + rates.Communication + rates.CheckIn + rates.Accuracy + rates.Location + rates.Location) / 6
        setAvgRate(Math.floor(avg * 10) / 10)
    }


    function getRandomDate() {
        const months = ['Feb', 'Mar', 'Apr']

        const randDayStart = utilService.getRandomIntInclusive(1, 25)
        const randDaysOfVaction = utilService.getRandomIntInclusive(2, 6)
        const randIdxForMonth = utilService.getRandomIntInclusive(0, 2)

        const randDayEnd = randDayStart + randDaysOfVaction
        const randMonth = months[randIdxForMonth]
        const newRandDate = `${randMonth} ${randDayStart}-${randDayEnd}`
        return newRandDate
    }

    function getRandomKm() {
        const randKmDistance = utilService.getRandomIntInclusive(30, 450)
        return randKmDistance
    }

    return <article className="stay-preview">
        <div className="image-containter">
            <div className="square">
                <div className="flex-containter" style={{ backgroundImage: `url(${slides[currentIdx].url})` }}>
                    <div className="div-wish-list">
                        <button>
                            <svg ref={refWishList} onClick={(ev) => { ev.stopPropagation(); onAddToWishList(ev) }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation">
                                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
                            </svg>
                        </button>
                    </div>

                    <div className="div-arraws">

                        <div className="arraw leftArraw" ref={refLeftArraw} onClick={(ev) => goToPrevious(ev)}>
                            <div className="position-arraw">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                                    <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="arraw rightArraw" ref={refRightArraw} onClick={(ev) => goToNext(ev)}>
                            <div className="position-arraw">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                                    <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
                                </svg>
                            </div>
                        </div>

                    </div>

                    <div className="div-dots">

                        <div className="dotContainer">
                            {slides.map((slide, slideIndex) => {
                                return <div className="dot" ref={myRef.current[slideIndex]} key={slideIndex}>&nbsp;</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-container">
                <div className="container-star"><span className="star">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false">
                        <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
                    </svg>
                    {/* `${Reviwes.calcRate()}` */}
                </span><span className="star-record">{avgRate}</span></div>
                <div className="stay-heading">{stay.loc.city}, {stay.loc.country}</div>
                <div className="stay-distance">{randDistanceKm} kilometeres away</div>
                <div className="stay-valid-dates"> {randDate}</div>
                <div className="stay-price"><span className="currency">&#8362;</span><span>{stay.price}</span> night</div>
            </div >
        </div >
        {/* {wishListModal && <SelectWishList />} */}

    </article>
}

