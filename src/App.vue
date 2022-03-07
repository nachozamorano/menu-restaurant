<template>
  <ion-app>
      <ion-split-pane content-id="main-content">
        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,     
    IonRouterOutlet, 
    IonSplitPane,
      },
});
</script>
