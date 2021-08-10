import { defineComponent } from 'vue';
import Hamburger from './Hamburger';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const { dispatch, state } = useStore();
    return () => (
      <header class="app-header">
        <Hamburger
          is-active={state.collapsed}
          onClick={() => {
            dispatch('SetCollapsed');
          }}
        />
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
