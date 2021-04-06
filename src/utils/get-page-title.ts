import defaultSettings from '@/settings'
const title = defaultSettings.title || '须弥戒后台。Vue3 ElementPlus Admin'

export default function getPageTitle(pageTitle?:string) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}
