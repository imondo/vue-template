import { defineComponent, getCurrentInstance } from 'vue';
import { Result, Button } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    return () => (
      <Result
        status="404"
        title="404"
        sub-title="页面未找到。"
        extra={
          <Button type="primary" onClick={() => proxy.$router.push('/')}>
            {() => <span>Back Home</span>}
          </Button>
        }
      />
    );
  }
});
