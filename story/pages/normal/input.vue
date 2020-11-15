<template>
  <div class="demo-input">
    <pl-input />
    <h4>状态</h4>
    <pl-input
      v-model="state.text"
      v-for="item in ['primary', 'success', 'warn', 'error', 'info']"
      :key="item"
      :status="item"
      style="margin-right: 8px"
    />
    <h4>类型提示</h4>
    <pl-input ref="myInput" />
    <button @click="outerClear">outer clear</button>
    <button @click="outerFocus">outer focus</button>
  </div>
</template>

<script lang="ts">
import { Input } from "../../../src";
import { defineComponent, getCurrentInstance, onMounted, reactive } from "vue";

export default defineComponent({
  name: "demo-input",
  setup() {
    const state = reactive({
      text: "hello world",
    });
    /**
     * use.ref的作用之一：获取组件的引用和引用类型
     */
    // 1使用Input组件实例的refs
    const inputRef = Input.use.ref("myInput");
    // 2使用当前实例的refs，
    let inputref: any;
    onMounted(() => {
      inputref = getCurrentInstance()!.refs["myInput"] as any;
    });
    return {
      outerClear: () => {
        console.log(inputref);
        inputref.methods.clear();
        // inputRef.value!.methods.clear(); //组件内部定义了clear方法，绑定在refer上，在使用组件时调用组件内部的clear方法
      },
      outerFocus: () => {
        inputRef.value!.methods.focus(false);
      },
      state,
    };
  },
});
</script>

<style lang="scss">
</style>