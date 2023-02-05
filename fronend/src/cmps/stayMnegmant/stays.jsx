

export function StaysShow({ loggedinUser, myStays }) {

    return <div className='menegmentContant'>
        <div className='contantTitle'>
            hello {loggedinUser.fullname}! you have  pending orders
        </div>
        <div className='tableHead'>
            <div className='cell stay'>Stay</div>
            <div className='cell location'>Location</div>
            <div className='cell price'>price</div>
            <div className='cell rate'>Rate</div>
            <div className='cell orders'>orders</div>
            <div className='cell actions'>Actions</div>


        </div>

        <div className='stayTable'>
            {
                myStays.map(stay => {
                    return <section className='stayRow cell ' key={stay._id}>
                        <div className='cell stay'>{stay.name}</div>
                        <div className='cell location'>Location</div>
                        <div className='cell price'>price</div>
                        <div className='cell rate'>Rate</div>
                        <div className='cell orders'>orders</div>
                        <div className='cell actions'>Actions</div>

                        <div className='cell actions'>
                            <button className='approveBtn'>approve</button>
                            <button className='rejectBtn'>reject</button>
                        </div>
                    </section>
                })
            }
        </div>
    </div>
}