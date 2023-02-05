import { StayPreview } from "./stay-preview";


import React from 'react';
import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { useDispatch, useSelector } from 'react-redux'


export function StayList({ stays, onRemoveStay, addStayIdToWishList, userWishList }) {

    const currFilterBy = useSelector((state) => state.stayModule.filterBy)
    const navigate = useNavigate();

    return <ul className="home-list">
        {
            stays.map(stay => <li key={stay._id}>
                <section onClick={() => { navigate(`stay/${stay._id}${stayService.getParams(currFilterBy)}`) }}>
                    <StayPreview stay={stay} addStayIdToWishList={addStayIdToWishList} userWishList={userWishList} />
                </section>

                {/* <Link to={`stay/edit/${stay._id}`}> Edit </Link>
                <button onClick={() => onRemoveStay(stay._id)}>Remove</button> */}
            </li>)
        }

    </ul>
}

