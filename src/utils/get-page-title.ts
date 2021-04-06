import defaultSettings from '@/settings'

export default function getPageTitle(pageTitle?: string) {
  let title = defaultSettings.title || '须弥戒后台。Vue3 ElementPlus Admin'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
