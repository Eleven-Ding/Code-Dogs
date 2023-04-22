import styles from "./loading.module.scss";
import { LoadingSize } from "../LazyImage/lazyImage";
export type LoadingProps = {
  show: boolean;
  size?: LoadingSize;
};
export function Loading({ show, size = "medium" }: LoadingProps) {
  if (!show) {
    return null;
  }
  return <div className={[styles[size], styles["loading"]].join(" ")}></div>;
}
