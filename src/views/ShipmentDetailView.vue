<script lang="ts">

import { defineComponent } from 'vue';
import { useShipmentStore } from '@/stores/shipmentsStore';
import { formatDate } from "@/helpers/formatDate";
import { determineShipmentStatus } from "@/helpers/shipmentStatus";
import { useRoute } from "vue-router";

export default defineComponent({
  name: 'ShipmentDetail',
  methods: { formatDate },
  setup() {
    const {
      getShipmentById,
      getContainersByShipmentId,
      getTrackingEventsByContainerNumber
    } = useShipmentStore();

    const { shipmentId } = useRoute().params;
    if (typeof shipmentId !== 'string') {
      throw new Error('shipmentId = no string')
    }

    const shipment = getShipmentById(shipmentId)
    const containers = getContainersByShipmentId(shipmentId)
    if (typeof shipment === 'undefined' || typeof containers === 'undefined') {
      throw new Error('undefined')
    }

    const shipmentStatus = determineShipmentStatus(shipment.departureDate, shipment.arrivalDateOriginal);
    return {
      shipment,
      containers,
      shipmentStatus,
      getTrackingEventsByContainerNumber
    }
  },
});


</script>

<template>

  <main class="page-wrapper shipment-page">
    <h1>Shipment detail page</h1>
    <div>
      <h2>Shipment ID: <span v-text="this.$route.params.shipmentId"></span></h2>
    </div>

    <div class="data-wrapper">
      <div class="header">
        Status: {{ shipmentStatus }}
      </div>
      <div class="data">
        <div>
          <div>Origin Port: {{ shipment.originPort }}</div>
          <div>Departure Date: {{ formatDate(shipment.departureDate) }}</div>
        </div>
        <div>
          <div>Destination Port: {{ shipment.destinationPort }}</div>
          <div>Date of Arrival: {{ formatDate(shipment.arrivalDateOriginal) }}</div>
        </div>
        <div>Carrier Name: {{ shipment.carrierName }}</div>
      </div>
      <div class="container-ids" v-for="container in containers" :key="container.id">
        Container number: {{ container.containerNumber }}

        <div >
          Tracking Events:
          <table>
            <thead>
              <tr>
                <th>carrierName</th>
                <th>destinationUnLoCode</th>
                <th>departureDate</th>
                <th>arrivalDateEstimate</th>
                <th>containerNumber</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tracking, index) in getTrackingEventsByContainerNumber(container.containerNumber)" :key="index">
                <td>{{tracking.carrierName}}</td>
                <td>{{tracking.destinationUnLoCode}}</td>
                <td>{{ formatDate(tracking.departureDate) }}</td>
                <td>{{ formatDate(tracking.arrivalDateEstimate) }}</td>
                <td>{{tracking.containerNumber}}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
.data-wrapper {
  display: flex;
  flex-direction: column;
  color: #222;
  .header {
    padding: 10px 20px;
    background: #e4efef;
    border: 1px solid #ebeef5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .container-ids {
    padding: 10px 20px;
    background: #e4efef;
    border: 1px solid #ebeef5;
    border-radius: 10px;
    margin-top: 5px;
  }
  .data {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 30px;
    padding: 20px 10px;
    background: #fff;
    color: #1f1c30;
    border: 1px solid #eaeef4;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}





.page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #222;
  padding: 2%;
  margin: 0 2% 6% 2%;
  border-radius: 10px;
}
table {}
thead {
  background: hsl(173, 93%, 11%);
  color: #fff;
}
th {
  padding: 0 10px;
  margin-bottom: 10px;
}
td {
  text-align: center;
}
.button {
  background: hsla(160, 100%, 37%, 1);
  cursor: pointer;
  padding: 4px 20px;
  border-radius: 5px;
  color: #222;
  &:hover {
    background: hsl(160, 97%, 28%);
  }
}
</style>
