<template>
  <ion-header class="size-header">
    <ion-toolbar>
      <ion-img :src="data.img" class="card-img-model"></ion-img>
      <ion-title class="card-title">{{ data.name }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <h4 class="description-title">Descripción:</h4>
    <p class="text-description-card">{{data.description}}</p>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'modal-img',
  props: {
    data: { type: Object},
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonImg}
});
</script>