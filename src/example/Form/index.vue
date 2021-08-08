<template>
  <LayoutCard>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="110px">
      <el-form-item label="人员类型：">
        <el-select v-model="form.type" placeholder="请选择人员类型">
          <el-option
            v-for="{ name, value } in types"
            :key="value"
            :label="name"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item ref="name" label="登记人名称：" prop="name">
        <el-input v-model="form.name" placeholder="登记人名称" />
      </el-form-item>
      <Form1 ref="Form1" v-if="form.type === 1" />
      <Form2 ref="Form2" v-if="form.type === 2" />
      <el-form-item>
        <el-button type="primary" @click="onSubmitForm"> 提交 </el-button>
        <el-button style="margin-left: 10px" @click="resetForm">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-card title="提交数据" style="width: 300px">
      {{ sumbitData }}
    </el-card>
  </LayoutCard>
</template>
<script>
import Form1 from './Form1.vue';
import Form2 from './Form2.vue';
export default {
  components: {
    Form1,
    Form2
  },
  data() {
    return {
      other: '',
      form: {
        name: '',
        type: 1
      },
      sumbitData: null,
      types: [
        { name: '学生', value: 1 },
        { name: '学校', value: 2 }
      ],
      rules: {
        name: [
          {
            required: true,
            message: '登记人名称',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    onSubmitForm() {
      const form1 = this.useValidateForm(this.form.type).onSubmit();
      console.log(form1);
      const form = this.$refs.ruleForm
        .validate()
        .then(() => this.form)
        .catch(error => {
          console.log('error', error);
        });
      Promise.all([form1, form]).then(res => {
        this.sumbitData = JSON.parse(JSON.stringify(res));
      });
    },
    useValidateForm(type) {
      const formType = {
        1: 'Form1',
        2: 'Form2'
      };
      return this.$refs[formType[type]];
    },
    resetForm() {
      const form = this.useValidateForm(this.form.type);
      this.$refs.ruleForm.resetFields();
      form.resetForm();
    }
  }
};
</script>
