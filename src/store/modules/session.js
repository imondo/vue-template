const session = window.sessionStorage

export default {
  getItem(key) {
    try {
      return JSON.parse(session.getItem(key))
    } catch (error) {
      return null
    }
  },
  setItem(key, val) {
    session.setItem(key, JSON.stringify(val))
  },
  removeItem(key) {
    session.removeItem(key)
  },
  clear() {
    session.clear()
  },
  keys() {
    return Object.keys(session)
  }
}
