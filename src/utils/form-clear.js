// 清除表单内容
export default function(name = 'formRef') {
  return new Promise(resolve => {
    this.$nextTick(() => {
      if (this.$refs[name]) {
        this.$refs[name].resetFields()
      }
      resolve()
    })
  })
}
