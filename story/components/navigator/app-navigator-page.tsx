import { reactive, DefineComponent, markRaw, watch } from "vue";
import { designComponent } from '../../../src/use/designComponent'
import { AppNavigator } from './app-navigator'

export const AppNavigatorPage = designComponent({
  setup() {
    const navigator = AppNavigator.use.inject();
    const state = reactive({
      PageComponent: null as null | DefineComponent
    })
    const utils = {
      reset: async () => {
        const route = navigator.state.route
        if (!route) {
          return void 0;
        }
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
    return {
      render: () => {
        const { PageComponent } = state;
        return !!PageComponent ? <PageComponent /> : null
      }
    }
  }
})