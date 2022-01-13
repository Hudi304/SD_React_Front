import { API } from '../../api'

export const GET_UserPage_API_new = (params: { userGuid: string }): Promise<any> =>
  API(true, undefined, { headers: null }).get(`/user/logs/${params.userGuid}`)

export const RPC_API = (method: string, params: any[]): Promise<any> =>
  API().post(`/user/rpc/remoteService`, {
    jsonrpc: 2.0,
    id: method,
    method: method,
    params: params
  })
