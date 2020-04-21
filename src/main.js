import Vue from 'vue'
import App from './App.vue'
import router from './router'
import kit from "./plugins/kit";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(kit);

const DEFAULT_TITLE = 'CoronaMap';
router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

Vue.prototype.$eventHub = new Vue();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')