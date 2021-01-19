import QueryForm from './QueryForm'
import QueryFormItem from './QueryForm/QueryFormItem'

const components = {
  QueryForm,
  QueryFormItem
}

export default {
  install(Vue) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key])
    })
  }
}
