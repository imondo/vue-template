/* eslint-disable no-param-reassign */
export default {
  methods: {
    changeType(url, row, query, name = 'status') {
      this.$axios
        .putJson(url, Object.assign({ errorBack: true }, query))
        .then(response => {
          const status = row[name]
          if (!response) {
            this.$message.success({ message: '设置成功' })
          } else {
            this.$message.error({ message: '设置失败，请重试', type: 'error' })
            setTimeout(() => {
              row[name] = [1, 0][status]
            }, 300)
          }
        })
    } // 切换状态
  }
}
