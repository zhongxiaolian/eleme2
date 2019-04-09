import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

// 引入全局的公共基础样式（border-1px的mixin和通过媒体查询不同dpr设备的缩放比）
import 'common/stylus/index.styl';

// 因为axios不是vue的插件，不能直接通过Vue.use全局注册到Vue中。
Vue.prototype.axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
