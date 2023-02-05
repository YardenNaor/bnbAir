// import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    getUserByIdWishList,
    remove,
    update,
    updateWishList,
    // changeScore,
    getEmptyCredentials,

}

window.userService = userService
const ROUTE = 'order'

function getUsers(filterBy) {
    return httpService.get(ROUTE, { filterBy })
}


async function getById(userId) {
    // const user = await storageService.get(STORAGE_KEY, userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

async function getUserByIdWishList(userId) {
    // const user = await storageService.get(STORAGE_KEY, userId)
    const user = await httpService.get(`user/${userId}`)
    return user.wishList
    // return user
}


function remove(userId) {
    // return storageService.remove(STORAGE_KEY, userId)
    return httpService.delete(`user/${userId}`)
}
async function update({ _id, value }) {
    // const user = await storageService.get(STORAGE_KEY, _id)
    // user.score = score
    // await storageService.put(STORAGE_KEY, user)
    const user = await httpService.put(`user/${_id}`, { _id, value })
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function updateWishList(userId, stayId) {
    try {
        console.log(userId)
        const user = await getById(userId)

        // Check if it's already in wish list -> then remove from list
        if (user.wishList.find(element => element === stayId)) {
            try {
                await _removeForWishList(STORAGE_KEY, user, stayId)
                console.log(user.wishList.length, "lengthhhhhhhhhhhhhhhh")
                const user = await httpService.put(`user/${userId}`, { userId, user })
                return user.wishList
                console.log('yarden!!!!!!!')
            } catch (err) {
                console.log('hiiiiiiiiiii')
            }

        } else {
            user.wishList.push(stayId)
            // await storageService.put(STORAGE_KEY, user)
            console.log(user.wishList.length, "length2")
            return user.wishList
        }
        // Handle case in which admin updates other user's details
        if (getLoggedinUser()._id === user._id) {
            saveLocalUser(user)
        }

        // return user.wishList
    } catch (err) {
        console.log(err, "errrrrrrrrrrrrrrrrr")
    }
}

async function login(userCred) {
    try {
        const users = await getUsers()
        console.log('users at login', users)
        // const user = await users.find(user => user.username === userCred.username)
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            // socketService.login(user._id)
            return saveLocalUser(user)
        } else {
            throw new Error
        }
    } catch (err) {
        throw err
    }

}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.wishList = []
    // const user = await storageService.post(STORAGE_KEY, userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    console.log('log out succesfully:')
    // socketService.logout()
    return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null)
}



function _removeForWishList(user, stayId) {

    return getUsers().then(users => {
        // find the connected user
        const idxUser = users.findIndex(currUser => currUser._id === user._id)
        if (idxUser < 0) throw new Error(`Update failed, cannot find entity with id: ${user._id}`)
        const valuesOfObjUsers = Object.values(users)
        const wishListUser = valuesOfObjUsers[idxUser].wishList

        const idxInWishList = wishListUser.findIndex(currStay => currStay === stayId)

        wishListUser.splice(idxInWishList, 1)
        save(user)
        return user

    })
}


function save(user) {
    if (user._id) {
        return httpService.put(`${ROUTE}/${user._id}`, user)
    } else {
        return httpService.post(ROUTE, user)
    }
}

function getEmptyCredentials(fullname = '', username = '', password = 'secret') {
    return { fullname, username, password }

}

