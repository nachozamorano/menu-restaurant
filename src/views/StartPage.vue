<template>
  <ion-page>
    <ion-content class="center-text">
        <ion-img :src="urlStart" class="vertical-center"></ion-img>
        <ion-title class="align-down-center">Supported Created By Island Software</ion-title>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {  IonContent, IonPage, IonImg, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { IonContent, IonPage, IonImg, IonTitle },
  name: 'start-page',
  props:{
    'url-start': {
      type: String
    }
  },
});
</script>