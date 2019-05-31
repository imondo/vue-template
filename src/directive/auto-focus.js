export default {
  bind(el, binding) {
    const { value } = binding;
    if (value) {
      setTimeout(() => {
        const $input = el.querySelectorAll('input')[0];
        $input ? $input.focus() : el.focus();
      }, 150);
    }
  },
  update(el, binding) {
    const { value } = binding;
    if (value) {
      setTimeout(() => {
        const $input = el.querySelectorAll('input')[0];
        $input ? $input.focus() : el.focus();
      }, 150);
    }
  }
};
