<template>
  <ion-header class="size-header">
    <ion-toolbar>
      <ion-img :src="data.img" class="card-img-model"></ion-img>
      <ion-title class="card-title">{{ data.name }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="border-detail">
      <h4 class="description-title">Descripción:</h4>
      <span class="text-description-card">{{data.description}}</span>
    </div>
    <div class="align-center">
      <PlusMinusField></PlusMinusField>
    </div>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg } from '@ionic/vue';
import { defineComponent } from 'vue';
import PlusMinusField from './PlusMinusField.vue'

export default defineComponent({
  name: 'modal-img',
  props: {
    data: { type: Object},
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, PlusMinusField}
});
</script>