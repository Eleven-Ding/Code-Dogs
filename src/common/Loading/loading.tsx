import styles from "./loading.module.scss";
export type LoadingProps = {
  show: boolean;
};
export function Loading({ show }: LoadingProps) {
  if (!show) {
    return null;
  }
  return <div className={styles["loading"]}></div>;
}
