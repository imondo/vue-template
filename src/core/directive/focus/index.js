// 获取焦点
export default {
  inserted(el) {
    el.querySelector('input:not([readonly]),textarea:not([readonly]').focus()
  },
  update(el, binding) {
    const { value, oldValue } = binding
    if (value !== oldValue) {
      el.querySelector('input:not([readonly]),textarea:not([readonly]').focus()
    }
  }
}
