import { reactive, onBeforeUnmount, provide, inject, getCurrentInstance } from 'vue'
import { designComponent } from '../../../src/use/designComponent'

interface Route {
  path?: string,
  hash?: string,
  param?: { [k: string]: string }
}

/**
 * hash路由
 */
function getRoute(): Route {
  let locationHash = window.location.hash || '';
  if (locationHash.charAt(0) === '#') {
    locationHash = locationHash.slice(1)
  }
  const [path, hash] = (decodeURIComponent(locationHash)).split('#');

  return { path, hash }
}

export const AppNavigator = designComponent({
  name: 'app-navigator',
  provideRefer: true,
  props: {
    defaultPath: String
  },
  setup({ props, setupContext }) {
    let initRoute = getRoute();
    if (!initRoute) initRoute = { path: props.defaultPath }
    const state = reactive({ route: initRoute })
    const utils = {
      reset: () => {
        const route = getRoute()
        if (!!route) {
          state.route = route
        }
      }
    }
    const handler = {
      hashchange: () => utils.reset()
    }
    const methods = {
      go: (path: string) => {
        window.location.hash = encodeURIComponent(path)
      }
    }

    window.addEventListener('hashchange', handler.hashchange)

    onBeforeUnmount(() => window.removeEventListener('hashchange', handler.hashchange))

    const refer = {
      state,
      methods,
    }
    return {
      refer,
      render: () => {
        return !!setupContext.slots.default ? setupContext.slots.default() : null
      }
    }
  }
})