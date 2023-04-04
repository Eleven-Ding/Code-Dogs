export type RouteItem = {
  text: string;
  name: string;
  link: string;
  icon: string;
  inHeader?: boolean;
};

// 尝试能不能做成自动的
export const routes: RouteItem[] = [
  {
    text: "首页",
    name: "Home",
    link: "/",
    icon: "icon-home",
  },
  {
    text: "关于",
    name: "About",
    link: "/about",
    icon: "icon-profile",
  },
  {
    text: "工具集",
    name: "Tools",
    link: "/tools",
    icon: "icon-xiaoshuai",
  },
];
