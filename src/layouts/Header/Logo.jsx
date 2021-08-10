import { defineComponent, Transition } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const title = '后台管理系统';

    const colLink = () => (
      <RouterLink key="collapse" class="sidebar-logo-link" to="/">
        <img src="https://imondo.cn/files/logo.png" class="sidebar-logo" />
      </RouterLink>
    );

    const link = () => (
      <RouterLink key="expand" class="sidebar-logo-link" to="/">
        <img src="https://imondo.cn/files/logo.png" class="sidebar-logo" />
        <h1 class="sidebar-title">{title}</h1>
      </RouterLink>
    );
    return () => (
      <div class={`sidebar-logo-container ${props.collapse ? 'collapse' : ''}`}>
        <Transition name="sidebarLogoFade">
          {props.collapse ? colLink() : link()}
        </Transition>
      </div>
    );
  }
});
