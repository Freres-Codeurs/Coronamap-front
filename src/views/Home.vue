<template>
  <div class="d-flex parent-flex-column align-items-center" style="min-height:100%">
    <div class="col-auto w-100">
      <div class="row">
        <div
          class="col-4 pointer text-center cm-bg-grey cm-white py-3 px-0"
          @click="typeClick('confirmed')"
          :class="choosenType=='confirmed' ? 'cm-bold' : ''"
          :style="choosenType=='confirmed' ? 'opacity: 1' : 'opacity: 0.8'"
        >
          <p>Cas confirmés</p>
          <p class="cm-font-size-4">{{$common.formatNumber(confirmedTotal)}}</p>
        </div>
        <div
          class="col-4 pointer text-center bg-danger cm-white py-3 px-0"
          @click="typeClick('deaths')"
          :class="choosenType=='deaths' ? 'cm-bold' : ''"
          :style="choosenType=='deaths' ? 'opacity: 1' : 'opacity: 0.8'"
        >
          <p>Décès</p>
          <p class="cm-font-size-4">{{$common.formatNumber(deathsTotal)}}</p>
        </div>
        <div
          class="col-4 pointer text-center bg-success cm-white py-3 px-0"
          @click="typeClick('recovered')"
          :class="choosenType=='recovered' ? 'cm-bold' : ''"
          :style="choosenType=='recovered' ? 'opacity: 1' : 'opacity: 0.8'"
        >
          <p>Guérisons</p>
          <p class="cm-font-size-4">{{$common.formatNumber(recoveredTotal)}}</p>
        </div>
      </div>
    </div>
    <div class="col child-flex-height-auto position-relative w-100 p-0">
      <custom-map :markers="getMarkersList()" :type="choosenType"></custom-map>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      choosenType: "confirmed",

      confirmedMarkers: [],
      deathsMarkers: [],
      recoveredMarkers: [],

      confirmedTotal: 0,
      deathsTotal: 0,
      recoveredTotal: 0
    };
  },
  methods: {
    typeClick(type) {
      this.$router.push({ query: { type: type } });
      this.choosenType = type;
    },
    getMarkersList() {
      if (this.choosenType == "confirmed") return this.confirmedMarkers;
      if (this.choosenType == "deaths") return this.deathsMarkers;
      if (this.choosenType == "recovered") return this.recoveredMarkers;
      return [];
    },
    getAllLocations() {
      this.$api.trackers
        .getAllLocations()
        .then(response => {
          var tmp;
          for (var location of response.data.locations) {
            tmp = {
              lat: Number(location.coordinates.latitude),
              lng: Number(location.coordinates.longitude)
            };

            if (location.latest.confirmed > 0) {
              this.confirmedMarkers.push({
                position: tmp,
                number: location.latest.confirmed
              });
            }

            if (location.latest.deaths > 0) {
              this.deathsMarkers.push({
                position: tmp,
                number: location.latest.deaths
              });
            }

            if (location.latest.recovered > 0) {
              this.recoveredMarkers.push({
                position: tmp,
                number: location.latest.recovered
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/error-server");
        });
    },
    getLatest() {
      this.$api.trackers
        .getLatest()
        .then(response => {
          this.confirmedTotal = response.data.latest.confirmed;
          this.deathsTotal = response.data.latest.deaths;
          this.recoveredTotal = response.data.latest.recovered;
        })
        .catch(err => {
          console.log(err);
          this.$router.push("/error-server");
        });
    }
  },
  created: function() {
    if (this.$route.query.type && this.$route.query.type.length)
      this.choosenType = this.$route.query.type;

    this.getAllLocations();
    this.getLatest();
  }
};
</script>
