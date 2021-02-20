import { defineComponent, unref } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import './index.less';

export default defineComponent({
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#fff'
    },
    size: {
      type: [String, Number],
      default: 16
    },
    url: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const style = {
      fontSize: typeof props.size === 'string' ? props.size : `${props.size}px`,
      color: props.color
    };
    if (props.url) {
      style.cursor = 'pointer';
    }
    const onTarget = () => {
      if (props.url) {
        window.open(props.url);
      }
    };
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_2378225_dan87vwo2m.js',
      extraCommonProps: { style }
    });
    return () => (
      <IconFont 
        class="svg-icon"
        type={props.type} 
        style={unref(style)} 
        onClick={onTarget} 
      />
    );
  }
});