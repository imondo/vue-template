import { defineComponent } from 'vue';
// import Icon from '@/components/Icon/Icon.jsx';

export default defineComponent({
  setup() {
    return () => (
      <header class="app-header">
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
