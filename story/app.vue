<template>
  <app-navigator defaultPath="normal/button">
    <div class="app-home">
      <app-navigator-page />
    </div>
  </app-navigator>
</template>

<script>
import { AppNavigator } from "./components/navigator/app-navigator";
import { AppNavigatorPage } from "./components/navigator/app-navigator-page";
export default {
  components: {
    AppNavigator,
    AppNavigatorPage,
  },
  name: "app",
};
</script>
