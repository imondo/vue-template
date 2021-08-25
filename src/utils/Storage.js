class Storage {
  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }

    return Storage.instance;
  }

  set(key, value) {
    const _val = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, _val);
  }

  get(key) {
    const str = localStorage.getItem(key);
    try {
      var _val = JSON.parse(str);
      return _val;
    } catch (e) {
      return str;
    }
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export const local = Storage.getInstance;

export default {
  install(app) {
    app.provide('storage', Storage.getInstance());
  }
};
