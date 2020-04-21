<template>
  <div id="app" class="parent-flex-column">
    <vue-progress-bar></vue-progress-bar>

    <hbar></hbar>

    <div class="custom-scroll position-relative col p-0 w-100">
      <router-view
        class="position-absolute absolute-center-x w-100"
        style="top:0; right:0;"
        :key="$route.name + ($route.params.identifier || '')"
      ></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
  created: function() {
    this.$Progress.set(0);
    this.$eventHub.$on("progressBar", percent => {
      this.$Progress.set(percent);
    });
  },
  mounted: function() {}
};
</script>
