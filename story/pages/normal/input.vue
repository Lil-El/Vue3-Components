<template>
  <div class="demo-input">
    <pl-input />
    <h4>状态</h4>
    <pl-input
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "demo-input",
  //   setup() {
  //     const inputRef = Input.use.ref("myInput");

  //     return {
  //       outerClear: () => {
  //         inputRef.value!.methods.clear();
  //       },
  //       outerFocus: () => {
  //         inputRef.value!.methods.focus(false);
  //       },
  //     };
  //   },
});
</script>

<style lang="scss">
</style>