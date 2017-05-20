// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import statement from '../src/components/play'
import  rxUtils from '../src/assets/js/rxUtils'
rxUtils.setRem(15);
Vue.use(VueResource);
new Vue({
  el: '#app',
  components: { statement }
})

