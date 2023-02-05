import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { MainFilter } from './main-filter'
import { StayManagement } from '../pages/stay-management'
import { getUnit } from '@mui/material/styles/cssUtils'
import { userService } from '../services/user.service'
import { setIsFilterShown, toggleScreen } from '../store/stay.actions'
import { logout, loadUsers } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import hamburger from '../assets/img/hamburger.svg'
import userDfault from '../assets/img/user-default.svg'
import logo from '../assets/img/our-logo.png'
import i18n from '../assets/img/i18n.svg'
import xbtn2 from '../assets/img/xbtn2.png'


export function AppHeader({ }) {

    const currFilterBy = useSelector((state) => state.stayModule.filterBy)
    const isFilterShown = useSelector((state) => state.stayModule.isFilterShown)
    const loggedinUser = useSelector((state) => state.userModule.user)
    const location = useLocation().pathname

    const [filterType, setFilterType] = useState('location')
    const [isUserModalOpen, setIsUserModalOpen] = useState(false)
    const [isLoginModalShown, setIsLoginModalShown] = useState(false)
    const [user, setUser] = useState(userService.getLoggedinUser())



    const stayDetiles = `/stays`

    useEffect(() => {
        loadUsers()
    }, [])

    function onShowFilter(type) {
        setIsFilterShown(true)
        setFilterType(type)
    }

    function setLocationTxt() {
        const { txt, region } = currFilterBy
        if ((!txt && !region) || region === 'flexible') return "Anywhere"
        return region
    }

    let divName = `app-header main-layout full ${isFilterShown ? ' big' : ''}`
    if ((location.match(`/stays`) && !location.match(`/book`))) divName += ' stay stays'
    else if (location.match(`/trip`)) divName += ` trip`
    else if (location.match(`/stays/book`)) divName += ` book`
    else if (location.match(`/hostManage`)) divName += ` hostManage`
    else if (location.match('/')) divName += `index`



    function setDateTxt(type) {
        let date = (type === 'in') ? currFilterBy.datesRange.timeStampStart : currFilterBy.datesRange.timeStampEnd
        const txt = `${new Date(date).toLocaleString('en', { month: 'short' })} ${new Date(date).getDate()}`
        return txt
    }

    function openUserModal() {
        console.log('loggedinUser at openUserModal:', loggedinUser)
        if (loggedinUser) return <section className='user-modal'>
            <button className='close'
                onClick={() => setIsUserModalOpen(false)}>
                ✕</button>
            <div className='log-out' onClick={() => {
                logout()
                setIsUserModalOpen(false)
                toggleScreen()
            }} >Log out</div>
            <Link to={`/hostManage/${loggedinUser._id}`} onClick={() => {
                setIsUserModalOpen(false)
                toggleScreen()
            }}>Dashboard</Link>
            <Link to={`/trip`} onClick={() => {
                setIsUserModalOpen(false)
                toggleScreen()
            }}>Trips</Link>
            <Link to={`/wishList`} onClick={() => {
                setIsUserModalOpen(false)
                toggleScreen()
            }}>WishLists</Link>
        </section>
        return <section className='user-modal'>
            <button className='close'
                onClick={() => setIsUserModalOpen(false)}>
                ✕</button>
            {/* <div className="full-screen transparent"
                onClick={() => setIsUserModalOpen(false)} ></div> */}
            <div className='log-in' onClick={() => {
                setIsUserModalOpen(false)
                setIsLoginModalShown(true)
                toggleScreen('black')
            }} >Log in</div>
            <div className='sign-up' onClick={() => {
                setIsLoginModalShown(true)
                setIsUserModalOpen(false)
                toggleScreen('black')
            }}>Sign up</div>

        </section>
    }

    function onFocus(target) {
        console.log('target at onfocus:', target)
        const elements = document.querySelectorAll('*')
        elements.forEach((element) => element.classList.remove('focused'))
        target.classList.add('focused')
    }

    function getCapacityTxt() {
        let guestsTxt = currFilterBy.capacity.total > 1 ? ' guests' : ' guest'
        let txt = currFilterBy.capacity.total ? currFilterBy.capacity.total + guestsTxt : 'Add guests'
        return txt
    }

    const { timeStampStart, timeStampEnd } = currFilterBy.datesRange
    return (
        <header className={divName}>
            <div className={`full-screen transparent ${isUserModalOpen ? 'show' : 'hide'}`}
                onClick={() => setIsUserModalOpen(false)}></div>
            <div className='main-content flex'>
                <Link to='/'><div className="logo-container"><img src={logo} alt="" /></div></Link>
                <div className='header-container flex'>
                    <div className='header-buttons'>
                        {/* <Link className="host-link" to="/hosting">Switch to hosting</Link> */}
                        {/* <button className='i18n-btn'><div className='i18n img-container'><img src={i18n} alt="" /></div></button> */}
                    </div>
                    <button className='user-nav flex' onClick={() => {
                        setIsUserModalOpen(true)
                        toggleScreen()
                    }}>
                        <div className='img-container hamburger'>
                            <img src={hamburger} alt="" />
                        </div >
                        <div className='img-container user' >
                            <img className='user-img' src={loggedinUser ? loggedinUser.imgUrl : userDfault} alt="" />
                        </div>
                    </button>
                </div>
                <div className={`filter-container flex ${(isFilterShown) ? 'close' : ''}`}>
                    <button onClick={() => onShowFilter('location')}><div className='btn-txt'>Anywhere</div></button><span className='line'></span>
                    <button onClick={() => onShowFilter('date')}><div className='btn-txt'>Any week</div>
                        {/* {timeStampStart ? `${setDateTxt('in')} - ${setDateTxt('out')}` : 'Any week'}</div> */}
                    </button><span className='line'></span>
                    <button className='guests flex align-center' onClick={() => onShowFilter('capacity')}>
                        <div className='btn-txt'> Add guests</div>
                        <div className="search-image img-container" onClick={(ev) => {
                            ev.stopPropagation()
                            onShowFilter('where')

                        }} >
                            <svg className='svg-white' viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" >
                                <g fill="none">
                                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                                </g>
                            </svg>
                        </div>
                    </button>
                </div>
                {isFilterShown && <MainFilter onShowFilter={onShowFilter} filterType={filterType} isFilterShown={isFilterShown}
                    setIsFilterShown={setIsFilterShown} setLocationTxt={setLocationTxt} setDateTxt={setDateTxt} onFocus={onFocus} />
                }


            </div>

            {isUserModalOpen && openUserModal()}
            <LoginSignup isLoginModalShown={isLoginModalShown} setIsLoginModalShown={setIsLoginModalShown} />
        </header>
    )


}
