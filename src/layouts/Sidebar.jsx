import { ref, watchEffect, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMenu, ElMenuItem } from 'element-plus';
import Submenu from './Submenu.vue';
import { useStore } from 'vuex';
// import Icon from '@/components/Icon/Icon.jsx';
// import logoImage from '../assets/logo.png';

export default defineComponent({
  props: {
    menu: Array
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const selectKeys = ref('');
    const { state } = useStore();
    const onSelectItem = ({ key }) => {
      const _name = router.hasRoute(key) ? key : 'NotFound';
      router.push({ name: _name });
    };

    watchEffect(() => {
      selectKeys.value = route.name;
    });

    return () => (
      <div class="app-sidebar">
        <div class="logo">
          <img
            class="logo-img"
            src="https://imondo.cn/files/logo.png"
            alt="logo"
          />
          <h1 class="logo-title">vue3-admin-ElementUI</h1>
        </div>
        <div class="sidebar">
          <ElMenu
            router={true}
            defaultActive={selectKeys}
            collapse={state.collapsed}
            backgroundColor="#304156"
            class="sidebar-menu"
          >
            {() =>
              props.menu.map(item => {
                if (!item.children) {
                  return (
                    <ElMenuItem index={item.key} route={{ name: item.key }}>
                      <div class="inline">
                        {item.icon && <i class={item.icon}></i>}
                        <span>{item.name}</span>
                      </div>
                    </ElMenuItem>
                  );
                } else {
                  return <Submenu menuInfo={item} key={item.key} />;
                }
              })
            }
          </ElMenu>
        </div>
      </div>
    );
  }
});
