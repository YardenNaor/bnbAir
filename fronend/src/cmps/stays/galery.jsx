


export function Galery({ stay, setCapacityModal }) {

    const url = stay['imgUrls']


    return <section className="galery" onClick={() => setCapacityModal(false)}>
        <img className='leftGalery' src={url[0]} />
        <div className='rightGalery'>
            <img src={url[1]} />
            <img src={url[2]} />
            < img src={url[3]} />
            <img src={url[4]} />
        </div>



        {/* <GaleryLeft stay={stay} /> */}
        {/* <GaleryRight stay={stay} /> */}
    </section>
}