import { useRef } from "react";


export function SelectWishList() {

    const refCatagory = useRef(null)

    function createNewWishList() {
        console.log('hii')
    }
    
    function addNewCatagory(ev) {
        const element = refCatagory.current;
        const catagory = element.textContent
        
    }    


    return <section className="modal-containter">
        <div className="modal">
            <div className="header-modal">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                    <path d="m6 6 20 20"></path>
                    <path d="m26 6-20 20"></path>
                </svg>
                <div className="text-header">Your wishlists</div>
                <div className="another-div">&nbsp;</div>
            </div>
            <div className="main-modal" >
                <div className="item" onClick={ev => { ev.preventDefault(); createNewWishList() }}>
                    <div className="inner-item">
                        <img className="image" src="https://a0.muscache.com/im/pictures/da1a2f06-efb0-4079-abce-0f6fc82089e0.jpg">
                        </img>
                    </div>
                    <div className="div-text">
                        Create new wishlist
                    </div>
                </div>
                <div className="item" onClick={ev => { ev.preventDefault(); addNewCatagory(ev) }} >
                    <div className="inner-item">
                        <img className="image"></img>
                    </div>

                    <div className="div-text" ref={refCatagory}>
                        loved!
                    </div>
                </div>
            </div>
        </div>
    </section>
}