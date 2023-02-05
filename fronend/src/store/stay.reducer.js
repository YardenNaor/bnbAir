import { stayService } from '../services/stay.service'

export const SET_STAYS = 'SET_STAYS'
export const SET_STAY = 'SET_STAY'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const SET_IS_FILTER_SHOWN = 'SET_IS_FILTER_SHOWN'
export const SET_IS_USER_SHOWN = 'SET_IS_USER_SHOWN'
export const TOGGLE_SCREEN = 'TOGGLE_SCREEN'

const initialState = {
    stays: [],
    stay: {},
    filterBy: stayService.getEmptyFilter(),
    isFilterShown: false,
    mainScreen: { isActive: false, color: null }
}

export function stayReducer(state = initialState, action) {
    var stays
    
    switch (action.type) {
        case SET_STAYS:
            return { ...state, stays: action.stays }
        case SET_STAY:
            return { ...state, stay: action.stay }
        case REMOVE_STAY:
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            return { ...state, stays }
        case ADD_STAY:
            stays = [action.stay, ...state.stays]
            return { ...state, stays }
        case UPDATE_STAY:
            stays = state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay)
            return { ...state, stays }

        case UPDATE_FILTER:
            // console.log('newFilter at store:', action.filterBy)
            return { ...state, filterBy: action.filterBy }
        case SET_IS_FILTER_SHOWN:
            return { ...state, isFilterShown: action.isFilterShown }
        case TOGGLE_SCREEN:
            return { ...state, mainScreen: action.mainScreen}
        default:
            return state;
    }
} 