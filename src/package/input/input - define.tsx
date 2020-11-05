import { defineComponent, ref, computed } from "vue";
import "./input.scss";

/**
 * 直接导出defineComponent 和 导出解构后的对象 效果一样
 * export default defineComponent();
 * export default {...defineComponent()}
 */
export default {
  ...defineComponent({
    name: "pl-input",
    props: {
      status: { type: String, default: "primary" },
    },
    setup(props) {
      const modelValue = ref("");
      const inputRef = ref(null as null | HTMLInputElement);
      const classes = computed(() => [
        "pl-input",
        `pl-input-status-${props.status}`,
      ]);
      const methods = {
        focus: (flag: boolean) => {
          inputRef.value!.focus();
          if (flag) {
            modelValue.value = "";
          }
        },
        clear: () => {
          modelValue.value = "";
        },
      };
      return () => (
        <div class={classes.value}>
          <input class="pl-input-inner" type="text" v-model={modelValue.value} ref={inputRef} />
          <button onClick={methods.clear}>clear</button>
          <button onClick={() => methods.focus(true)}>focus</button>
        </div>
      )
    },
  })
};
