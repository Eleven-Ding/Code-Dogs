import { ToolList } from "@/components/Tools/ToolList/toolList";
import CommonHead from "@/components/Head/head";
export default function Tools() {
  return (
    <div>
      <CommonHead title="WebComponent 工具集合" content="基于 WebComponent 的前端工具集合、Next、Node、React、WebComponent"/>
      <ToolList />
    </div>
  );
}
