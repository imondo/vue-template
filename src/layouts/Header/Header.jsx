import Hamburger from './Hamburger';
import Breadcrumb from './Breadcrumb';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useContext } from '@/hooks/useContext';

export default defineComponent({
  setup() {
    const { dispatch, getters } = useStore();
    const vm = useContext();
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
            class="right-icon"
            href="https://github.com/one-pupil/vue-template/tree/vue3-admin-template"
            target="_blank"
          >
            <i class="fab fa-github"></i>
          </a>
          <i
            class="fas fa-sign-out-alt right-icon"
            onClick={() => {
              vm.$message.confirm('确认退出？', () => {
                dispatch('user/Logout');
              });
            }}
          ></i>
        </div>
      </header>
    );
  }
});
