import { Action } from 'redux'
import { LOGIN_ACTIONS } from './login.types'

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */

export interface MyAction<T> extends Action<string> {
  payload?: T
}

export namespace LoginActions {
  //? USER PAGE

  export const GET_UserPage = (payload): MyAction<any> => {
    //console.log('🤖  ACTIONS GET_UserPage : ', payload)
    return {
      type: LOGIN_ACTIONS.GET_USER_PAGE,
      payload: payload
    }
  }

  //? LOGIN
  export const loginRequest = (payload): MyAction<any> => {
    //console.log('🤖 ACTIONS LOGIN : ', payload)
    return {
      type: LOGIN_ACTIONS.LOGIN,
      payload: payload
    }
  }

  //? REGISTER
  export const registerRequest = (payload): MyAction<any> => {
    //console.log('ACTIONS registerRequest : ', payload)
    return {
      type: LOGIN_ACTIONS.REGISTER_REQUEST,
      payload: payload
    }
  }
  export const registerSuccess = (payload): MyAction<any> => {
    //console.log('ACTIONS registerSuccess : ', payload)
    return {
      type: LOGIN_ACTIONS.REGISTER_SUCCESS,
      payload: payload
    }
  }
  export const registerFailed = (payload): MyAction<any> => {
    //console.log('ACTIONS registerFailed : ', payload)
    return {
      type: LOGIN_ACTIONS.REGISTER_FAILED,
      payload: payload
    }
  }

  //* USER PAGE

  export const rpc = (data): MyAction<any> => {
    //console.log('🔥  ACTIONS rpc : ', data)
    return {
      type: LOGIN_ACTIONS.RPC,
      payload: data
    }
  }

  //? USERS
  export const GET_Users = (data): MyAction<any> => {
    //console.log('ACTIONS GET_User : ', data)
    return {
      type: LOGIN_ACTIONS.GET_USERS,
      payload: data
    }
  }

  export const ADD_User = (data): MyAction<any> => {
    //console.log('ACTIONS ADD_User : ', data)
    return {
      type: LOGIN_ACTIONS.ADD_USER,
      payload: data
    }
  }

  export const EDIT_User = (data): MyAction<any> => {
    //console.log('ACTIONS EDIT_User : ', data)
    return {
      type: LOGIN_ACTIONS.EDIT_USER,
      payload: data
    }
  }

  export const DELETE_User = (data): MyAction<any> => {
    console.log('ACTIONS DELETE_User : ', data)
    return {
      type: LOGIN_ACTIONS.DELETE_USER,
      payload: data
    }
  }

  //? DEVICES
  export const GET_Devices = (data): MyAction<any> => {
    //console.log('ACTIONS GET_Devices : ', data)
    return {
      type: LOGIN_ACTIONS.GET_DEVICES,
      payload: data
    }
  }

  export const ADD_Device = (payload: any): MyAction<any> => {
    //console.log('ACTIONS ADD_Device : ', payload)
    return {
      type: LOGIN_ACTIONS.ADD_DEVICE,
      payload: payload
    }
  }

  export const EDIT_Device = (payload: any): MyAction<any> => {
    //console.log('ACTIONS EDIT_Device : ', payload)
    return {
      type: LOGIN_ACTIONS.EDIT_DEVICE,
      payload: payload
    }
  }

  export const DELETE_Device = (payload: any): MyAction<any> => {
    //console.log('ACTIONS DELETE_Device : ', payload)
    return {
      type: LOGIN_ACTIONS.DELETE_DEVICE,
      payload: payload
    }
  }

  //? SENSORS
  export const GET_Sensors = (payload: any): MyAction<any> => {
    //console.log('ACTIONS GET_Sensors : ', payload)
    return {
      type: LOGIN_ACTIONS.GET_SENSORS,
      payload: payload
    }
  }

  export const ADD_Sensor = (payload: any): MyAction<any> => {
    //console.log('ACTIONS ADD_Sensor : ', payload)
    return {
      type: LOGIN_ACTIONS.ADD_SENSOR,
      payload: payload
    }
  }

  export const EDIT_Sensor = (payload: any): MyAction<any> => {
    //console.log('ACTIONS EDIT_Sensor : ', payload)
    return {
      type: LOGIN_ACTIONS.EDIT_SENSOR,
      payload: payload
    }
  }

  export const DELETE_Sensor = (payload: any): MyAction<any> => {
    //console.log('ACTIONS DELETE_Sensor : ', payload)
    return {
      type: LOGIN_ACTIONS.DELETE_SENSOR,
      payload: payload
    }
  }
}
