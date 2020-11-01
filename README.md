# Vue3 TypeScript
>vue3 + typescript 组件库

# Create：
## 为什么不使用vite？

Vue2.0 的jsx编译插件，只能使用v-model指令，其他指令得通过渲染函数原生的方式来写，到了Vue3.0，jsx-next文档中明确指出可以在jsx中使用指令语法，并且支持自定义指令。可问题是vite创建的工程我发现好像不能使用指令语法，为了能够有更好，更全面地的`Vue3.0`使用体验，我们使用 `vue-cli`来创建组件库工程；

---

vite创建的工程默认没有配置 typescript 所需要的一些文件，比如:

- tsconfig.json
- src/shims-vue.d.ts

在vite工程中还是手动加上这两个文件，typescript才能够正常的工作；

---

vite中配置alias有点奇葩，而且因为浏览器基于es module引入的原因，vite中好像还不支持extension（自动给文件添加后缀名）

# Develop：
## phase 1:
### 1：shims-vue.d.ts作用


#### 2：为什么要配置启动页面为 story/main.ts，为什么不能放置在 src目录下？

组件库工程总的来说，分为两部分，一部分是组件源码，另一部分是测试组件的demo页面，可以学习ElementIUI将组件源码放在根目录的packages文件夹中，但小编感觉将组件源码放src更合适，因为别人在浏览你的源码的时候，一般第一反应就是去看src目录下的文件内容，你的库的入口一般都是设计为src目录下的index.ts或者index.js；

---
将demo放在story文件夹下面后，需要配置vue.config.js的index单页面入口文件为story/main.ts；因为vue-cli默认是找src/main.ts作为入口文件。

---

后续我们打包组件库的时候，会以src/index.ts为入口，以umd格式打包所有组件为一个文件。当用户不需要按需引入的时候，直接引入这个总的文件就好了。我们在publish的时候，除了这个打包后的总的文件，还需要将src文件夹publish到npm仓库中，也就是说，我们需要把组件源码publish上去。这样当用户按需引入的时候，通过 babel-plugin-import按需引入其中的组件源码，这样可以最大化减少冗余代码，并且由用户自己管理兼容浏览器所需要的polyfill；

#### 3：chainWebpack
prefetch-index以及preload-index两个插件，这个两个插件会在我们的index单页面中的script标签加上 defer以及async属性，导致我们demo示例页面按需加载失效，所以要删掉

#### 4：story目录结构
- story
  - components：示例页面需要的一些组件，比如路由组件、示例分类组件、页面锚地组件等等；
  - pages：用来存放组件示例页面，同时也是路由的根目录；
    - normal：普通组件示例页面存放目录，比如button、input、icon等等；
      - button.vue
      - color.vue
      - icon.vue
      - layout.vue
      - ...
    - form：表单示例页面存放目录；
    - table：表格示例页面存放目录；
    - service：服务示例页面存放目录；
    - ...
  - ...

#### 5：实现路由组件
路由一个由两个组件组成：

- story/components/navigator/app-navigator.tsx：无根节点组件，负责计算window.localtion.hash中的路由信息（这里只做哈希路由，不做那么复杂，怎么简单怎么来）；并且将路由信息以及一些路由跳转方法工具对象provide给子组件；
- story/components/navigator/app-navigator-page.tsx：负责读取app-navigator中的路由信息，根据路由地址按需加载组件示例页面；
其他的，比如首页菜单组件，只需要inject注入 

app-navigator提供的对象，当点击菜单跳转的时候调用对象的路由跳转方法即可；