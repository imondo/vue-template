import { defineComponent, Transition } from 'vue';
import { RouterView } from 'vue-router';
import Header from './Header/Header.jsx';
import Siderbar from './Sidebar/Sidebar';
import './index.less';
import { useMenu } from '@/hooks/useMenu';

export default defineComponent({
  setup() {
    const slots = {
      default: ({ Component }) => (
        <Transition name="fade-transform" mode="out-in">
          <Component />
        </Transition>
      )
    };

    const { menu } = useMenu();
    return () => (
      <div class="app-box">
        <Siderbar menu={menu} />
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
