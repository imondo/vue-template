import Hamburger from './Hamburger';
import Breadcrumb from './Breadcrumb';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import useContext from '@/hooks/useContext';
import {
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus';

export default defineComponent({
  setup() {
    const { dispatch, getters } = useStore();
    const { message } = useContext();

    const slots = {
      dropdown: () => (
        <ElDropdownMenu>
          <ElDropdownItem>
            <i class="fas fa-user right-icon"></i>个人中心
          </ElDropdownItem>
          <ElDropdownItem
            divided={true}
            onClick={() => {
              message.confirm('确认退出？', () => {
                dispatch('user/Logout');
              });
            }}
          >
            <i class="fas fa-sign-out-alt right-icon"></i> 退出
          </ElDropdownItem>
        </ElDropdownMenu>
      )
    };
    return () => (
      <header class="app-header">
        <Hamburger
          is-active={getters.collapsed}
          onClick={() => {
            dispatch('app/SetCollapsed');
          }}
        />
        <Breadcrumb />
        <div class="app-header-right">
          <a
            class="header-right-item right-icon"
            href="https://github.com/one-pupil/vue-template/tree/vue3-admin-template"
            target="_blank"
          >
            <i class="fab fa-github"></i>
          </a>
          <ElDropdown class="header-right-item" v-slots={slots}>
            <ElAvatar
              class="right-user"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            {getters.user && (
              <span class="header-user">{getters.user.username}</span>
            )}
          </ElDropdown>
        </div>
      </header>
    );
  }
});
