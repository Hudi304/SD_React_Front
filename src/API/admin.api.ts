import axios from 'axios'
import { ApiUrl } from './api'
// import { DEFAULT_URL } from './enpoint'

//? USERS
// export function GET_users_API(payload: { a: any }): Promise<any> {
//     // console.log('ENDPOINTS GET_users_API', payload)
//     return axios.get(`${DEFAULT_URL}/user/user-list`)
// }

export function ADD_users_API(payload: any): Promise<any> {
  //console.log('ENDPOINTS ADD_users_API', payload)
  const { name, password, dateOfBirth, address } = payload
  const request = {
    name,
    password,
    dateOfBirth,
    address
  }
  return axios.post(`${ApiUrl}/user`, request)
}
export function DELETE_users_API(payload: any): Promise<any> {
  //console.log('ENDPOINTS DELETE_users_API', payload)
  const id = payload.id
  return axios.delete(`${ApiUrl}/user/${id}`)
}
export function EDIT_users_API(payload: any): Promise<any> {
  // console.log('EDIT_users_API : ', payload)
  const request = {}
  return axios.put(`${ApiUrl}/user`, request)
}

//? DEVICES
export function GET_devices_API(payload: { a: any }): Promise<any> {
  //console.log('ENDPOINTS GET_devices_API', payload)
  return axios.get(`${ApiUrl}/admin/device-list`)
}
export function ADD_device_API(payload: any): Promise<any> {
  //console.log('ENDPOINTS ADD_Device_API', payload)
  const { description, address, maxConsumption, avgConsumption } = payload
  const request = {
    description,
    address,
    maxConsumption,
    avgConsumption
  }
  return axios.post(`${ApiUrl}/admin/device`, request)
}
export function DELETE_device_API(payload: any): Promise<any> {
  //console.log('ENDPOINTS DELETE_device_API', payload)
  const id = payload.id
  //console.log('ID : ', id)

  return axios.delete(`${ApiUrl}/admin/device/${id}`)
}

//? SENSORS

export function GET_sensors_API(payload: { a: any }): Promise<any> {
  //console.log('ENDPOINTS GET_Sensor_API', payload)
  return axios.get(`${ApiUrl}/admin/sensor-list`)
}
export function ADD_sensor_API(payload: any): Promise<any> {
  //console.log('ENDPOINTS ADD_Sensor_API', payload)
  const { description, maximumValueMonitored } = payload
  const request = {
    description,
    maximumValueMonitored
  }
  return axios.post(`${ApiUrl}/admin/sensor`, request)
}
export function DELETE_sensor_API(payload: any): Promise<any> {
  //console.log('ENDPOINTS DELETE_Sensor_API', payload)
  const id = payload.id
  return axios.delete(`${ApiUrl}/admin/sensor/${id}`)
}
