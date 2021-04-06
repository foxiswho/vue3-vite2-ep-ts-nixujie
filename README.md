# 须弥戒后台
elementPlus TypeScript vue3 Vite 2.0 Vue-Router 4.0 Echart 5.0 Axios

# 安装 yarn
```bash
npm install yarn -g
```
# 初始化
```bash
yarn 
```
# 开发运行
```bash
yarn dev
```
默认使用 `development` 配置
# 编译
```bash
yarn build
```
默认使用 `production` 配置

编译后目录位于根目录下 `dist` 

# 编译后预览
```bash
yarn preview
```

# 预览

[github地址预览](https://foxiswho.github.io/vue3-vite2-ep-ts-nixujie/index.html)

[gitee地址预览](http://foxiswho.gitee.io/vue3-vite2-ep-ts-nixujie/index.html)

![登陆](https://gitee.com/foxiswho/vue3-vite2-ep-ts-nixujie/raw/main/doc/img/p-login.png)
![后台主页](https://gitee.com/foxiswho/vue3-vite2-ep-ts-nixujie/raw/main/doc/img/p-dashboard.png)

# 创建项目
```bash
# 创建 my-first-vite-app 初始化相关目录和文件
yarn create @vitejs/app vue3-vite2-ep-ts-nixujie --template vue
# 进入目录
cd vue3-vite2-ep-ts-nixujie
# 添加 typescript 支持
yarn add --dev typescript
# 使用 vue3
yarn global add @vue/cli@next
# 初始化包
yarn 
# 开发运行
yarn dev
```
# 其他命令

```bash
yarn add -g create-vite-app
yarn add -D path
vue upgrade --next

#Added non-passive event listener to a scroll-blocking 'mousewheel' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
yarn add default-passive-events --dev
```

# 感谢 PanJiaChen vue-element-admin

https://github.com/PanJiaChen/vue-element-admin

本项目是对 vue-element-admin 的升级,升级 vue3 Vue-Router 4,使用 TypeScript,使用Vite打包,elementUI 升级成 elementPlus