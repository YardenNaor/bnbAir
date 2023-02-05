export function TitleContant({ stay, setCapacityModal }) {

    return <section className='TitleContant' onClick={() => setCapacityModal(false)}>
        <div className="titles-container">
            <div className="titleStay">{stay.name}</div>
            <div className="secendTitl">
                <div className="startTitle">
                    {
                        stay.reviews.length > 0 && <div className='reviewsBtnTitle'>{stay.reviews.length} reviews</div>
                    }
                    <div className="titlAddres">{stay.loc.city},{stay.loc.country}</div>
                </div>
                <div className="wishListBtn">save</div>
            </div>
        </div>
    </section>
}