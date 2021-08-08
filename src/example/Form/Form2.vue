<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="110px">
    <el-form-item ref="name" label="学生名称：" prop="name">
      <el-input v-model="form.name" placeholder="学生名称" />
    </el-form-item>
    <el-form-item label="学生地址：" prop="region">
      <el-select v-model="form.region" placeholder="学生地址">
        <el-option value="shanghai"> 上海 </el-option>
        <el-option value="beijing"> 北京 </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期" required prop="date1">
      <el-date-picker
        v-model="form.date1"
        type="date"
        placeholder="出生日期"
        style="width: 100%"
      />
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
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
