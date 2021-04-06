declare module '*.vue' {
  // @ts-ignore
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  // @ts-ignore
  export default component
}
declare module 'element-plus'