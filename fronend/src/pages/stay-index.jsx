import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, setIsFilterShown } from '../store/stay.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { useSearchParams } from 'react-router-dom';
import { Link } from "react-router-dom"
import { userService } from '../services/user.service'

import { FilterModal } from '../cmps/filter-modal'
import { StayList } from '../cmps/stay-list'
import { FilterCarousel } from '../cmps/filter-carousel'
import { UserMsg } from '../cmps/user-msg';


export function StayIndex() {

    const stays = useSelector((state) => state.stayModule.stays)
    const filterBy = useSelector((state) => state.stayModule.filterBy)
    const isFilterShown = useSelector((state) => state.stayModule.isFilterShown)
    const loggedinUser = useSelector((state) => state.userModule.user)

    const [userWishList, setUserWishList] = useState([])
    const [isFilterModalShown, setIsFilterModalShown] = useState(false)

    useEffect(() => {
        if (!loggedinUser) return
        const userId = loggedinUser._id
        console.log('from use effect stay index')
        getTotalWishList(userId)

    }, [])

    async function getTotalWishList(userId) {
        const wishList = await userService.getUserByIdWishList(userId)
        setUserWishList(wishList)
    }

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])


    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    // async function getUserWishList(idStay) {
    //     // get the user is conneced in session
    //     if (!loggedinUser) return
    //     const userId = loggedinUser._id

    //     const wishListDetails = await userService.updateWishList(userId, )
    // Get from local stoarge -> user's wish list, by the id we have from session storage.


    // fix !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 
    // const wishListDetails = await userService.getByIdWishList(userId)
    // setUserWishList(wishListDetails)
    // }

    async function addStayIdToWishList(stayId) {
        console.log(loggedinUser)
        if (!loggedinUser) return
        const userId = loggedinUser._id

        console.log('from addStayIdToWishList stay index')

        console.log(stayId)
        console.log(userId)
        try {
            const wishListDetails = await userService.updateWishList(userId, stayId)
            console.log(wishListDetails)
            setUserWishList(wishListDetails)

        } catch (err) {

            console.log(err)
        }
    }



    console.log('stays at StayIndex:', stays)
if (!stays) return 
    return (
        <div className='stay-app main-layout home-page'>
            {isFilterShown && <div className='main-screen' onClick={() => setIsFilterShown(false)}></div>}
            {isFilterModalShown && <div>
                 {/* <div className='full-screen show black' onClick={() => setIsFilterModalShown(false)}></div> */}
                <FilterModal setIsFilterModalShown={setIsFilterModalShown} stays={stays} filterBy={filterBy} />
            </div>}
            <div className='filter-carousel-container'>
                <FilterCarousel />
                <button className='filter-btn' onClick={() => setIsFilterModalShown(true)}>
                    <div className='content-container'>
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', height: 14 + 'px', width: 14 + 'px', fill: 'currentColor' }}
                            aria-hidden="true" role="presentation" focusable="false">
                            <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /></svg>
                        <span>Filters</span>
                    </div>
                </button>
            </div>
            {stays.length ? <StayList stays={stays} onRemoveStay={onRemoveStay} addStayIdToWishList={addStayIdToWishList} userWishList={userWishList} />
                : <div>no stays for now...</div>
            }
            <section className='main-control-container'>
                {/* <Link to='/stay/edit'>Add Stay</Link>

                <Link to="/stay/map">Show map
                    <div className='map-container'>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                            <path d="M31.245 3.747a2.285 2.285 0 0 0-1.01-1.44A2.286 2.286 0 0 0 28.501 2l-7.515 1.67-10-2L2.5 3.557A2.286 2.286 0 0 0 .7 5.802v21.95a2.284 2.284 0 0 0 1.065 1.941A2.29 2.29 0 0 0 3.498 30l7.515-1.67 10 2 8.484-1.886a2.285 2.285 0 0 0 1.802-2.245V4.247a2.3 2.3 0 0 0-.055-.5zM12.5 25.975l-1.514-.303L9.508 26H9.5V4.665l1.514-.336 1.486.297v21.349zm10 1.36l-1.515.337-1.485-.297V6.025l1.514.304L22.493 6h.007v21.335z">
                            </path>
                        </svg>
                    </div>
                </Link> */}
            </section>
            {/* <UserMsg /> */}
        </div>
    )
}

