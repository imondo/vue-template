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

export default function loadScript (url) {
  const target = document.getElementsByTagName('script')[0] || document.head

  const script = document.createElement('script')
  script.src = url
  target.parentNode.insertBefore(script, target)

  return new Promise((resolve, reject) => {
    script.onload = function () {
      resolve()
      cleanup(script)
    }
    script.onerror = function () {
      reject(new Error('script load failed'))
      cleanup(script)
    }
  })
}

function cleanup (script) {
  if (script.parentNode) script.parentNode.removeChild(script)
  script.onload = null
  script.onerror = null
  script = null
}
