<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title size="large" class="title-step">{{stepInfo.title}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding size-content">
    <ion-list v-for="(itm, i) in itemsList" :key="i">
      <ion-item-divider class="item-divider-list">
        <ion-label class="ion-label-list" @click="selectedImg(itm)">
          <h1 size="large" class="title-sub">{{itm.name}}</h1>
          <p class="text-description">{{itm.description}}</p>
          <ion-badge color="primary">{{$parent.formatPrice(itm.price)+" "+stepInfo.typeMoney}}</ion-badge>
        </ion-label>
        <ion-img :src="itm.img" class="size-img" @click="selectedImg(itm)"></ion-img>
      </ion-item-divider>
    </ion-list>
    <card-img ref="cardImage" class="card-img" :value-minus="valueMinus" :data-selected="dataSelected"></card-img>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonLabel, IonImg, IonBadge, IonToolbar, IonHeader, IonContent, IonItemDivider, IonList, IonTitle } from '@ionic/vue';
import CardImg from './CardImg.vue'

export default defineComponent({
  name: 'List-item',
  components: {
    IonLabel, IonImg, IonBadge, IonToolbar, IonHeader, IonContent, IonItemDivider, IonList, IonTitle, CardImg
  },
  data(){
    return{
      dataSelected:{},
      valueMinus:0
    }
  },
  props: {
    'items-list':{
      type: Object,
      default: function () {
        return {}
      }
    },
    'step-info':{
      type: Object,
      default: function () {
        return {}
      }
    },
    'step-selected':{
      type: String,
      default: "001"

    },
  },
  methods:{
    selectedImg (row: any){
        if(typeof row.quantity != "undefined"){
          this.valueMinus = row.quantity;
        }else{
          this.valueMinus = 0;
        }
        this.dataSelected = row;
        (this.$refs['cardImage'] as any).setOpen(true);
    }
  }
});
</script>