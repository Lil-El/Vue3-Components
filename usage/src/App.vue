<template>
    <div>
        <h1>默认主题</h1>
        <div>
            <div>按钮</div>

            <button class="pl-button pl-button-status-error">
                用户的那妞
            </button>

            <pl-button label="文本"/>
            <pl-button>插槽内容</pl-button>
            <div>按钮状态</div>
            <pl-button v-for="item in ['primary','success','warn','error','info']" :label="item" :key="item" :status="item"/>

            <h4>CARD</h4>
            <pl-my-card v-for="item in ['primary','success','warn','error','info']" :label="item" :key="item" :status="item"/>
        </div>
        <h1>theme-blue主题</h1>
        <div class="theme-blue">
            <div>按钮</div>

            <button class="pl-button pl-button-status-error">
                用户的那妞
            </button>

            <pl-button label="文本"/>
            <pl-button>插槽内容</pl-button>
            <div>按钮状态</div>
            <pl-button v-for="item in ['primary','success','warn','error','info']" :label="item" :key="item" :status="item"/>

            <pl-my-card v-for="item in ['primary','success','warn','error','info']" :label="item" :key="item" :status="item"/>
        </div>
        <h1>theme-violet主题</h1>
        <div class="theme-violet">
            <div>按钮</div>

            <button class="pl-button pl-button-status-error">
                用户的那妞
            </button>

            <pl-button label="文本"/>
            <pl-button>插槽内容</pl-button>
            <div>按钮状态</div>
            <pl-button v-for="item in ['primary','success','warn','error','info']" :label="item" :key="item" :status="item"/>

            <pl-my-card v-for="item in ['primary','success','warn','error','info']" :label="item" :key="item" :status="item"/>
        </div>

    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    // import {Input} from 'v3-components-wsj'

    export default defineComponent({
        name: 'App',
        components: {},
        setup() {
            // const inputRef = Input.use.ref('myInput')
            return {
                outerClear: () => {
                    // inputRef.value!.methods.clear()
                },
                outerFocus: () => {
                    // inputRef.value!.methods.focus(false)
                }
            }
        },
    });
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>
