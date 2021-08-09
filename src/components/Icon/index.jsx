import { defineComponent, unref } from 'vue';
import { ElIcon } from 'element-plus';

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    size: {
      type: [String, Number],
      default: 14
    },
    url: {
      type: String,
      default: ''
    }
  },
  async setup(props) {
    const style = {
      fontSize: typeof props.size === 'string' ? props.size : `${props.size}px`,
      color: props.color,
      display: 'inline-block'
    };
    if (props.url) {
      style.cursor = 'pointer';
    }
    const onTarget = () => {
      if (props.url) {
        window.open(props.url);
      }
    };
    // const icons = await import('@element-plus/icons');

    // const icon = icons.Module[props.type]
    return () => <ElIcon style={unref(style)}></ElIcon>;
  }
});
