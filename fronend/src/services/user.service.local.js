import { storageService } from './async-storage.service'
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
    changeScore,
    getEmptyCredentials
}

window.userService = userService


async function getUsers() {
    const usersFromStorage = await storageService.query(STORAGE_KEY)
    if (!usersFromStorage.length) {
        storageService.save(STORAGE_KEY, users)
        return users
    }
    return usersFromStorage
}


async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

async function getUserByIdWishList(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    return user.wishList
    // const user = await httpService.get(`user/${userId}`)
    // return user
}


function remove(userId) {
    return storageService.remove(STORAGE_KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get(STORAGE_KEY, _id)


    user.score = score
    await storageService.put(STORAGE_KEY, user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}


async function updateWishList(userId, stayId) {
    try {
        console.log(userId)
        const user = await storageService.get(STORAGE_KEY, userId)

        // Check if it's already in wish list -> then remove from list
        if (user.wishList.find(element => element === stayId)) {
            try {
                await storageService.removeForWishList(STORAGE_KEY, user, stayId)
                console.log(user.wishList.length, "lengthhhhhhhhhhhhhhhh")

                return user.wishList

                console.log('yarden!!!!!!!')
            } catch (err) {
                console.log('hiiiiiiiiiii')
            }

        } else {

            user.wishList.push(stayId)
            await storageService.put(STORAGE_KEY, user)
            console.log(user.wishList.length, "length2")
            return user.wishList

        }


        // const user = await httpService.put(`user/${_id}`, {_id, score})
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
        const users = await getUsers(STORAGE_KEY)
        console.log('users at login', users)
        const user = await users.find(user => user.username === userCred.username)
        // const user = await httpService.post('auth/login', userCred)
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
    const user = await storageService.post(STORAGE_KEY, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    console.log('log out succesfully:')
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null)
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()


// export const userService ={
//     getEmptyCredentials,
// }

function getEmptyCredentials(fullname = '', username = '', password = 'secret') {
    return { fullname, username, password }

}


const users = [
    {
        "_id": "622f3405e36c59e6164fb914",
        "fullname": "Leland Mccane",
        "imgUrl": "https://xsgames.co/randomusers/avatar.php?g=male",
        "username": "Leland",
        "password": "secret",
        "wishList": []
    },
    {
        "_id": "u102",
        "fullname": "Aviv Poter",
        "imgUrl": "https://xsgames.co/randomusers/avatar.php?g=female",
        "username": "Aviv",
        "password": "secret",
        "wishList": []
    },
    {
        "_id": "u103",
        "fullname": "Normand Lieto",
        "imgUrl": "https://xsgames.co/randomusers/avatar.php?g=male",
        "username": "Normand",
        "password": "secret",
        "wishList": []

    },
    {
        "_id": "u104",
        "fullname": "Ivan Jons",
        "imgUrl": "https://xsgames.co/randomusers/avatar.php?g=male",
        "username": "Ivan",
        "password": "secret",
        "wishList": []

    },
    {
        "_id": "u105",
        "fullname": "Laure Demagistris",
        "imgUrl": "https://xsgames.co/randomusers/avatar.php?g=female",
        "username": "Quentin",
        "password": "secret",
        "wishList": []

    }
]