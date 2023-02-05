import { loadUser } from '../../store/user.actions.js'
import { utilService} from '../../services/util.service'

export function OrderShow({ loggedinUser, pendingNum, myOrders, changStatus }) {
    console.log(myOrders)
    function numOfGusts(order) {
        let num
        num += order.guests.Adults
        num += order.guests.Kids
        num += order.guests.Infants
        num += order.guests.Pets
        return num
    }

    function randImg() {
        let numbers = []
        const randNum = utilService.getRandomIntInclusive(1,10)
        if(numbers.includes(randNum)){
            const randNum = utilService.getRandomIntInclusive(1,10)
        }else{
            numbers.push(randNum)
        }

        return `https://xsgames.co/randomusers/assets/avatars/male/${randNum}.jpg`
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    if(!myOrders.length) return <div className="loader"></div>
    return <div className='menegmentContant'>
        <div className='contantTitle'>
            Hello {loggedinUser.fullname}! you have {pendingNum} pending orders
        </div>
        <div className='tableHead'>
            <div className='cell guest head'>Guest</div>
            <div className='cell stay head'>Stay</div>
            <div className='cell dates check-in head'>CheckIn</div>
            <div className='cell dates check-out head'>CheckOut</div>

            <div className='cell price head'>Price</div>
            <div className='cell status head'>Status</div>
            <div className='cell actions head'>Actions</div>


        </div>

        <div className='menegmentTable'>
            {
                myOrders.map(order => {
                    console.log('order at orders:',order)
                    const usrPic = randImg()
                    // console.log('order at rendrung:',order)
                    return <section className={`tableRow cell ${order.status === 'Pending' && 'pendingStatus'}`} key={order._id}>
                        <img className="gustImg" src={`${usrPic}`} />
                        <div className='cell guest'>{order.buyer.fullname}</div>
                        <div className='cell stay'>{order.stay.name}</div>
                        <div className='cell dates'>{order.startDate}</div>
                        <div className='cell dates'>{order.endDate}</div>


                        <div className='cell price'>{order.totalPrice}</div>
                        <div className={`cell status ${order.status}`}>{order.status}</div>

                        <div className='cell actions'>
                            <button className='approveBtn' disabled={(order.status === 'Pending') ? false : true} onClick={() => changStatus(order._id, 'Approved')}>approve</button>
                            <button className='rejectBtn' disabled={(order.status === 'Pending') ? false : true} onClick={() => changStatus( order._id, 'Declined')}>reject</button>
                        </div>
                    </section>
                })
            }
        </div>
    </div>
}