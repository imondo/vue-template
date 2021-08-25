<template>
  <el-dialog
    v-model="visible"
    :title="title"
    v-bind="$attrs"
    custom-class="modal-dialog"
  >
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="showCancelBtn" @click="onCancel">{{
          cancelBtnLabel
        }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          confirmBtnLabel
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'BaseModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnLabel: {
      type: String,
      default: '取 消'
    },
    confirmBtnLabel: {
      type: String,
      default: '确认'
    }
  },
  emits: ['show'],
  setup(props, { emit }) {
    const visible = computed({
      get() {
        return props.show;
      },
      set(val) {
        emit('update:show', val);
      }
    });
    const onCancel = () => {
      emit('update:show', false);
    };

    const onConfirm = () => {
      emit('confirm');
    };
    return {
      visible,
      onCancel,
      onConfirm
    };
  }
};
</script>

<style lang="less">
.modal-dialog {
  .el-dialog__header {
    padding-bottom: 10px;
    background: #f4f4f5;
  }
}
</style>
