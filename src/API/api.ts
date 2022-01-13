import axios from 'axios'
import * as _ from 'lodash'
import { DateUtils } from '../utils/date-utils'
// import { RefreshTokenCommand } from '../models/RefreshTokenCommand';
import { history } from '../index'

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'
export const LAST_EMAIL = 'last_email'
export const ME_INFO = 'me_info'

export const ApiUrl = 'https://spring-demo-hudi-back2021.herokuapp.com'
// export const ApiUrl = 'http://localhost:8080'

function cleanUp(data) {
  if (_.isObject(data)) {
    Object.keys(data).forEach(key => {
      if (data[key] === '') {
        data[key] = undefined
      } else if (_.isObject(data[key])) {
        cleanUp(data[key])
      }
    })
  } else if (_.isArray(data)) {
    data.forEach(item => cleanUp(item))
  }
}

let refreshPromise = null

export const API = (requireAuth = false, baseURL = ApiUrl, callOptions: any = {}): any => {
  const options = { headers: {}, baseURL, ...callOptions }
  const axiosInstance = axios.create(options)

  axiosInstance.interceptors.request.use(
    config => {
      if (_.isObject(config.data)) {
        cleanUp(config.data)
        stringifyData(config.data)
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    response => {
      return Promise.resolve(response.data)
    },
    error => {
      return Promise.reject(error.response?.data)
    }
  )

  return axiosInstance
}

function setToken(tokenObj) {
  localStorage.setItem(ACCESS_TOKEN, tokenObj.token)
  localStorage.setItem(REFRESH_TOKEN, tokenObj.refreshToken)
}
function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN)
}
function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN)
}
function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
}

function stringifyData(data) {
  // console.log('API stringifyData : ', data)
  if (data) {
    Object.keys(data).forEach(key => {
      if (_.isDate(data[key])) {
        data[key] = DateUtils.convertDateToUTCString(data[key])
      } else if (_.isArray(data[key])) {
        data[key] = data[key].filter(item => !!item)
        data[key].forEach(obj => {
          if (obj) {
            stringifyData(obj)
          }
        })
      } else if (_.isObject(data[key])) {
        stringifyData(data[key])
      }
    })
  }
  return data
}
