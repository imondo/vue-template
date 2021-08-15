import { ref, watchEffect, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ElMenu, ElMenuItem } from 'element-plus';
import Submenu from './Submenu.vue';
import Logo from '../Header/Logo';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    menu: Array
  },
  setup(props) {
    const route = useRoute();
    const selectKeys = ref('');
    const { getters } = useStore();

    watchEffect(() => {
      selectKeys.value = route.path;
    });

    return () => (
      <div class={`app-sidebar ${getters.collapsed ? 'app-sidebar-hide' : ''}`}>
        <Logo collapse={getters.collapsed} />
        <div class="sidebar">
          <ElMenu
            router={true}
            defaultActive={selectKeys.value}
            collapse={getters.collapsed}
            backgroundColor="#304156"
            class="sidebar-menu"
          >
            {() =>
              props.menu.map(item => {
                if (!item.children || !item.children.length) {
                  return (
                    <ElMenuItem index={item.path}>
                      <div class="inline">
                        {item.icon && <i class={item.icon}></i>}
                        <span>{item.name}</span>
                      </div>
                    </ElMenuItem>
                  );
                } else {
                  return <Submenu menuInfo={item} key={item.path} />;
                }
              })
            }
          </ElMenu>
        </div>
      </div>
    );
  }
});
