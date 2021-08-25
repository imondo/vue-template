export default function loadScript(src) {
  return new Promise(resolve => {
    const existingScript = document.getElementById(src);
    if (existingScript) {
      resolve();
      return;
    }
    const node = document.createElement('script');
    node.setAttribute('type', 'text/javascript');
    node.src = src;
    node.id = src;
    document.head.appendChild(node);
    node.onload = function () {
      resolve();
    };
  });
}

function hasId(id) {
  return !!document.querySelector(`#${id}`);
}
