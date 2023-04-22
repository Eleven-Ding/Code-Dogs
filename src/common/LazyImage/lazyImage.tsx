/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { Loading } from "../Loading";
export type LoadingSize = "small" | "medium" | "large";

export type LazyImageProps = {
  src: string;
  alt: string;
  lazy?: boolean;
  loadingSize?: LoadingSize; // loading 的大小
  onError?: () => void;
  onLoad?: () => void;
  style?: Record<string, any>;
};

export function LazyImage({
  src,
  alt,
  lazy = false,
  onError,
  onLoad,
  loadingSize,
  ...props
}: LazyImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isScrollInScreen, setIsScrollInScreen] = useState(false);

  useEffect(() => {
    if (lazy && window["IntersectionObserver"]) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            intersectionObserver.unobserve(imageRef.current!);
            setIsScrollInScreen(true);
          }
        });
      });
      intersectionObserver.observe(imageRef.current!);
    }
    // TODO: 如果 IntersectionObserver 不存在，那么监听一下 scroll 吧，全局的 scroll 做一个降级适配
  }, [lazy]);

  const handleImageLoad = () => {
    setLoaded(true);
    onLoad && onLoad();
  };

  const handleImageError = () => {
    setLoaded(true);
    // 不做兜底展示，这里把错误事件抛出去，让外部自己做特判
    onError && onError();
  };

  //   如果不需要 lazy 的图片，那么直接返回 img 就好了
  if (!lazy) {
    return <img src={src} alt={alt} {...props} />;
  }
  return (
    <>
      {/* 在元素滚动到屏幕内时，才进行加载 */}
      {isScrollInScreen && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            visibility: loaded ? "initial" : "hidden",
          }}
          {...props}
        />
      )}
      {/* NOTE: 这里需要判断改组件进入了屏幕，但是又不想写在 img 上，所以用一个 span 标签 hack 一下 😁*/}
      <span ref={imageRef}></span>
      <Loading show={!loaded} size={loadingSize} />
    </>
  );
}
