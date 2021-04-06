import {store} from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value: Array<string>) {
    if (value && value instanceof Array && value.length > 0) {
        const roles = store && store.state && store.state.layout.roles
        const permissionRoles = value

        const hasPermission = roles.some((role: string) => {
            return permissionRoles.includes(role)
        })
        return hasPermission
    } else {
        console.error(`need roles! Like v-permission="['admin','editor']"`)
        return false
    }
}
