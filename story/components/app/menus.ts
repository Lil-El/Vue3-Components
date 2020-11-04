export interface AppMenu {
  name: string;
  title: string;
  page: string;
  complete?: boolean;
}

export interface MenuGroup {
  name: string;
  children: AppMenu[];
}

export const MENUS: MenuGroup[] = [
  {
    name: "基础",
    children: [
      { name: "Color", title: "颜色", page: "/normal/color", complete: false },
      { name: "Icon", title: "图标", page: "/normal/icon", complete: false },
      {
        name: "Button",
        title: "按钮",
        page: "/normal/button",
        complete: false,
      },
      { name: "Grid", title: "布局", page: "/normal/grid", complete: false },
    ],
  },
  {
    name: "表单组件",
    children: [
      {
        name: "Input",
        title: "输入框",
        page: "/normal/input",
        complete: false,
      },
    ],
  },
];
