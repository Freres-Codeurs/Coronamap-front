import HBar from "../components/HBar";
import CustomMap from "../components/CustomMap";
import NewsComponent from "../components/NewsComponent";

export default {
    install(Vue) {
        Vue.component(HBar.name, HBar);
        Vue.component(CustomMap.name, CustomMap);
        Vue.component(NewsComponent.name, NewsComponent);
    }
};