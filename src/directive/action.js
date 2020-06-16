import Vue from 'vue';
/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <el-button v-action:add >添加用户</el-button>
 *    <el-button v-action:delete>删除用户</el-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 */
const action = Vue.directive('action', {
  bind: function(el, binding, vnode) {
    const actionName = binding.arg;
    const elVal = vnode.context.$route.meta.actions || [];
    const permissionId = (elVal instanceof String && [elVal]) || elVal;
    const hasAction = permissionId.find(v => v.key === actionName);
    if (hasAction) {
      // el.innerText = hasAction.title;
      return false;
    } else {
      (el.parentNode && el.parentNode.removeChild(el)) ||
        (el.style.display = 'none');
    }
  }
});

export { action };
