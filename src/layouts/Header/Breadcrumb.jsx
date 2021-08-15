import { defineComponent, ref, watch, watchEffect } from 'vue';
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';
import { useRoute } from 'vue-router';
import { useMenu } from '@/hooks/useMenu';

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute();
    const { menu } = useMenu();
    const routeMatch = ref([]);
    watchEffect(() => {
      routeMatch.value = [];
      routeMatch.value = getPath(route.path, menu);
    });
    return () => (
      <ElBreadcrumb class="breadcrumb-wap">
        {routeMatch.value.map(v => {
          return (
            <ElBreadcrumbItem to={{ name: v.key }}>{v.name}</ElBreadcrumbItem>
          );
        })}
      </ElBreadcrumb>
    );
  }
});

function getPath(name, arr) {
  const parse = (arr, func, path = []) => {
    for (const item of arr) {
      path.push(item);
      if (func(item)) {
        return path;
      }
      if (item.children) {
        const child = parse(item.children, func, path);
        if (child.length) {
          return child;
        }
      }
      path.pop();
    }
    return [];
  };
  return parse(arr, item => item.path === name);
}
