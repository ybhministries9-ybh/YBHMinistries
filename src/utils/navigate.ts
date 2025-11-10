export function navigate(path: string) {
  const event = new CustomEvent('navigate', { detail: { path } });
  window.dispatchEvent(event);
}
