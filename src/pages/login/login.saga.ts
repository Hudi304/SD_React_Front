/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { takeLatest } from 'redux-saga/effects'
import { LOGIN_ACTIONS } from './login.types'
import { loginAPI, registerAPI } from '../../API/enpoint'
import { store } from '../../index'
import {
  ADD_device_API,
  ADD_users_API,
  DELETE_device_API,
  DELETE_users_API,
  GET_devices_API,
  GET_sensors_API,
  ADD_sensor_API,
  DELETE_sensor_API,
  EDIT_users_API
} from '../../API/admin.api'
import { safeSaga } from '../../utils/saga-helpers'
import { MyAction } from '../../redux'
import { ADD_users_API_new, DELETE_users_API_new, EDIT_users_API_new, GET_users_API_new } from '../../API/endpoints/admin/user.api'
import { ADD_device_API_new, DELETE_device_API_new, EDIT_device_API_new, GET_devices_API_new } from '../../API/endpoints/admin/device.api'
import { ADD_sensor_API_new, DELETE_sensor_API_new, EDIT_sensor_API_new, GET_sensors_API_new } from '../../API/endpoints/admin/sensor.api'
import { GET_UserPage_API_new, RPC_API } from '../../API/endpoints/user/userPage.api'

export function* loginSaga(): any {
  const actions = LOGIN_ACTIONS

  yield takeLatest(actions.REGISTER_REQUEST, safeSaga(register, actions.REGISTER_REQUEST))
  yield takeLatest(actions.LOGIN, safeSaga(loginSAGA, actions.LOGIN))

  yield takeLatest(actions.GET_USERS, safeSaga(GET_users, actions.GET_USERS))
  yield takeLatest(actions.ADD_USER, safeSaga(ADD_user, actions.ADD_USER, [actions.GET_USERS]))
  yield takeLatest(actions.EDIT_USER, safeSaga(EDIT_user, actions.EDIT_USER, [actions.GET_USERS]))
  yield takeLatest(actions.DELETE_USER, safeSaga(DELETE_user, actions.DELETE_USER, [actions.GET_USERS]))

  yield takeLatest(actions.GET_DEVICES, safeSaga(GET_devices, actions.GET_DEVICES))
  yield takeLatest(actions.ADD_DEVICE, safeSaga(ADD_device, actions.ADD_DEVICE, [actions.GET_DEVICES]))
  yield takeLatest(actions.EDIT_DEVICE, safeSaga(EDIT_device, actions.EDIT_DEVICE, [actions.GET_DEVICES]))
  yield takeLatest(actions.DELETE_DEVICE, safeSaga(DELETE_device, actions.DELETE_DEVICE, [actions.GET_DEVICES]))

  yield takeLatest(actions.GET_SENSORS, safeSaga(GET_sensors, actions.GET_SENSORS))
  yield takeLatest(actions.ADD_SENSOR, safeSaga(ADD_sensor, actions.ADD_SENSOR, [actions.GET_SENSORS]))
  yield takeLatest(actions.EDIT_SENSOR, safeSaga(EDIT_sensor, actions.EDIT_SENSOR, [actions.GET_SENSORS]))
  yield takeLatest(actions.DELETE_SENSOR, safeSaga(DELETE_sensor, actions.DELETE_SENSOR, [actions.GET_SENSORS]))

  yield takeLatest(actions.GET_USER_PAGE, safeSaga(GET_user_page, actions.GET_USER_PAGE))

  yield takeLatest(actions.RPC, safeSaga(RPC_SAGA, actions.RPC))
}

function RPC_SAGA(action: MyAction<any>) {
  // console.log('📅  SAGA : RPC_SAGA', action)

  const { method, params } = action.payload

  return RPC_API(method, params)
}

function loginSAGA(action: any) {
  // console.log('📅  SAGA : login', action)
  return loginAPI(action.payload)
}

function register(action: any) {
  //console.log('SAGA : register', action)
  return registerAPI(action.payload)
    .then(response => {
      store.dispatch({
        type: LOGIN_ACTIONS.REGISTER_SUCCESS,
        payload: response
      })
    })
    .catch(error => {
      store.dispatch({ type: LOGIN_ACTIONS.REGISTER_FAILED, payload: error })
    })
}

function GET_user_page(action: MyAction<any>) {
  // console.log('SAGA : GET_user_page', action)
  const { userGuid } = action.payload
  return GET_UserPage_API_new({ userGuid: userGuid })
}

//? USERS
function GET_users(action: MyAction<any>) {
  // console.log('SAGA : GET_users_myAction', action)
  return GET_users_API_new(action.payload)
}
function ADD_user(action: MyAction<any>) {
  // console.log('SAGA : ADD_user', action)
  const { name, password, dateOfBirth, address } = action.payload
  return ADD_users_API_new({ name, password, dateOfBirth, address })
}
function EDIT_user(action: any) {
  // console.log('SAGA EDIT_user', action)
  const { id, name, password, dateOfBirth, address, deviceIds } = action.payload
  return EDIT_users_API_new({ id, name, password, dateOfBirth, address, deviceIds }, { id })
}
function DELETE_user(action: any) {
  // console.log('SAGA : DELETE_user', action)
  const { id } = action.payload
  return DELETE_users_API_new({ id })
}

//? DEVICES
function GET_devices(action: any) {
  // console.log('SAGA : GET_devices', action)
  return GET_devices_API_new(action.payload)
}
function ADD_device(action: any) {
  // console.log('SAGA : ADD_device', action)
  const { description, address, maxConsumption, avgConsumption } = action.payload
  return ADD_device_API_new({ description, address, maxConsumption, avgConsumption })
}
function EDIT_device(action: any) {
  // console.log('SAGA EDIT_user', action)
  const { id, description, address, maxConsumption, avgConsumption, userId, sensorId } = action.payload
  return EDIT_device_API_new({ id, description, address, maxConsumption, avgConsumption, userId, sensorId }, { id })
}
function DELETE_device(action: any) {
  // console.log('SAGA : DELETE_device', action)
  const { id } = action.payload
  return DELETE_device_API_new({ id })
}

//? SENSORS
function GET_sensors(action: any) {
  // console.log('SAGA : GET_devices', action)
  return GET_sensors_API_new(action.payload)
}
function ADD_sensor(action: any) {
  // console.log('SAGA : ADD_sensor NOT IMPLEMENTED 🔥 ', action)
  const { description, maximumValueMonitored } = action.payload
  return ADD_sensor_API_new({ description, maximumValueMonitored })
}
function EDIT_sensor(action: any) {
  // console.log('SAGA : EDIT_sensor NOT IMPLEMENTED 🔥 ', action)
  const { id, description, maximumValueMonitored, deviceId } = action.payload
  return EDIT_sensor_API_new({ id, description, maximumValueMonitored, deviceId }, { id })
}
function DELETE_sensor(action: any) {
  // console.log('SAGA : DELETE_sensor NOT IMPLEMENTED 🔥 ', action)
  const { id } = action.payload
  return DELETE_sensor_API_new({ id })
}
