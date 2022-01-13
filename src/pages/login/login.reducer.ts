/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Reducer } from 'redux'
import { MyAction } from './login.actions'
import { LOGIN_ACTIONS } from './login.types'

const defaultState = {
  isLogged: false,
  account: {
    email: '',
    password: ''
  },
  isAdmin: true,
  fundUser: false,
  loginResp: null,
  registerResponse: null,
  admin: {},

  user: {
    rpc: {},
    full_devices: []
  }
}

export function removeObjectFromArray(array, payload) {
  if (payload.id) {
    return array.filter(item => item.id !== payload.id) // user model doesn't have guid
  }
  return array.filter(item => item.guid !== payload.guid)
}

export const LoginReducer: Reducer<any> = (state: any = defaultState, action: MyAction<any>) => {
  const payload = action.payload
  switch (action.type) {
    case LOGIN_ACTIONS.LOGIN.fulfilled():
      //console.log('REDUCER : LOGIN_REQUEST', action)
      return {
        ...state,
        foundUser: payload.data.foundUser,
        isAdmin: payload.data.isAdmin,
        userId: payload.data.userId
      }

    //TODO refactor register with new SAGA
    case LOGIN_ACTIONS.REGISTER_SUCCESS:
      //console.log('REDUCER : REGISTER_SUCCESS', action)
      return { ...state, registerResponse: payload }
    case LOGIN_ACTIONS.REGISTER_FAILED:
      //console.log('REDUCER : REGISTER_FAILED', action)
      return { ...state, registerResponse: payload }

    case LOGIN_ACTIONS.GET_USERS.fulfilled():
      // console.log('REDUCER : GET_USERS.fulfilled()', payload)
      return { ...state, admin: { ...state.admin, users: payload.normalUsers } }

    case LOGIN_ACTIONS.ADD_USER.fulfilled():
      // console.log('REDUCER : ADD_USER', action)
      return {
        ...state,
        admin: { ...state.admin, users: [...state.admin.users, payload] }
      }

    case LOGIN_ACTIONS.GET_DEVICES.fulfilled():
      // console.log('REDUCER : GET_DEVICES_SUCCESS', action)
      return { ...state, admin: { ...state.admin, devices: payload.devices } }

    case LOGIN_ACTIONS.GET_SENSORS.fulfilled():
      // console.log('REDUCER : GET_SENSORS', action)
      return { ...state, admin: { ...state.admin, sensors: payload.sensors } }

    //* USER PAGE

    case LOGIN_ACTIONS.GET_USER_PAGE.fulfilled():
      //console.log('🚒 REDUCER : GET_USER_PAGE', action)
      return { ...state, user: { ...state.user, full_devices: action.payload } }

    case LOGIN_ACTIONS.RPC.fulfilled():
      //console.log('🚒  REDUCER : RPC', action)
      return { ...state, user: { ...state.user, rpc: { [action.payload.id]: action.payload.result } } }

    case 'LOGOUT':
      return { ...state, isLogged: false }

    default:
      return state
  }
}
