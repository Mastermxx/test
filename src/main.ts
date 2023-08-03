import './assets/main.css'
import OpenLayersMap from "vue3-openlayers";
import "vue3-openlayers/styles.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import {useShipmentStore} from "@/stores/shipmentsStore";

const app = createApp(App)

app.use(OpenLayersMap /* options */);
app.use(createPinia())
app.use(router)

async function startApp() {
  const shipmentStore = useShipmentStore();

  await shipmentStore.importShipments()
  await shipmentStore.importContainers()
  await shipmentStore.importTracking()
  await shipmentStore.importLiveTracking()

  app.mount('#app')
}

await startApp();


