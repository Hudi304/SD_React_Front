import { SnackState, SNACK_ACTIONS } from './snack.types'
import { Reducer } from 'redux'
import { MyAction } from '../redux'

const defaultSnackState = {
    SnackType: null,
    SnackProps: {}
}

export const SnackReducer: Reducer<SnackState> = (state: SnackState = defaultSnackState, action: MyAction<any>) => {
    switch (action.type) {
        case SNACK_ACTIONS.SHOW_SNACK:
            return {
                ...action.payload
            }
        case SNACK_ACTIONS.HIDE_SNACK:
            return {
                ...defaultSnackState
            }
        default:
            return state
    }
}
