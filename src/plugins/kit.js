//import "@fortawesome/fontawesome-free/css/all.css";
import router from '../router';
import "@/assets/scss/all.scss";
import globalComponents from "./globalComponents";
import API from "@/plugins/api";
import common from "@/plugins/common";
import VueMoment from 'vue-moment';
import moment from 'moment';
import VueCookies from 'vue-cookies';
import VueProgressBar from 'vue-progressbar'
import VueAnalytics from 'vue-analytics'
import vueCountryRegionSelect from 'vue-country-region-select'
import * as VueGoogleMaps from 'vue2-google-maps'



//import lineClamp from "vue-line-clamp";

export default {
    install(Vue) {
        Vue.use(globalComponents);
        Vue.use(API);
        Vue.use(common);
        Vue.use(VueMoment, { moment });
        Vue.prototype.$moment.locale("fr");
        Vue.use(VueCookies);
        Vue.use(vueCountryRegionSelect);
        Vue.use(VueProgressBar, {
            color: '#4ca746',
        });
        Vue.use(VueAnalytics, {
            id: '226096558',
            router
        });
        Vue.use(VueGoogleMaps, {
            load: {
                key: 'AIzaSyAYrnVqatqvZVuRYHeLoRtYXu42j_zNsNs',
                //libraries: 'places', // This is required if you use the Autocomplete plugin
                // OR: libraries: 'places,drawing'
                // OR: libraries: 'places,drawing,visualization'
                // (as you require)

                //// If you want to set the version, you can do so:
                // v: '3.26',
            },
        });
        //Vue.use(lineClamp);
    }
};