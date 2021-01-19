const local = window.localStorage

export default {
  getItem(key) {
    try {
      return JSON.parse(local.getItem(key))
    } catch (error) {
      return null
    }
  },
  setItem(key, val) {
    local.setItem(key, JSON.stringify(val))
  },
  removeItem(key) {
    local.removeItem(key)
  },
  clear() {
    local.clear()
  },
  keys() {
    return Object.keys(local)
  }
}
