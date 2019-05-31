/**
 * 重置表单
 * @param {string} formName 表单ref
 */
export function restForm(formName) {
  return new Promise(resolve => {
    if (this.$refs[formName]) {
      this.$refs[formName].resetFields();
      resolve();
    } else {
      resolve();
    }
  });
}

/**
 * 验证表单
 * @param {string} formName 表单ref
 * @param {function} callback 验证通过回调
 * @param {function} errBack 验证错误回调
 */
export function validateForm(
  formName,
  callback = () => {},
  errBack = () => {}
) {
  if (!this.$refs[formName]) return;
  this.$refs[formName].validate(valid => {
    if (valid) {
      callback();
    } else {
      errBack();
    }
  });
}

/**
 * 异步验证表单
 * @param {string} formName 表单ref
 * @param {function} callback 验证通过回调
 * @param {function} errBack 验证错误回调
 */
export function validatePromiseForm(formName) {
  if (!this.$refs[formName]) return;
  return new Promise(resolve => {
    this.$refs[formName].validate(valid => {
      resolve(valid);
    });
  });
}
