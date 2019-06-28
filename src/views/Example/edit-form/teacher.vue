<template>
  <el-form ref="form" :model="form" label-width="85px">
    <el-form-item label="年龄：" prop="age">
      <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'TeacherForm',
  data() {
    return {
      form: {
        age: ''
      },
      rules: {
        age: [
          { required: true, message: '请输入年龄', trigger: ['change', 'blur'] }
        ]
      }
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    getData() {
      return this.form;
    },
    resetForm() {
      return this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
