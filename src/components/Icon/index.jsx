import { defineComponent, unref } from 'vue';
import '@iconify/iconify';
import '@purge-icons/generated';

export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    size: {
      type: [String, Number],
      default: 14
    }
  },
  setup(props) {
    const style = {
      fontSize: typeof props.size === 'string' ? props.size : `${props.size}px`,
      color: props.color,
      display: 'inline-block'
    };
    return () => (
      <span class="iconify" data-icon={props.icon} style={unref(style)}></span>
    );
  }
});
