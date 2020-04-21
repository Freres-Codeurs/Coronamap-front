<template>
  <div class="position-absolute w-100 h-100" style="top:0; right: 0;" ref="mapDiv">
    <GmapMap
      :center="center"
      :zoom="zoom"

      :options="options"
      map-type-id="terrain"
      :style="'width:' + width + 'px; height:' + height + 'px'"
      ref="gmap"
    >
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        :icon="getIconImage(marker)"
        @click="center=marker.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "custom-map",
  props: {
    type: {
      type: String
    },
    markers: {
      type: Array
    },
    options: {
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      disableDefaultUi: false
    },
  },
  data() {
    return {
      height: 0,
      width: 0,

      center: {
        lat: 10,
        lng: 10
      },

      zoom: 4,
    };
  },
  methods: {
    getMapDivSize() {
      this.height = this.$refs.mapDiv.clientHeight;
      this.width = this.$refs.mapDiv.clientWidth;
    },
    getIconImage(marker) {
      var coeff;
      if (this.type == "deaths") coeff = 4000;
      else if (this.type == "recovered") coeff = 10000;
      else coeff = 20000;

      var size = (5 + marker.number/coeff) * (this.zoom == 0 ? 1 : this.zoom);
      var icon = {
        scaledSize: { width: size, height: size }
      };

      if (marker.number < 100)
        icon.url = require("@/assets/" + this.type + "-low.png");
      else if (marker.number < 500)
        icon.url = require("@/assets/" + this.type + "-medium.png");
      else icon.url = require("@/assets/" + this.type + "-high.png");

      return icon;
    }
  },
  mounted: function() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      },
      error => {
        console.log(error.message);
      }
    );
    this.getMapDivSize();

    this.$refs.gmap.$on('zoom_changed', (zoom) => {
      this.zoom = zoom;
      this.$forceUpdate()
    })

    window.addEventListener("resize", this.getMapDivSize);
  }
};
</script>
