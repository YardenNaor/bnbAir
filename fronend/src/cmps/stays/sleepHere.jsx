import dubelBed from '../../assets/img/dubelBed.svg'


export function SleepHere({ stay, avgRate }) {

    console.log('stay:',stay)

    return <section className='sleepHere'>
        <div className='sleepHereTilte'>Where you'll sleep</div>

        <div className="sleepHereContant">

        <div className="sleepHereBigBox">
                <div className='sleepHereBox'>
                <img className='bedPic' src={dubelBed}/>
                    <div className='stayNum'>Bedstay 1</div>
                    <div className='bedKind'>1 queen bed</div>
                </div>
            </div>

            {/* <div className="sleepHereBigBox">
                <div className='sleepHereBox'>
                <img className='bedPic' src={dubelBed}/>
                    <div className='stayNum'>Bedstay 1</div>
                    <div className='bedKind'>1 queen bed</div>
                </div>
            </div>

            <div className="sleepHereBigBox">
                <div className='sleepHereBox'>
                <img className='bedPic' src={dubelBed}/>
                    <div className='stayNum'>Bedstay 1</div>
                    <div className='bedKind'>1 queen bed</div>
                </div>
            </div> */}


        </div>
        
    </section>

}