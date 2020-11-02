import { defineComponent, reactive, DefineComponent, markRaw, watch } from "vue";
import { injectAppNavigator } from "./app-navigator";

export const AppNavigatorPage = defineComponent({
  setup() {
    const state = reactive({
      PageComponent: null as null | DefineComponent
    })
    const navigator = injectAppNavigator();
    const utils = {
      reset: async () => {
        console.log('reset:', navigator);
        let { path } = navigator.state.route;
        if (!path) { return void 0 }
        if (path.charAt(0) === '/') {
          path = path.slice(1)
        }
        const Component = (await import('story/pages/' + path)).default;
        state.PageComponent = markRaw(Component)
      }
    }
    watch(() => navigator.state.route.path, utils.reset, { immediate: true });
    return () => {
      const { PageComponent } = state;
      return (
        <div class="app-navigator-page">
          {PageComponent ? <PageComponent /> : null}
        </div>
      )
    }
  }
})