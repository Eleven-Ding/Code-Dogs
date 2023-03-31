let loadingMask: HTMLElement | null = null;
export function startGlobalLoading() {
  if (!loadingMask) {
    // 创建 Mask 元素
    loadingMask = document.createElement("div");
    loadingMask.className = "global-loading-mask";
    // 创建 Loading 元素
    loadingMask.innerHTML = '<div class="global-loading"></div>';
    document.body.append(loadingMask);
  }
  loadingMask.style.display = "block";
  disableScroll();
}

export function closeGlobalLoading() {
  if (!loadingMask) {
    return;
  }
  loadingMask.style.display = "none";
  enableScroll();
}

function disableScroll() {
  document.body.classList.add("disable-scrolling");
}
function enableScroll() {
  document.body.classList.remove("disable-scrolling");
}
