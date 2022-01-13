import { LoginReducer } from '../pages/login/login.reducer'
import { combineReducers } from 'redux'
import { ModalReducer } from '../common-components/modals/modal.reducer'

export const reducers = combineReducers({
    login: LoginReducer,
    modals : ModalReducer
})

export default reducers
