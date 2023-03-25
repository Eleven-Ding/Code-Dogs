import { RouteItem } from "@/config/router";
import { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { changeCurrentTab } from "@/store/head";

import styles from "./menu.module.scss";

export default function Menu({ routes = [] }: { routes: RouteItem[] }) {
  const dispatch = useDispatch();

  const currentPage = useSelector(
    (state: RootState) => state.header.currentTab
  );

  useEffect(() => {
    const location = window.location;
    dispatch(changeCurrentTab(location.pathname ?? "/"));
  }, [dispatch]);

  return (
    <div className={styles["route-menu"]}>
      {routes.map((route) => {
        return (
          <span
            onClick={() => {
              dispatch(changeCurrentTab(route.link));
            }}
            key={route.name}
            className={currentPage === route.link ? styles["active-menu"] : ""}
          >
            <Link href={route.link}>
              <i className={["iconfont", route.icon].join(" ")}></i>
              {route.text}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
