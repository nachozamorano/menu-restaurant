<template>
  <ion-header class="size-header">
    <ion-toolbar class="text-align-center">
      <div class="display-inline-table">
        <ion-img :src="errorLoad?notFoundUrl:data.img" @ionError="notFoundImage" class="card-img-model max-img-modal"></ion-img>
      </div>
      <ion-title class="card-title">{{ data.name }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="border-detail">
      <h4 class="description-title">Descripción:</h4>
      <span class="text-description-card">{{ data.description }}</span>
    </div>
    <div class="align-center">
      <PlusMinusField ref="minus" :data="data" :value="valueMinus"></PlusMinusField>
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
    data: { type: Object },
    valueMinus:{
      type:Number,
      default:0
    }
  },
  data(){
    return{
      errorLoad:false,
      notFoundUrl:"/assets/icon/not_image.png"
    }
  },
  methods:{
    notFoundImage: function(){
      this.errorLoad=true;
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, PlusMinusField }
});
</script>