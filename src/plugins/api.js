import Axios from "axios";
import router from '../router';

/* eslint-disable */

// TODO config
const APIBaseURL = "https://us-central1-coronamap-604a2.cloudfunctions.net/app/";

const adapter = Axios.create({
    baseURL: APIBaseURL,
    headers: {
        "Content-Type": "application/json",
        //"Authorization": private_key
    }
});

function eachRecursive(obj) {
    for (var k in obj) {
        if (typeof obj[k] == "object" && obj[k] !== null)
            eachRecursive(obj[k]);
        else
        if (obj[k] == null) obj[k] = "";
    }
}

export default {
    install(Vue, options) {
        adapter.interceptors.response.use((response) => {
            eachRecursive(response.data);
            return response
        }, function(error) {
            if (error.response.status != 200) { //Error Server
                router.push("/error-server");
            }

            return Promise.reject(error);
        });

        let config = {
            onDownloadProgress: progressEvent => {
                let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                Vue.prototype.$eventHub.$emit("progressBar", percentCompleted);
            }
        }


        var api = {
            trackers: {
                getLatest() { return adapter.get("trackers/lastest") },
                getAllLocations() { return adapter.get("trackers/locations", config) },
            },
            news: {
                getNews(country) { return adapter.get("news?country=" + country, config) },
            },
        }
        Vue.prototype.$api = api;
    }
};