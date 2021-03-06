import { ref, watch } from "vue";

/**
 * 双向绑定组合函数
 */
export function useModel<T>(
  getter: () => T,
  emitter: (val: T) => void,
  config?: {
    autoEmit?: boolean | undefined;
    autoWatch?: boolean | undefined;
    onChange?: (newVal: T, oldVal: T) => void;
  }
) {
  const state = ref(getter()) as { value: T };
  config = config || {};

  if (config.autoWatch !== false) {
    watch(getter, (val: T) => {
      if (val != state.value) {
        if (config!.onChange) {
          config!.onChange(val, state.value);
        }
        state.value = val;
      }
    });
  }

  return {
    get value() {
      return state.value;
    },
    set value(val: T) {
      state.value = val;
      if (config!.autoEmit !== false) {
        emitter(val);
      }
    },
  };
}
