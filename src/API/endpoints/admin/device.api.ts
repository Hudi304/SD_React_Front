import { API } from '../../api'
/* eslint-disable */

interface AddDeviceCommand {
  description: string
  address: string
  maxConsumption: string
  avgConsumption: string
}

interface EditDeviceCommand {
  id: number
  description: string
  address: string
  maxConsumption: string
  avgConsumption: string
  userId: number
  sensorId: number
}

export const GET_devices_API_new = (params: {}): Promise<any> => API(true, undefined, { headers: null }).get(`/admin/device-list`)

export const ADD_device_API_new = (body: AddDeviceCommand): Promise<any> => API().post(`/admin/device`, body)

export const DELETE_device_API_new = (params: { id: number }): Promise<any> => API().delete(`/admin/device/${params.id}`)

export const EDIT_device_API_new = (body: EditDeviceCommand, params: { id: number }): Promise<any> =>
  API().put(`/admin/device/${params.id}`, body)
