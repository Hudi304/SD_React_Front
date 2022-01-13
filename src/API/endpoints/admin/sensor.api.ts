/* eslint-disable */

import { API } from "../../api"

interface AddSensorCommand {
  description: string
  maximumValueMonitored: number
}

interface EditSensorCommand {
  id: number
  description: string
  maximumValueMonitored: number
  deviceId: number
}

export const GET_sensors_API_new = (params: {}): Promise<any> => API(true, undefined, { headers: null }).get(`/admin/sensor-list`)

export const ADD_sensor_API_new = (body: AddSensorCommand): Promise<any> => API().post(`/admin/sensor`, body)

export const EDIT_sensor_API_new = (body: EditSensorCommand, params: { id: number }): Promise<any> =>
  API().put(`/admin/sensor/${params.id}`, body)

export const DELETE_sensor_API_new = (params: { id: number }): Promise<any> => API().delete(`/admin/sensor/${params.id}`)
