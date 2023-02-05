import pool from '../../assets/img/pool.svg'
import Kitchen from '../../assets/img/Kitchen.svg'
import wifii from '../../assets/img/wifii.svg'
import DedicatedWorkspace from '../../assets/img/DedicatedWorkspace.svg'
import tv from '../../assets/img/tv.svg'
import AC from '../../assets/img/AC.svg'
import Freezer from '../../assets/img/Freezer.svg'
import Oven from '../../assets/img/Oven.svg'
import Gameconsole from '../../assets/img/Gameconsole.svg'
import bbqgrill from '../../assets/img/bbqgrill.svg'


export function PlaceOffers({ stay }) {

    const amenities = stay.amenities

    return <section className='placeOffers'>
        <div className='offersTitle'>What this place offers</div>

        <div className="placeOffersContant">

            <div className='offer'>
                <img className="offerImg" src={pool} />
                <div className='oferTxt'>pool</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={Kitchen} />
                <div className='oferTxt'>Kitchen</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={wifii} />
                <div className='oferTxt'>Wifi</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={DedicatedWorkspace} />
                <div className='oferTxt'>DedicatedWorkspace</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={tv} />
                <div className='oferTxt'>tv</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={AC} />
                <div className='oferTxt'>AC</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={Freezer} />
                <div className='oferTxt'>Freezer</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={Oven} />
                <div className='oferTxt'>Oven</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={bbqgrill} />
                <div className='oferTxt'>bbqgrill</div>
            </div>

            <div className='offer'>
                <img className="offerImg" src={Gameconsole} />
                <div className='oferTxt'>Gameconsole</div>
            </div>


        </div>

        <button className='showAll'>Show all {amenities.length} amenities</button>

    </section>
}