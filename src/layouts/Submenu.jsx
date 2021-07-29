import { defineComponent } from 'vue';
import { Menu } from 'ant-design-vue';

export default defineComponent({
  name: 'Submenu',
  props: {
    menuInfo: Object
  },
  render(props) {
    return (
      <Menu.SubMenu key={props.menuInfo.key} title={props.menuInfo.name}>
        {props.menuInfo.children.map(item => {
          if (item.children) {
            return <Submenu menuInfo={item} key={item.key} />;
          }
          return (
            <Menu.Item key={item.key}>
              <span>{item.name}</span>
            </Menu.Item>
          );
        })}
      </Menu.SubMenu>
    );
  }
});
