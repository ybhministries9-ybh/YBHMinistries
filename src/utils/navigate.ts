import { showPageLoader } from './pageLoader';

export function navigate(path: string) {
  // Show a global loading overlay immediately when navigation is triggered.
  try {
    showPageLoader();
    // Perform navigation. Use href to keep behavior predictable.
    window.location.href = path;
  } catch (e) {
    // If window isn't available (e.g., during SSR) do nothing.
  }
}
