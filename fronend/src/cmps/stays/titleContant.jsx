export function Title({ stay, setCapacityModal }) {

    return <section className='Title' onClick={() => setCapacityModal(false)}>
        <div className="titles-container">
            <div className="tite-text">
                <div className="stay-name">{stay.name}</div>
                <div className="secendTitl">
                    <div className="reviwTitle">
                        {
                            stay.reviews.length > 0 && <div className='reviewsBtnTitle'>{stay.reviews.length} reviews</div>
                        }
                        <div className="titlAddres">{stay.loc.city},{stay.loc.country}</div>
                    </div>
                    <div className="save">save</div>
                </div>
            </div>

        </div>
    </section>
}