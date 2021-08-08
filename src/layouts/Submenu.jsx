import { defineComponent } from 'vue';
import { ElSubmenu, ElMenuItem } from 'element-plus';

export default defineComponent({
  name: 'Submenu',
  props: {
    menuInfo: Object
  },
  render(props) {
    return (
      <ElSubmenu index={props.menuInfo.key} title={props.menuInfo.name}>
        {props.menuInfo.children.map(item => {
          if (item.children) {
            return <Submenu menuInfo={item} key={item.key} />;
          }
          return (
            <ElMenuItem key={item.key}>
              <span>{item.name}</span>
            </ElMenuItem>
          );
        })}
      </ElSubmenu>
    );
  }
});
