<template>
  <div>ICON1</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => <div>ICON2</div>;
  },
  render() {
    return <div>ICON3</div>;
  },
});
</script>

<style>
</style>