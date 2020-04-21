export default {
    install(Vue) {
        var common = {
            getScreenSize() {
                var windowWidth = window.innerWidth;

                if (windowWidth < 576) return "xs";
                else if (windowWidth < 768) return "sm";
                else if (windowWidth < 992) return "md";
                else if (windowWidth < 1200) return "lg"
                else return "xl";
            },
            sleep(milliseconds) {
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            },
            formatNumber(number) {
                if (!number) return "-";
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            },
        }

        Vue.prototype.$common = common;
    }
}