import Vue from 'vue'
import Router from 'vue-router'

const ServerError = () =>
    import ('./views/ServerError.vue');
const NotFound = () =>
    import ('./views/NotFound.vue');
const Home = () =>
    import ('./views/Home.vue');
const News = () =>
    import ('./views/News.vue');

// to avoid NavigationDuplicated
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/error-server',
            name: 'ServerError',
            components: {
                default: ServerError,
            },
        },
        {
            path: '/not-found',
            name: 'NotFound',
            components: {
                default: NotFound,
            },
        },
        {
            path: '/',
            name: 'Home',
            components: {
                default: Home,
            },
        },
        {
            path: '/news',
            name: 'News',
            components: {
                default: News,
            },
        },
        { path: '*', redirect: '/not-found' } //default 404
    ],
})

export default router