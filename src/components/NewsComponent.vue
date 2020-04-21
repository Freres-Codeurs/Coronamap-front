<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-10">
      <div class="row py-3 border-top">
        <div class="col-8 col-md-6 col-lg-3">
          <img :src="imageUrl" :alt="imageUrl" class="w-100" />
        </div>
        <div class="col pl-0 d-none d-md-block">
          <div class="row parent-flex-column h-100">
            <div class="col w-100">
              <p class="cm-font-size-4 cm-semibold line-clamp-2 line-height-sm">{{title}}</p>

              <p class>Publié le {{$moment(published).format("ll")}}</p>
              <p class="line-clamp-3 line-height-sm pt-3">{{description}}</p>
            </div>
            <div class="col-auto w-100">
              <div class="row align-items-center mt-auto">
                <div class="col-auto">
                  <p class="cm-grey">Source : {{source}}</p>
                </div>
                <div class="col-auto ml-auto">
                  <a :href="url" target="_blank">
                    <button
                      class="btn cm-bg-blue cm-white cm-semibold cm-font-size-5 pointer"
                    >Accéder à l'article</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 pl-0 d-md-none px-4">
          <p class="cm-font-size-4 cm-semibold line-clamp-2 line-height-sm pt-3">{{title}}</p>

          <p class>Publié le {{$moment(published).format("ll")}}</p>
          <p class="line-clamp-3 line-height-sm pt-3">{{description}}</p>

          <p class="cm-grey">Source : {{source}}</p>

          <a :href="url" target="_blank">
            <button
              class="btn cm-bg-blue cm-white cm-semibold cm-font-size-5 pointer mt-3"
            >Accéder à l'article</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "news-component",
  props: {
    source: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    imageUrl: {
      type: String,
      default: ""
    },
    published: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted: function() {}
};
</script>
