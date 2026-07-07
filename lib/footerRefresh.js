export function refreshFooterScroll() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("rmw:footer-refresh"));
}
