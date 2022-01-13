import axios from 'axios'
import { ApiUrl } from './api'

// export const DEFAULT_URL = 'http://localhost:8080'
// export const DEFAULT_URL = 'https://spring-demo-hudi-back2021.herokuapp.com'

export function loginAPI(payload: { name: string; password: string }): Promise<any> {
    //console.log('ENDPOINTS LOGIN', payload)
    const loginRequest = {
        name: payload.name,
        password: payload.password
    }
    return axios.post(`${ApiUrl}/login`, loginRequest)
}

export function registerAPI(payload: any): Promise<any> {
    //console.log('ENDPOINTS REGISTER', payload)
    const { name, email, password1 } = payload
    const request = { name, email, password1 }
    return axios.post(`${ApiUrl}/register`, request)
}
