export function parseWidth(width) {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return width;
}

export function parseMinWidth(minWidth) {
  if (typeof minWidth !== 'undefined') {
    minWidth = parseWidth(minWidth);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
}

export function parseHeight(height) {
  if (typeof height === 'number') {
    return height;
  }
  if (typeof height === 'string') {
    if (/^\d+(?:px)?$/.test(height)) {
      return parseInt(height, 10);
    } else {
      return height;
    }
  }
  return null;
}
