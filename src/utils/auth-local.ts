import { ILocalStore } from '@/type/store/local'
import {ISetting, IToken} from "@/type/store/interface";
import { AUTH_TOKEN,SETTING } from "@/type/store/const";
/**
 * 设置有效期
 * @param name 设置名称
 * @param data 数据对象
 * @param Expires 有效期
 */
export function setLocal(name:string, data:IObject<any>, Expires = 1000 * 60 * 60 * 24 * 365):void {
    const d = data as ILocalStore
    d.expires = Expires
    d.startTime = Date.now()
    localStorage.setItem(name, JSON.stringify(data))
}

/**
 * 判断 有效期
 * @param name 设置名称
 */
export async function verifyLocal(name: string):Promise<ILocalStore> {
    return new Promise((resolve, reject) => {
        const local = getLocal<ILocalStore>(name)
        if(local.startTime + local.expires < Date.now()) reject(`${name}已超过有效期`)
        resolve(local)
    })
}
/**
 * 获取 对象
 * @param name 设置名称
 */
export function getLocal<T>(name:string):T {
    const l = localStorage.getItem(name)
    const local = JSON.parse(l !== null ? l : '{}') as unknown as T
    return local
}

/**
 * 获取 对象 token
 */
export function getLocalToken():IToken {
    return getLocal<IToken>(AUTH_TOKEN)
}

/**
 * 获取 对象 SETTING
 */
export function getLocalSetting():ISetting {
    return getLocal<ISetting>(SETTING)
}

/**
 * 设置有效期
 */
export function setLocalToken(data:IObject<any>, Expires = 1000 * 60 * 60 * 24 * 365):void {
    setLocal(AUTH_TOKEN,data,Expires)
}