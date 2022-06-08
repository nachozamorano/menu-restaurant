<template>
  <ion-page>
    <ion-content>
        <ion-img :src="urlStart" class="vertical-center"></ion-img>
        <h1 class="align-down-right">Supported Created By Island Software</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {  IonContent, IonPage, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { IonContent, IonPage, IonImg },
  name: 'start-page',
  props:{
    'url-start': {
      type: String
    }
  },
});
</script>