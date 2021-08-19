import { getCurrentInstance } from 'vue';

export function useContext() {
  const { proxy: vm } = getCurrentInstance();
  return vm;
}
