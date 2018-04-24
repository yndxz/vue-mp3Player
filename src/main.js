// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../src/App';
import rxUtils from '../src/assets/js/rxUtils';

rxUtils.setRem(15);
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
});

