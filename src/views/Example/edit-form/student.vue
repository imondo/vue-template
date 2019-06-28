<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="85px">
    <el-form-item label="班级：" prop="class">
      <el-input v-model="form.class" placeholder="请输入班级"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'StudentForm',
  data() {
    return {
      form: {
        class: ''
      },
      rules: {
        class: [
          { required: true, message: '请输入班级', trigger: ['change', 'blur'] }
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
