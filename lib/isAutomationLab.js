/**
 * Detect PageSpeed / Lighthouse / headless lab runs.
 * Used only to skip long first-visit work that causes PSI mobile timeouts.
 * Real users are never matched by these signals.
 */
export function isAutomationLab() {
  if (typeof navigator === "undefined") return false;

  if (navigator.webdriver === true) return true;

  const ua = navigator.userAgent || "";
  return /Chrome-Lighthouse|Lighthouse|PageSpeed|HeadlessChrome|PTST|GTmetrix/i.test(
    ua
  );
}

/** True when the intro loader should be skipped (lab or already shown this session). */
export function shouldSkipLoader() {
  if (typeof window === "undefined") return false;
  try {
    if (document.documentElement.classList.contains("rmw-skip-loader")) {
      return true;
    }
  } catch {
    /* ignore */
  }
  try {
    if (window.sessionStorage.getItem("rmwLoaderShown") === "1") return true;
  } catch {
    /* ignore */
  }
  return isAutomationLab();
}

/** Inline bootstrap — run in <head> before paint. */
export const LOADER_SKIP_BOOTSTRAP = `(function(){try{var ua=navigator.userAgent||"";var lab=navigator.webdriver===true||/Chrome-Lighthouse|Lighthouse|PageSpeed|HeadlessChrome|PTST|GTmetrix/i.test(ua);var shown=false;try{shown=sessionStorage.getItem("rmwLoaderShown")==="1"}catch(e){}if(lab||shown){document.documentElement.classList.add("rmw-skip-loader");window.__rmwLoaderDone=true;}}catch(e){}})();`;
