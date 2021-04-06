import request from '@/utils/request'
import {AxiosResponse} from 'axios'
import {IUserInfo} from '@/type/store/interface'

export interface loginParam {
    username: string,
    password: string
}

const api = {
    login: '/login',
    logout: '/logout',
    getInfo: '/getInfo',
    getRouterList: '/getRoute'
}

export interface loginVo {
    token: string,
    info: IUserInfo
}
//返回对象
export interface infoVo {
    info: IUserInfo
}

export function login(param: loginParam): Promise<AxiosResponse<IR<loginVo>>> {
    return request({
        url: api.login,
        method: 'post',
        data: param
    })
}

export function logout(): Promise<AxiosResponse<IR<string>>> {
    return request({
        url: api.logout,
        method: 'get'
    })
}

export function getInfo(): Promise<AxiosResponse<IR<infoVo>>> {
    return request({
        url: api.getInfo,
        method: 'get',
    })
}
