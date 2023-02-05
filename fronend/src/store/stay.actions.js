
import { stayService } from '../services/stay.service'
import { store } from "./store.js"
import { SET_STAYS, SET_STAY, ADD_STAY, UPDATE_STAY, REMOVE_STAY, UPDATE_FILTER, SET_IS_FILTER_SHOWN, TOGGLE_SCREEN } from './stay.reducer'

export function getActionRemoveStay(stayId) {
    return {
        type: REMOVE_STAY,
        stayId
    }
}
export function getActionAddStay(stay) {
    return {
        type: ADD_STAY,
        stay
    }
}
export function getActionUpdateStay(stay) {
    return {
        type: UPDATE_STAY,
        stay
    }
}


export async function loadStay(stayId) {
    try {
        const stay = await stayService.getById(stayId)
        store.dispatch({ type: SET_STAY, stay })
        return stay
    } catch (err) {
        console.log('Cannot load stay: ', err)
        throw err
    }
}

export async function loadAllStays() {
    try {
        const stays = await stayService.getAllStays()
        return stays

    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    }
}


export async function loadStays(filterBy) {
    const queryStringParams = stayService.getParams(filterBy)
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
    try {
        const stays = await stayService.query(filterBy)
        // console.log('Stays from DB:', stays)
        store.dispatch({
            type: SET_STAYS,
            stays
        })

    } catch (err) {
        console.log('Cannot load stays', err)
        throw err
    }

}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch(getActionRemoveStay(stayId))
    } catch (err) {
        console.log('Cannot remove stay', err)
        throw err
    }
}

export async function addStay(stay) {
    try {
        const savedStay = await stayService.save(stay)
        console.log('Added Stay', savedStay)
        store.dispatch(getActionAddStay(savedStay))
        return savedStay
    } catch (err) {
        console.log('Cannot add stay', err)
        throw err
    }
}

export async function updateStay(stay) {
    try {
        await stayService.save(stay)
        store.dispatch(UPDATE_STAY, stay)
    } catch (err) {
        console.log('Cannot save stay', err)
        throw err
    }
    return stay
}

export function uptadeFilter(filterBy = stayService.getEmptyFilter()) {
    // console.log('from uptadeFilter:', filterBy)

    store.dispatch(({ type: UPDATE_FILTER, filterBy }))
    return filterBy
}


export function setIsFilterShown(isFilterShown) {
    store.dispatch(({ type: SET_IS_FILTER_SHOWN, isFilterShown }))

}
// export function SetIsUserModalShown(isUserModalShown) {
//     store.dispatch(({ type: SET_IS_USER_SHOWN, isUserModalShown }))

// }

export function toggleScreen(color = null) {
    // const mainScreen = { isActive: !isActive, color }
    // store.dispatch(({ type: TOGGLE_SCREEN, mainScreen }))
}