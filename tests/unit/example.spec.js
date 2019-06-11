import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('他的meta', () => {
    const $route = {
      meta: {
        title: 'new message'
      }
    };
    const wrapper = shallowMount(Home, {
      mocks: {
        $route
      }
    });
    expect(wrapper.text()).toMatch($route.meta.title);
  });
});
