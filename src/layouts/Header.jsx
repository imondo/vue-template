import { defineComponent } from 'vue';
import Icon from '/@/components/Icon';

export default defineComponent({
  setup() {
    return () => (
      <header class="app-header">
        <div class="app-header-right">
          <Icon
            icon="ant-design:github"
            size={24}
            url="https://github.com/one-pupil/vue-template/tree/vue3-admin-template"
          />
        </div>
      </header>
    );
  }
});
