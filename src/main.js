// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill";

import { Button, 
  Row,
  Col,
  Table,
  TableColumn} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
