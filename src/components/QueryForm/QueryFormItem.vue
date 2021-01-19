<template>
  <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
    <el-form-item :label="label">
      <slot></slot>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  name: 'QueryFormItem',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
