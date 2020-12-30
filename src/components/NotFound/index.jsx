import { defineComponent, getCurrentInstance } from 'vue';
import { Result, Button } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance();
    return () => (
      <Result
        status="404"
        title="404"
        sub-title="Sorry, the page you visited does not exist."
        extra={() => (
          <Button type="primary" onClick={() => ctx.$router.push('/')}>
            {() => <span>Back Home</span>}
          </Button>
        )}
      />
    );
  }
});
