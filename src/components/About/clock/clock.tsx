import React, { useEffect, createRef } from "react";
import styles from "./clock.module.scss";
export function Clock() {
  const hrRef = createRef<HTMLDivElement>();
  const mnRef = createRef<HTMLDivElement>();
  const scRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let i = sec;
    const timer = setInterval(() => {
      hour = date.getHours();
      if (hrRef.current && mnRef.current && scRef.current) {
        hrRef.current.style.transform = `rotateZ(${hour * 30 + min / 2}deg)`;
        mnRef.current.style.transform = `rotateZ(${min * 6}deg)`;
        scRef.current.style.transform = `rotateZ(${sec * 6}deg)`;
        i++;
        min = min + parseInt(i / 60 + "");
        sec++;
        if (i === 60) i = 0;
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles["clock-container"]}>
      <div className={styles["hour"]}>
        <div ref={hrRef} className={styles["hr"]}></div>
      </div>
      <div className={styles["min"]}>
        <div ref={mnRef} className={styles["mn"]}></div>
      </div>

      <div className={styles["sec"]}>
        <div ref={scRef} className={styles["sc"]}></div>
      </div>
    </div>
  );
}
