// import {Modal, , Pressable, } from 'react-native'
// import {Modal,View,Text} from "react-native";
import { useState, useEffect } from 'react'
import { userService } from '../services/user.service';
import { toggleScreen } from '../store/stay.actions'
import { signup, login } from '../store/user.actions';

// function WrapperComponent() {
//     return (
//         <View>
//             <Modal>
//                 <View style={{ flex: 1 }}>
//                     <Text>I am the modal content!</Text>
//                 </View>
//             </Modal>
//         </View>
//     );
// }


export function LoginSignup({ isLoginModalShown, setIsLoginModalShown }) {

    const [isLoggedIn, setIsloggedIn] = useState(true)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [user, setUser] = useState(userService.getLoggedinUser())

    function onChangeLoginStatus(user) {
        setUser(user)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
        setIsLoginModalShown(false)
        toggleScreen()
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCred => ({ ...prevCred, [field]: value }))
    }

    async function onLogin(credentials) {
        try {
            const currUser = isLoggedIn ? login(credentials) : signup(credentials)
            onChangeLoginStatus(currUser)
        } catch (err) {
            const errTxt = isLoggedIn ? 'problem in login' : 'problem in signup'
            console.log(errTxt, err)
        }
    }
console.log('isLoggedIn at login modal:',isLoggedIn)
    return (
        // <View>
        //     <Modal isVisible={isLoginModalShown}>
        //         <View style={{ flex: 1 }}>
        //             <Text> 
        <section>
            <div className={`full-screen ${isLoginModalShown ? 'show' : 'hide'}`}
                onClick={(() => setIsLoginModalShown(false))}
            ></div>
            <div className={`login-modal ${isLoginModalShown ? 'show' : 'hide'}`}>
                <header>
                    <button className='x-btn' onClick={() => {
                        setIsLoginModalShown(false)
                        toggleScreen()
                    }}
                    ><svg viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"
                        focusable="false">
                            <path d="m6 6 20 20" /><path d="m26 6-20 20" /></svg>
                    </button>
                    <p className='header-txt'>Log in or sign up</p>
                </header>
                <p className='title'>Welcome to BnBAir</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={credentials.username}
                        placeholder="Enter your username"
                        required
                        autoFocus />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={credentials.password}
                        placeholder="Enter your password"
                        required />
                    {!isLoggedIn && <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                    />}
                    <div>
                        <a href='#' onClick={() => setIsloggedIn(!isLoggedIn)}>
                            {isLoggedIn ? 'Alreday a memeber ? Login' :
                                'New user ? signup here'
                            }
                        </a>
                    </div>
                    <button>Continue</button>
                </form>
            </div>
        </section>
        //             </Text>
        //         </View>
        //     </Modal>
        // </View>
    )
}

