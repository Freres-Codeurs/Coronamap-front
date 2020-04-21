<template>
  <header class="header-global cm-bg-dark h-hbar center-vertically-child border-green-bottom">
    <nav class="row align-items-center cm-white mx-3">
      <div class="col-auto col-md-4">
        <div class="row align-items-center">
          <div class="col-auto p-0 pl-2">
            <router-link to="/">
              <div class="square cm-bg-dark br-3" style="width:3rem">
                <div class="content-square">
                  <img class="w-100" :src="require('@/assets/logo.png')" />
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-auto">
            <router-link to="/">
              <p class="cm-font-size-4 cm-bold">CoronaMap</p>
            </router-link>
          </div>
        </div>
      </div>
       <div class="col-auto ml-auto">
        <router-link to="/">
          <p :class="this.currentRoute == 'Home' ? 'cm-semibold' : ''">Map</p>
        </router-link>
      </div>
      <div class="col-auto">
        <router-link to="/news">
          <p :class="this.currentRoute == 'News' ? 'cm-semibold' : ''">News</p>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "hbar",
  data() {
    return {
      currentRoute: ""
    };
  },
  methods: {},
  created: function() {},
  mounted: function() {
    this.currentRoute = this.$router.currentRoute.name;
  },
  watch: {
    $route(to, from) {
      this.currentRoute = this.$router.currentRoute.name;
    }
  }
};
</script>
