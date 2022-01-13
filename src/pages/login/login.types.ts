export const ACTIONS = {
  GET_MOVIE_LIST: 'GET_MOVIE_LIST',
  LOGIN: 'LOGIN '
}

export const LOGIN_ACTIONS = {
  // LOGIN_REQUEST: 'LOGIN_REQUEST',
  // LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  // LOGIN_FAILED: 'LOGIN_FAILED',

  LOGIN: 'LOGIN',

  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILED: 'REGISTER_FAILED',

  //? USERS
  GET_USERS: 'GET_USERS',
  ADD_USER: 'ADD_USER',
  EDIT_USER: 'EDIT_USER',
  DELETE_USER: 'DELETE_USER',

  //? DEVICES
  GET_DEVICES: 'GET_DEVICES',
  ADD_DEVICE: 'ADD_DEVICE',
  EDIT_DEVICE: 'EDIT_DEVICE',
  DELETE_DEVICE: 'DELETE_DEVICE',

  //? SENSORS
  GET_SENSORS: 'GET_SENSORS',
  ADD_SENSOR: 'ADD_SENSOR',
  EDIT_SENSOR: 'EDIT_SENSOR',
  DELETE_SENSOR: 'DELETE_SENSOR',

  //? USER PAGE
  GET_USER_PAGE: 'GET_USER_PAGE',

  RPC: 'RPC'
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface User {
  email: string
  password: string
}

export const URL = 'http://127.0.0.1:3030'
