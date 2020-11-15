import {
  ComponentPropsOptions,
  ExtractPropTypes,
  SetupContext,
  defineComponent,
  getCurrentInstance,
  provide,
  inject,
} from "vue";
import { ComponentEvent, getComponentEmit, useEvent } from "./useEvent";

/**
 * 泛型：PropsOptions、Props从源码得知
 * ExtractPropTypes：抽离属性类型
 * designComponent 模拟 defineComponent
 */
export function designComponent<
  PropsOptions extends Readonly<ComponentPropsOptions>,
  Props extends Readonly<ExtractPropTypes<PropsOptions>>,
  Emits extends { [k: string]: (...args: any[]) => boolean },
  Refer
>(options: {
  name?: string;
  props?: PropsOptions;
  provideRefer?: boolean;
  emits?: Emits;
  setup: (parameter: {
    props: Props;
    event: ComponentEvent<Emits>;
    setupContext: SetupContext<Emits>;
  }) => {
    refer?: Refer;
    render: () => any;
  };
}) {
  const { setup, provideRefer, emits, ...leftOptions } = options;

  return {
    ...defineComponent({
      ...leftOptions,
      emits: getComponentEmit(emits),
      setup(props: Props, setupContext: any) {
        const instance = getCurrentInstance() as any;
        const event = useEvent<Emits>(emits!);
        if (!setup) {
          console.error("designComponent: setup is required!");
          return () => null;
        }

        const { refer, render } = setup({ props, event, setupContext });
        if (!!refer) {
          const duplicateKey = Object.keys(leftOptions.props || {}).find((i) =>
            Object.prototype.hasOwnProperty.call(refer as any, i)
          );
          if (!!duplicateKey) {
            console.error(
              `designComponent: duplicate key ${duplicateKey} in refer`
            );
          } else {
            Object.assign(instance.proxy, refer);
          }
        }

        if (provideRefer) {
          if (!leftOptions.name) {
            console.error(
              "designComponent: name is required when provideRefer is true!"
            );
          } else {
            provide(`@@${leftOptions.name}`, refer);
          }
        }

        return render;
      },
    } as any),
    use: {
      ref: (refName: string) => {
        const instance = getCurrentInstance()!;
        return {
          get value() {
            return instance.refs[refName] as Refer | null;
          },
        };
      },
      inject: (defaultValue?: any) => {
        return inject(`@@${leftOptions.name}`, defaultValue) as Refer;
      },
    },
  };
}
