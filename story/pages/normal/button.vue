<template>
  <div class="dmeo-button">
    <pl-button label="label" />
    <pl-button> BUTTON </pl-button>
    <h4>状态</h4>
    <pl-button
      v-for="item in ['primary', 'success', 'warn', 'error', 'info']"
      :label="item"
      :key="item"
      :status="item"
    />
  </div>
</template>

<script>
export default {
  name: "demo-button",
};
</script>

<style lang="scss">
.dmeo-button {
  .pl-button {
    margin-right: 8px;
  }
}
</style>