import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Header from './Header.jsx';
import Siderbar from './Sidebar.jsx';
import config from '../config';
import './index.less';

export default defineComponent({
  setup() {
    return () => (
      <div class="app-box">
        <Siderbar menu={config.routes} />
        <section class="app-main">
          <Header />
          <main class="app-container">
            <RouterView />
          </main>
        </section>
      </div>
    );
  }
});
