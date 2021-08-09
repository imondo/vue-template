import { defineComponent, Transition } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Header from './Header.jsx';
import Siderbar from './Sidebar.jsx';
import config from '../config';
import './index.less';

export default defineComponent({
  setup() {
    const { path } = useRoute()
    return () => (
      <div class="app-box">
        <Siderbar menu={config.routes} />
        <section class="app-main">
          <Header />

          <main class="app-container">
            <Transition name="el-zoom-in-center">
              <RouterView key={path} />
            </Transition>
          </main>
        </section>
      </div>
    );
  }
});
