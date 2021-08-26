export default function loadScript(src) {
  return new Promise(resolve => {
    const existingScript = document.getElementById(src);
    if (existingScript) {
      resolve();
      return;
    }
    const node = document.createElement('script');
    node.setAttribute('type', 'text/javascript');
    node.onload = function () {
      resolve();
    };
    node.src = src;
    node.id = src;
    document.head.appendChild(node);
  });
}

export function createStyles(src) {
  const existingLink = document.getElementById(src);
  if (existingLink) {
    return;
  }
  const node = document.createElement('link');
  node.setAttribute('rel', 'stylesheet');
  node.setAttribute('type', 'text/css');
  node.setAttribute('href', src);
  node.setAttribute('id', src);
  document.head.appendChild(node);
}
