import { watch, ref, computed } from "vue";
import { designComponent } from '../../use/designComponent'
import "./input.scss";

console.log('加载了 Input 组件')

// 旧版本：input-define.tsx
// design版本
export default designComponent({
  name: "pl-input",
  props: {
    status: { type: String, default: "primary" },
    modelValue: { type: [String, Number] },
  },
  emits: {
    updateModelValue: (val: string | number | undefined) => {
      return true
    },
  },
  setup({ props, event }) {
    const model = ref(props.modelValue);
    const inputRef = ref(null as null | HTMLInputElement);

    const classes = computed(() => [
      "pl-input",
      `pl-input-status-${props.status}`,
    ]);
    const handler = {
      onInput: (e: Event) => {
        model.value = (e.target as HTMLInputElement).value;// 修改model的值不会影响父级的state
        event.emit.updateModelValue(model.value)
      }
    }
    const methods = {
      focus: (flag: boolean) => {
        inputRef.value!.focus();
        if (flag) {
          model.value = "";
        }
      },
      clear: () => {
        model.value = "";
      },
    };
    watch(() => props.modelValue, val => {
      model.value = val;
    })
    return {
      refer: {
        methods,
        model
      },
      render: () => (
        <div class={classes.value}>
          <input class="pl-input-inner"
            type="text"
            value={model.value}
            onInput={handler.onInput}
            ref={inputRef} />
          <button onClick={methods.clear}>clear</button>
          <button onClick={() => methods.focus(true)}>focus</button>
        </div>
      )
    }
  },
});
