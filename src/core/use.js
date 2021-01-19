import Vue from 'vue'
import verify from '@/utils/verify'
import request from '@/utils/request'
import formClear from '@/utils/form-clear'
import directive from './directive'
import SComponents from '@/components'

Vue.use(SComponents)

Vue.prototype.$verify = verify
Vue.prototype.$axios = request
Vue.prototype.$formClear = formClear

Object.entries(directive).map(([key, value]) => Vue.directive(key, value))
