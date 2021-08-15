import Hamburger from './Hamburger';
import Breadcrumb from './Breadcrumb';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const { dispatch, getters } = useStore();
    return () => (
      <header class="app-header">
        <Hamburger
          is-active={getters.collapsed}
          onClick={() => {
            dispatch('SetCollapsed');
          }}
        />
        <Breadcrumb />
        <div class="app-header-right">
          {/* <Icon
            type="icongithub"
            size={24}
            color="#46b980"
            url="https://github.com/one-pupil/vue-template/tree/vue3-admin-template"
          /> */}
        </div>
      </header>
    );
  }
});
