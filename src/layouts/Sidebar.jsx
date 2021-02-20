import { ref, watchEffect, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Menu } from 'ant-design-vue';
import Submenu from './Submenu.vue';
import Icon from '@/components/Icon/Icon.jsx';
import logoImage from '../assets/logo.png';

export default defineComponent({
  props: {
    menu: Array
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const selectKeys = ref([]);
    const onSelectItem = ({ key }) => {
      const _name = router.hasRoute(key) ? key : 'NotFound';
      router.push({ name: _name });
    };

    watchEffect(() => {
      selectKeys.value = [route.name];
    });

    return {
      onSelectItem,
      selectKeys,
      collapsed: false
    };
  },
  render(props) {
    const { onSelectItem, selectKeys, collapsed } = this;
    return (
      <div class="app-sidebar">
        <div class="logo">
          <img class="logo-img" src='https://imondo.cn/files/logo.png' alt="logo" />
          <h1 class="logo-title">vue3-admin-template</h1>
        </div>
        <div class="sidebar">
          <Menu
            selected-keys={selectKeys}
            inline-collapsed={collapsed}
            mode="inline"
            theme="dark"
            class="sidebar-menu"
            onSelect={onSelectItem}
          >
            {() =>
              props.menu.map(item => {
                if (!item.children) {
                  return (
                    <Menu.Item key={item.key}>
                      <div class="inline">
                        <Icon class="sidebar-icon" type={item?.icon} />
                        <span>{item.name}</span>
                      </div>
                    </Menu.Item>
                  );
                } else {
                  return <Submenu menu-info={item} key={item.key} />;
                }
              })
            }
          </Menu>
        </div>
      </div>
    );
  }
});
