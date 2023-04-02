export type RouteItem = {
  text: string;
  name: string;
  link: string;
  icon: string;
  inHeader?: boolean;
};

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
];
