<template>
  <a-form
    ref="form"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="学生名称" name="name">
      <a-input v-model:value="form.name" placeholder="学生名称" />
    </a-form-item>
    <a-form-item label="学生地址" name="region">
      <a-select v-model:value="form.region" placeholder="学生地址">
        <a-select-option value="shanghai"> 上海 </a-select-option>
        <a-select-option value="beijing"> 北京 </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="出生日期" required name="date1">
      <a-date-picker
        v-model:value="form.date1"
        show-time
        type="date"
        placeholder="出生日期"
        style="width: 100%"
      />
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
        region: undefined,
        date1: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '学生名称',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: '学生地址',
            trigger: 'change'
          }
        ],
        date1: [
          {
            required: true,
            message: '出生日期',
            trigger: 'change',
            type: 'object'
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
