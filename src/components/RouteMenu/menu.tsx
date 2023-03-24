import { RouteItem } from "@/config/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import styles from "./menu.module.scss";

export default function Menu({ routes = [] }: { routes: RouteItem[] }) {
  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {
    const location = window.location;
    setCurrentPage(location.pathname ?? "/");
  }, []);

  const handleMenuItemClick = useCallback((route: RouteItem) => {
    const { link } = route;
    setCurrentPage(link);
  }, []);

  return (
    <div className={styles["route-menu"]}>
      {routes.map((route) => {
        return (
          <span
            onClick={() => {
              handleMenuItemClick(route);
            }}
            key={route.name}
            className={currentPage === route.link ? styles["active-menu"] : ""}
          >
            <i className={["iconfont", route.icon].join(" ")}></i>
            <Link href={route.link}>{route.text}</Link>
          </span>
        );
      })}
    </div>
  );
}
