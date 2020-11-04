<template>
  <div>ICON2</div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  render() {
    return <div>ICON3</div>;
  },
  setup() {
    return () => <div>ICON1</div>;
  },
});
</script>

<style>
</style>