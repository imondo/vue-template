module.exports = {
  dev: process.env.NODE_ENV === 'development',
  debugging: false,
  imgUrl: process.env.VUE_APP_HTTP_API + '/largescale',
  title: '后台管理系统',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the setting in body
   */
  showSettings: true
}
