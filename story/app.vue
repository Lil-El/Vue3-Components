<template>
  <app-navigator defaultPath="normal/button" ref="navigator">
    <article class="app-home">
      <section
        class="app-header"
        :style="{ height: HomeConfig.headSize + 'px' }"
        @click="goHome"
      >
        v3-component
      </section>
      <section
        class="app-menu"
        :style="{
          width: HomeConfig.menuSize + 'px',
          top: HomeConfig.headSize + 'px',
        }"
      >
        <app-menu />
      </section>
      <section
        class="app-content"
        :style="{
          paddingTop: HomeConfig.headSize + 20 + 'px',
          paddingLeft: HomeConfig.menuSize + 20 + 'px',
        }"
      >
        <app-navigator-page />
      </section>
    </article>
  </app-navigator>
</template>

<script lang="ts">
import { AppNavigator } from "./components/navigator/app-navigator";
import { AppNavigatorPage } from "./components/navigator/app-navigator-page";
import AppMenu from "./components/app/app-menu.vue";
import { defineComponent, getCurrentInstance, resolveComponent } from "vue";

const HomeConfig = {
  headSize: 60,
  menuSize: 300,
};
/**
 * @author yxd
 * @description setup写法 - 不写defineComponent也可以
 */
export default defineComponent({
  components: { AppMenu, AppNavigator, AppNavigatorPage },
  setup() {
    const instance = getCurrentInstance();
    return {
      HomeConfig,
      goHome() {
        (instance!.refs.navigator as any).$._refer.methods.go("/home");
      },
    };
  },
});
/**
 * @author yxd
 * @description 配置Options写法
 */
// export default defineComponent({
//   name: "app",
//   components: {
//     AppMenu,
//     AppNavigator,
//     AppNavigatorPage,
//   },
//   data() {
//     return { HomeConfig };
//   },
//   methods: {
//     goHome() {
//       (this.$refs.navigator as any).$._refer.methods.go("home");
//     },
//   },
// });
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

.app-home {
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: solid 1px #f2f2f2;
    background-color: white;
  }

  .app-menu {
    position: fixed;
    left: 0;
    bottom: 0;
    border-right: solid 1px #f2f2f2;
    background-color: white;
  }

  .app-content {
    min-height: 100vh;
    box-sizing: border-box;
  }
}
</style>