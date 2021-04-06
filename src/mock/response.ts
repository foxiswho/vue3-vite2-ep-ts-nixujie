import { user, user_role, role_route } from '@/mock/data/user'
import {IMenubarList, IUserInfo} from '@/type/store/interface'

export const setToken = function(name: string):string {
    return `token_${name}_token`
}

export const checkToken = function(token: string):string {
    const match = token.match(/^token_([\w|\W]+?)_token/)
    return match ? match[1] : ''
}

export const login = function(name: string, pwd: string):boolean {
    return user.findIndex(v => v.name === name && v.pwd === pwd) !== -1
}

export const getUser = function(name: string):IUserInfo {
    return {
      id: 1,
      name: name,
      username: name,
      avatar: '',
      introduction: name,
      roles: ["admin"]
    }
}

export const getRoute = function(name: string):Array<IMenubarList> {
    const { roles } = getUser(name)
    const arr = role_route.filter(v => roles.findIndex(val => val === v.roleName) !== -1)
    const filterRoute:Array<IMenubarList> = []
    // route.forEach(v => {
    //     arr.forEach(val => {
    //       const obj = Object.assign({},v)
    //       obj.meta.permission = val.permission
    //       filterRoute.push(obj)
    //     })
    // })
    return filterRoute
}
