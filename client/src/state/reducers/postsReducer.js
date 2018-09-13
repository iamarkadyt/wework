import * as types from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.POST_NEW_POSTS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}