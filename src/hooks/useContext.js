import { getCurrentInstance, inject } from 'vue';

export default function useContext() {
  const { proxy: vm } = getCurrentInstance();
  const storage = inject('storage');
  const message = inject('message');
  return { vm, storage, message };
}
