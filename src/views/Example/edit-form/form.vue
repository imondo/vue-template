<template>
  <div class="complex-form">
    <el-form ref="form" :model="form" :rules="rules" label-width="85px">
      <el-form-item label="人员类型：">
        <el-select v-model="form.type" placeholder="请选择人员类型">
          <el-option v-for="{ name, value } in types" :key="value" :value="value" :label="name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <StudentForm v-show="form.type === 0" ref="studentRef"/>
      <TeacherForm v-show="form.type === 1" ref="teacherRef"/>
      <el-button type="primary" @click="handleSubmit">同步保存</el-button>
      <el-button type="primary" @click="handleSubmitAsyn">异步保存</el-button>
    </el-form>
    {{ formData }}
  </div>
</template>

<script>
import StudentForm from './student';
import TeacherForm from './teacher';
export default {
  name: 'EditForm',
  components: {
    StudentForm,
    TeacherForm
  },
  data() {
    return {
      form: {
        type: 0
      },
      formData: {},
      types: [{ name: '学生', value: 0 }, { name: '老师', value: 1 }],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: ['change', 'blur'] }
        ]
      }
    };
  },
  computed: {
    typeRef() {
      const refs = ['studentRef', 'teacherRef'][this.form.type];
      return refs;
    }
  },
  methods: {
    // 同步验证
    handleSubmit() {
      const refsValidate = this.$refs[this.typeRef].validate();
      const formValidate = this.$refs.form.validate();
      Promise.all([formValidate, refsValidate])
        .then(valid => {
          const refsForm = this.$refs[this.typeRef].getData();
          console.log(refsForm, this.form);
          this.formData = { ...refsForm, ...this.form };
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 异步父级
    handleSubmitAsyn() {
      this.$refs.form.validate().then(valid => {
        const refsValidate = this.$refs[this.typeRef].validate;
        if (valid) {
          refsValidate().then(res => {
            console.log(res);
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.complex-form {
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;
}
</style>
