<script lang="ts">
  import { ref, onMounted } from "vue";

  export default {
    name: "Shipments",
    setup() {
      const center = ref([40, 40]);
      const projection = ref("EPSG:3857");
      const zoom = ref(6);
      const rotation = ref(0);

      return {
        center,
        projection,
        zoom,
        rotation
      }
    },
  };
</script>


<template>

  <main class="page-wrapper shipment-page">
    <h1>Live Map</h1>

    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 70vh"
    >
      <ol-view
        ref="view"
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
    </ol-map>

  </main>
</template>

<style scoped>
  .page-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 2%;
  }
</style>
