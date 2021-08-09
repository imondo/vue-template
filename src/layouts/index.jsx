import { defineComponent, Transition } from 'vue';
import { RouterView } from 'vue-router';
import Header from './Header.jsx';
import Siderbar from './Sidebar.jsx';
import config from '../config';
import './index.less';

export default defineComponent({
  setup() {
    const slots = {
      default: ({ Component }) => (
        <Transition name="fade-transform" mode="out-in">
          <Component />
        </Transition>
      )
    };
    return () => (
      <div class="app-box">
        <Siderbar menu={config.routes} />
        <section class="app-main">
          <Header />
          <main class="app-container">
            <RouterView v-slots={slots}></RouterView>
          </main>
        </section>
      </div>
    );
  }
});
