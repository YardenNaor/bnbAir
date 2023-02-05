import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { stayService } from "../services/stay.service";
import { userService } from "../services/user.service";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
export function DateFilter({ handleChange, isBooking, setDateModal, dateModal }) {

    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now() + (1000 * 60 * 60 * 24 * 7));

    useEffect(() => {
        const timeStampStart = new Date(startDate).getTime();
        const timeStampEnd = new Date(endDate).getTime();
        const totalNights = stayService.getNightsCount(timeStampStart, timeStampEnd)
        handleChange({ name: 'datesRange', value: { timeStampStart, timeStampEnd, totalNights } })
        // totalNights
    }, [startDate, endDate])

    return (
        <section className={`date-filter ${isBooking && 'booking'} `} 
        // onClick={(ev)=>console.log(':',)}
        >
            {isBooking && <div className="full-screen transparent show"
                onClick={() => setDateModal(false)}></div>}
            <span className="title">Choose dates</span>
            <div className="calendar-container flex">
                <>
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            console.log('dates at onChange:', dates)
                            const [start, end] = dates;
                            setStartDate(start)
                            // setEndDate(end)
                        }}
                        selectsRange
                        inline
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => {
                            // const [start, end] = dates;
                            // setStartDate(start)
                            setEndDate(date)
                        }}
                        // selectsRange
                        inline
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    // maxDate={addMonths(new Date(), 5)}
                    />
                </>
            </div>
            {isBooking && <button className="close-btn" onClick={() => setDateModal(false)}>Close</button>}
        </section>
    )
}


