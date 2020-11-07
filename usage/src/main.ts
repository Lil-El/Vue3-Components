import {createApp} from 'vue'
import App from './App.vue'

const app = createApp(App)

/*---------------------------------------全引入组件库-------------------------------------------*/

/*import V3ComponentsWsj from 'v3-components-wsj'
import 'v3-components-wsj/dist/index.css'

app.use(V3ComponentsWsj)*/

/*
*  无法实现按需引入的写法
*/
/*import {Input} from 'v3-components-wsj'
import 'v3-components-wsj/dist/index.css'

app.use(Input)
*/

/*---------------------------------------按需引入组件-------------------------------------------*/

import {Button} from 'v3-components-wsj'

app.use(Button)

/*---------------------------------------mount-------------------------------------------*/

import MyCard from './packages/card/card'

app.component(MyCard.name, MyCard)

app.mount('#app')