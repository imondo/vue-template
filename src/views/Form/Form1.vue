<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <el-form-item ref="name" label="学校名称" name="name">
      <el-input v-model:value="form.name" placeholder="学校名称" />
    </el-form-item>
    <el-form-item label="学校地址" name="region">
      <el-select v-model:value="form.region" placeholder="学校地址">
        <el-select-option value="shanghai"> 上海 </el-select-option>
        <el-select-option value="beijing"> 北京 </el-select-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      form: {
        name: '',
        region: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '学校名称',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: '学校地址',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    async onSubmit() {
      return this.$refs.form
        .validate()
        .then(() => this.form)
        .catch(error => {
          console.log('error', error);
        });
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
