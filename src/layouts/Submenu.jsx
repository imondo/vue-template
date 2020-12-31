import { defineComponent } from 'vue';
import { Menu } from 'ant-design-vue';

export default defineComponent({
  props: {
    menuInfo: Object
  },
  render(props) {
    return (
      <Menu.SubMenu
        key={props.menuInfo.key}
        v-bind={this.$attrs}
        title={() => (
          <span>
            <span>{props.menuInfo.name}</span>
          </span>
        )}
      >
        {() =>
          props.menuInfo.children.map(item => {
            if (!item.children) {
              return (
                <Menu.Item key={item.key}>
                  <span>{item.name}</span>
                </Menu.Item>
              );
            } else {
              return <SubMenu menuInfo={item} key={item.key} />;
            }
          })
        }
      </Menu.SubMenu>
    );
  }
});
