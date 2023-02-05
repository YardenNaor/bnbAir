

export function CapacityBooking({ addGuest, guests, dates }) {

    return (
        <section className="guestsModal">

            <div className="capacityLabel first">
                <div className="descriptionGuests">
                    <div className='title'>Adults</div>
                    <div className='desc'>Ages 13+</div>
                </div>
                <div className="chosingGuests">
                    <button className="chosingGuestsBtn" onClick={() => addGuest('Adults', -1)}>-</button>
                    <div>{guests.Adults}</div>
                    <button className="chosingGuestsBtn" onClick={() => addGuest('Adults', 1)}>+</button></div>
            </div>

            <div className="capacityLabel">
                <div className="descriptionGuests">
                    <div className='title'>Children</div>
                    <div className='desc'>Ages 2-12</div>
                </div>
                <div className="chosingGuests">
                    <button className="chosingGuestsBtn" onClick={() => addGuest('Kids', -1)}>-</button>
                    <div>{guests.Kids}</div>
                    <button className="chosingGuestsBtn" onClick={() => addGuest('Kids', 1)}>+</button>
                </div>
            </div>

            <div className="capacityLabel">
                <div className="descriptionGuests">
                    <div className='title'>Infants</div>
                    <div className='desc'>Under 2</div>
                </div>
                <div className="chosingGuests">
                    <button className="chosingGuestsBtn" onClick={() => addGuest('Infants', -1)}>-</button>
                    <div>{guests.Infants}</div>
                    <button className="chosingGuestsBtn" onClick={() => addGuest('Infants', 1)}>+</button>
                </div>
            </div>

            <div className="capacityLabel">
                <div className="descriptionGuests">
                    <div className='title'>Pets</div>
                </div>
                <div className="chosingGuests">
                    <button className="chosingGuestsBtn" onClick={() => addGuest('Pets', -1)}>-</button>
                    <div>{guests.Pets}</div>
                    <button className="chosingGuestsBtn" onClick={() => addGuest('Pets', 1)}>+</button>
                </div>
            </div>

            <div>

            </div>
        </section >
    )
}
