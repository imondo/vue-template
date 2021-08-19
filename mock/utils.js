export function getUuid() {
  let uuid = '';
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16);
    uuid += n;
    if (i == 8 || i == 12 || i == 16 || i == 20) uuid += '-';
  }
  return uuid;
}

export function genResponse(code, data, msg) {
  return { code, data, msg };
}
