<template>
  <a-form
    ref="form"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="学校名称" name="name">
      <a-input v-model:value="form.name" placeholder="学校名称" />
    </a-form-item>
    <a-form-item label="学校地址" name="region">
      <a-select v-model:value="form.region" placeholder="学校地址">
        <a-select-option value="shanghai"> 上海 </a-select-option>
        <a-select-option value="beijing"> 北京 </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
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
