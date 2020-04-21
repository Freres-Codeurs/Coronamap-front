<template>
  <div class="d-flex parent-flex-column align-items-center" style="min-height:100%">
    <div class="col-12 w-100">
      <div class="row justify-content-center cm-bg-blue">
        <div class="col-auto cm-font-size-4 cm-white cm-semibold py-3 py-md-5">
          <p>Sélectionner un pays :</p>
        </div>
        <div class="col-11 col-md-auto cm-font-size-4 py-3 py-md-5">
          <country-select
            v-model="country"
            :country="country"
            topCountry="FR"
            placeholder
            class="px-3 w-100"
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div v-if="newsArray.length == 0 && !isLoading" class="col-12 cm-grey text-center py-5">
          <p>Aucune news pour ce pays</p>
        </div>
        <div v-for="(news, index) in newsArray" :key="index" class="col-12">
          <news-component
            v-if="news.urlToImage.length && news.description.length"
            :title="news.title"
            :description="news.description"
            :source="news.source.name"
            :published="news.publishedAt"
            :url="news.url"
            :image-url="news.urlToImage"
          ></news-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      country: "FR",
      newsArray: [],
      isLoading: true,
    };
  },
  methods: {
    getNews() {
      if (!this.country || !this.country.length) return;
      
      this.isLoading= true;
      this.$api.news
        .getNews(this.country.toLowerCase())
        .then(response => {
          console.log(response.data);
          this.newsArray = response.data.articles;
          this.isLoading= false;
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/error-server");
        });
    }
  },
  created: function() {
    this.getNews();
  },
  watch: {
    country: function(val) {
      this.getNews();
    }
  }
};
</script>
