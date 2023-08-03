<script lang="ts">

import { useShipmentStore } from '@/stores/shipmentsStore';
import { useRouter } from 'vue-router';
import { formatDate } from "@/helpers/formatDate";
import {determineShipmentStatus, ShipmentStatus} from "@/helpers/shipmentStatus"

export default {
  name: "Shipments",
  setup() {
    const router = useRouter();

    const redirectToShipmentDetail = (shipmentId) => {
      router.push({ name: 'ShipmentDetail', params: { shipmentId: shipmentId.toString() } });
    };

    const { shipments, containers, getContainersByShipmentId } = useShipmentStore();

    return {
      redirectToShipmentDetail, // Include the getShipmentId function in the return object
      shipments,
      containers,
      getContainersByShipmentId
    };
  },
  data() {
    return {
      shipmentStatusFilter: 'none'
    }
  },
  computed: {
    filteredShipments() {
      const { shipments, getFilteredShipmentsByShipmentStatus } = useShipmentStore();
      return this.shipmentStatusFilter === 'none' ? shipments : getFilteredShipmentsByShipmentStatus(this.shipmentStatusFilter)
    }
  },
  methods: {
    determineShipmentStatus,
    formatDate,

    filterByShipmentStatus(shipmentStatus: ShipmentStatus | 'none') {
      this.shipmentStatusFilter = shipmentStatus;
    },
  },
};
</script>

<template>
  <main class="page-wrapper shipment-page">
    <h1>Shipment list</h1>
    <div class="data-wrapper">

      <div class="buttons-wrapper">
        <div class="button" @click="filterByShipmentStatus('Arrived')" >Arrived</div>
        <div class="button" @click="filterByShipmentStatus('In Transit')" >In Transit</div>
        <div class="button" @click="filterByShipmentStatus('Not Departed Yet')" >Not Departed Yet</div>
        <div class="button" @click="filterByShipmentStatus('none')" >Reset</div>
      </div>

      <div class="header">
        <div class="row">
          <div>Origin Port</div>
          <div>Departure Date</div>
        </div>
        <div class="row">
          <div>Destination Port</div>
          <div>Arrival Date Original</div>
        </div>
        <div class="row">Carrier Name</div>
        <div class="row centered">Containers</div>
        <div class="row">Status</div>
      </div>
      <div class="data" v-for="shipment in filteredShipments" @click="redirectToShipmentDetail(shipment.id)" :key="shipment.id">
        <div class="row">
          <div>{{ shipment.originPort }}</div>
          <div>{{ formatDate(shipment.departureDate) }}</div>
        </div>
        <div class="row">
          <div>{{ shipment.destinationPort }}</div>
          <div>{{ formatDate(shipment.arrivalDateOriginal) }}</div>
        </div>
        <div class="row">{{ shipment.carrierName }}</div>
        <div class="row">{{ getContainersByShipmentId(shipment.id).length }}</div>
        <div class="row">{{ determineShipmentStatus(shipment.departureDate, shipment.arrivalDateOriginal) }}</div>
      </div>
    </div>
  </main>
</template>

<style scoped>


.page-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2%;
}
.data-wrapper {
  display: flex;
  flex-direction: column;
  color: #222;
  flex: 1;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;
    background: #e4efef;
    border: 1px solid #ebeef5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .row {
      width: 100%;
    }
  }
  .data {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 10px;
    background: #fff;
    color: #1f1c30;
    border: 1px solid #eaeef4;
    &:hover {
      cursor: pointer;
      background: #e4efef;
      border: 1px solid #dcdfe7;
    }
    .row {
      width: 100%;
    }
  }
}

.buttons-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
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
}

</style>
