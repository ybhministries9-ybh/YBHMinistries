export function navigate(path: string) {
  // Simple client-side navigation helper. Using `window.location` keeps
  // behavior predictable across environments and avoids relying on custom
  // events that other code must listen for.
  try {
    window.location.href = path;
  } catch (e) {
    // If window isn't available (e.g., during SSR) do nothing.
  }
}
