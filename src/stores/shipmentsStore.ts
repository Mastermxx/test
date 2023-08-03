import { defineStore } from 'pinia'
import axios from "axios";
import Papa from "papaparse";
import type {ShipmentStatus} from "@/helpers/shipmentStatus";
import {determineShipmentStatus} from "@/helpers/shipmentStatus";
interface ShipmentState {
  containers: ContainerData[],
  tracking: TrackingData[],
  liveTracking: LiveTrackingData[],
  shipments: ShipmentData[],
}
interface ContainerData {
  id: string,
  containerNumber: string,
  shipmentId: string,
}
interface ShipmentData {
  id: string;
  createdAt: string;
  carrierName: string;
  originPort: string;
  destinationPort: string;
  departureDate: string;
  arrivalDateOriginal: string;
  arrivalDateEstimate: string;
  amountOfContainers: number;
}
interface TrackingData {
  carrierName: string;
  destinationUnLoCode: string;
  departureDate: string;
  arrivalDateEstimate: string;
  containerNumber: string;
}
interface LiveTrackingData {
  shipmentId: string;
  createdAt: string;
  lat: number;
  long: number;
}

export const useShipmentStore = defineStore('shipmentStore', {
  state: () => ({
    containers: [],
    liveTracking: [],
    tracking: [],
    shipments: [],
  }) as ShipmentState,

  actions: {
    async importShipments() {
      const shipmentsResponse = await axios.get('/src/data/shipments.csv');
      const shipmentsData = Papa.parse<ShipmentData>(shipmentsResponse.data, {
        header: true,
      });
      this.shipments = shipmentsData.data;
    },
    async importContainers() {
      const containersResponse = await axios.get('/src/data/containers.csv');
      const containerData = Papa.parse<ContainerData>(containersResponse.data, {
        header: true,
      });
      this.containers = containerData.data;
    },
    async importTracking() {
      const trackingResponse = await axios.get('/src/data/tracking.csv');
      const trackingData = Papa.parse<TrackingData>(trackingResponse.data, {
        header: true,
      });
      console.log(trackingData.data)
      this.tracking = trackingData.data;
    },
    async importLiveTracking() {
      const liveTrackingResponse = await axios.get('/src/data/live-tracking.csv');
      const liveTrackingData = Papa.parse<LiveTrackingData>(liveTrackingResponse.data, {
        header: true,
      });
      this.liveTracking = liveTrackingData.data;
    },
  },
  getters: {
    getShipmentById:(state) => (id: string): ShipmentData | undefined =>
      state.shipments.find( shipment => shipment.id === id ),
    getContainerById:(state) => (id: string): ContainerData | undefined =>
      state.containers.find( container => container.id === id ),
    getContainersByShipmentId:(state) => (shipmentId: string): ContainerData[] =>
      state.containers.filter( container => container.shipmentId === shipmentId ),
    getTrackingEventsByContainerNumber:(state) => (containerNumber: string): TrackingData[] =>
      state.tracking.filter( tracking => tracking.containerNumber === containerNumber ).slice(0, 10),
    getFilteredShipmentsByShipmentStatus:(state) => (shipmentStatus: ShipmentStatus): ShipmentData[] =>
      state.shipments.filter( shipment =>
        determineShipmentStatus(shipment.departureDate, shipment.arrivalDateOriginal) === shipmentStatus )
  }
});


