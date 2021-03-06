# Vue3 TypeScript

> vue3 + typescript 组件库

# Create：

## 为什么不使用 vite？

Vue2.0 的 jsx 编译插件，只能使用 v-model 指令，其他指令得通过渲染函数原生的方式来写，到了 Vue3.0，jsx-next 文档中明确指出可以在 jsx 中使用指令语法，并且支持自定义指令。可问题是 vite 创建的工程我发现好像不能使用指令语法，为了能够有更好，更全面地的`Vue3.0`使用体验，我们使用 `vue-cli`来创建组件库工程；

---

vite 创建的工程默认没有配置 typescript 所需要的一些文件，比如:

- tsconfig.json
- src/shims-vue.d.ts

在 vite 工程中还是手动加上这两个文件，typescript 才能够正常的工作；

---

vite 中配置 alias 有点奇葩，而且因为浏览器基于 es module 引入的原因，vite 中好像还不支持 extension（自动给文件添加后缀名）

# Develop：

## phase 1:

### 1：shims-vue.d.ts 作用

#### 2：为什么要配置启动页面为 story/main.ts，为什么不能放置在 src 目录下？

组件库工程总的来说，分为两部分，一部分是组件源码，另一部分是测试组件的 demo 页面，可以学习 ElementIUI 将组件源码放在根目录的 packages 文件夹中，但小编感觉将组件源码放 src 更合适，因为别人在浏览你的源码的时候，一般第一反应就是去看 src 目录下的文件内容，你的库的入口一般都是设计为 src 目录下的 index.ts 或者 index.js；

---

将 demo 放在 story 文件夹下面后，需要配置 vue.config.js 的 index 单页面入口文件为 story/main.ts；因为 vue-cli 默认是找 src/main.ts 作为入口文件。

---

后续我们打包组件库的时候，会以 src/index.ts 为入口，以 umd 格式打包所有组件为一个文件。当用户不需要按需引入的时候，直接引入这个总的文件就好了。我们在 publish 的时候，除了这个打包后的总的文件，还需要将 src 文件夹 publish 到 npm 仓库中，也就是说，我们需要把组件源码 publish 上去。这样当用户按需引入的时候，通过 babel-plugin-import 按需引入其中的组件源码，这样可以最大化减少冗余代码，并且由用户自己管理兼容浏览器所需要的 polyfill；

#### 3：chainWebpack

prefetch-index 以及 preload-index 两个插件，这个两个插件会在我们的 index 单页面中的 script 标签加上 defer 以及 async 属性，导致我们 demo 示例页面按需加载失效，所以要删掉

#### 4：story 目录结构

- story
  - components：示例页面需要的一些组件，比如路由组件、示例分类组件、页面锚地组件等等；
  - pages：用来存放组件示例页面，同时也是路由的根目录；
    - normal：普通组件示例页面存放目录，比如 button、input、icon 等等；
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

- story/components/navigator/app-navigator.tsx：无根节点组件，负责计算 window.localtion.hash 中的路由信息（这里只做哈希路由，不做那么复杂，怎么简单怎么来）；并且将路由信息以及一些路由跳转方法工具对象 provide 给子组件；
- story/components/navigator/app-navigator-page.tsx：负责读取 app-navigator 中的路由信息，根据路由地址按需加载组件示例页面；
  其他的，比如首页菜单组件，只需要 inject 注入

app-navigator 提供的对象，当点击菜单跳转的时候调用对象的路由跳转方法即可；

#### 6：使用.vue 文件开发组件与 tsx 开发组件之间的区别优缺点

## phase 2:

#### 1：designComponent

designComponent，通过这个函数，可以使得我们在获取组件的引用（ref）以及注入（inject）组件提供（provide）的数据时，自动获取正确的类型提示以及约束，**无需额外编写组件类型声明**。

> Note:
>
> ----------vue3-----------
>
> Input 组件：
>
> 在 vue 文件使用时定义其 ref 名称 **plan-input ref="1"**
>
> 在 Input 组件内部将方法绑定到实例的 proxy 上，并且可以获取所有的 refs **getInstance().refs**
>
> 然后获取具体的 input 实例后，再通过组件内的 ref 引用获取到 input 输入框的实例，去执行相应的方法 **Input.use.ref('1').methods.clear()**
>
> ----------vue3-----------
>
> Input 组件：
>
> 在 vue 文件使用时定义其 ref 名称 **plan-input ref="1"**
>
> 在 Input 组件内部将方法绑定到实例的 proxy 上
>
> 获取 vue 文件的 instance（onMounted），拿到对应的 refs，并调用其方法
>
> ----------vue2-----------
>
> Input 组件：
>
> 在 vue 文件使用时定义 ref 名称 **plan-input ref="1"**
>
> 在 Input 组件内获取不到所有的，但可以获取当前的引用
>
> vue 文件获取\$refs.1，通过 input 组件的方法获取 input 实例

#### 2：打包 rollup、webpack

- Vue 不需要打包，所以要排除掉
- 格式为 umd
- rollup：
  - exports：导出的内容
  - name：配置导出的名字
  - format：导出的格式
- webpack:
  - library：配置导出的名字
  - libraryTarget：导出的格式
  - libraryExport：导出的内容
    > 打包后的测试文件在 public 中 html

#### 3：package.json

- typings：配置对象参数类型

#### 4：组件库发布后，使用

**usage**

- 1. 全局引入
- 2. 按需加载
  - babel.config.js
- 3. 自定义主题
  - 3.1. 在 vue.config.js 中引入入口 scss 文件（无需在 main.ts 中引入）
  - 3.2. 在入口 scss 文件中，引入其他 scss 文件，并引入组件库的 scss 文件
  - 3.3. 在主题 scss 文件中，配置不同的主题
- 4. 自定义组件适配主题
  - 自定义组件 card，其 scss 文件，使用了 statusMixin，所以格式为 pl-{name}-status-{status}的类名可以适配主题样式
