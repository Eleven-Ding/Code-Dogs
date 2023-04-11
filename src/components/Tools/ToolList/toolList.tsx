import styles from "./toolList.module.scss";

export interface ToolItem {
  toolName: string;
  icon: string;
  link: string;
}
const tools: ToolItem[] = [
  {
    toolName: "图床",
    icon: "icon-yunshangchuan_o",
    link: "",
  },
  {
    toolName: "图片转Base64",
    icon: "icon-zhuanhuantuxing",
    link: "",
  },
  {
    toolName: "图片压缩",
    icon: "icon-yasuobao",
    link: "",
  },
  {
    toolName: "时间戳转换",
    icon: "icon-shijianchuo",
    link: "",
  },
  {
    toolName: "自动生成正则",
    icon: "icon-regularExpression-o",
    link: "",
  },

  {
    toolName: "IP地址获取",
    icon: "icon-ip",
    link: "",
  },
  {
    toolName: "自动部署",
    icon: "icon-liuchengbushu",
    link: "",
  },
  {
    toolName: "图片爬虫",
    icon: "icon-pachong",
    link: "",
  },

];

export function ToolList() {
  return (
    <div className={styles["tool-list"]}>
      {tools.map((tool, index) => {
        return (
          <div key={index} className={styles["tool-item"]}>
            <span className={["iconfont", tool.icon].join(" ")}></span>
            <span>{tool.toolName}</span>
          </div>
        );
      })}
    </div>
  );
}
