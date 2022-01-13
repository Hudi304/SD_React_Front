/* eslint-disable */

import { API } from "../../api"

interface AddUserCommand {
  name: string
  password: string
  dateOfBirth: string
  address: string
}

interface EditUserCommand {
  id: number
  name: string
  password: string
  dateOfBirth: string
  address: string
  deviceIds: number[]
}

export const GET_users_API_new = (params: {}): Promise<any> => API(true, undefined, { headers: null }).get(`/user/user-list`)

export const ADD_users_API_new = (body: AddUserCommand): Promise<any> => API().post(`/user`, body)

export const DELETE_users_API_new = (params: { id: number }): Promise<any> => API().delete(`/user/${params.id}`)

export const EDIT_users_API_new = (body: EditUserCommand, params: { id: number }): Promise<any> => API().put(`/user/${params.id}`, body)
