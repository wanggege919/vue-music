import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' //vuex自带的日志插件，用于调试
Vue.use(Vuex)

//检测工具，可以检测我们的操作是否正确，比如state是通过mutations修改，直接修改会报错
const debug = process.env.NODE_ENV !== 'production' //开发环境


export default new Vuex.Store({
   actions,
   getters,
   state,
   mutations,
   strict: debug,//只在开发环境下开启严格模式，不要在发布环境下启用严格模式！
   plugins: debug ? [createLogger()] : []
})



