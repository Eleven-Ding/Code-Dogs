// 小窗口的宽度
export const FRAME_WINDOW_WIDTH = 600;

// 小窗口的高度
export const FRAME_WINDOW_HEIGHT = 400;

export function openLoginWindow(url: string, name: string) {
  // 1. 计算当前窗口的长度
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  // 2. 根据宽度计算位置
  const left = (currentWidth - FRAME_WINDOW_WIDTH) / 2;
  const top = (currentHeight - FRAME_WINDOW_HEIGHT) / 2;

  const params = `left=${left}, top=${top},width=${FRAME_WINDOW_WIDTH},height=${FRAME_WINDOW_HEIGHT}`;

  return window.open(url, name, params);
}
