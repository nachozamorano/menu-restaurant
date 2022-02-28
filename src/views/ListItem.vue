<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title size="large" class="title-step">{{stepInfo.title}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding size-content">
    <ion-list v-for="(itm, i) in itemsList" :key="i">
      <ion-item-divider>
        <ion-checkbox slot="start" @update:modelValue="itm.isChecked = $event" :modelValue="itm.isChecked" @click="$parent.updateAmount(itm.isChecked, itm.price)"></ion-checkbox>
        <ion-label>
          <ion-title size="large" class="title-sub">{{itm.name}}</ion-title>
          <p class="text-description">{{itm.description}}</p>
          <ion-badge color="primary">{{$parent.formatPrice(itm.price)+" "+stepInfo.typeMoney}}</ion-badge>
        </ion-label>
        <ion-img :src="itm.img" class="size-img"></ion-img>
        <button ion-button outline item-end>
          <ion-icon name="create"></ion-icon>
        </button>
        <button ion-button outline item-end>
          <ion-icon name="trash"></ion-icon>
        </button>
      </ion-item-divider>
    </ion-list>
    <ion-infinite-scroll
      @ionInfinite="loadData($event)" 
      threshold="100px" 
      id="infinite-scroll"
      :disabled="isDisabled"
    >
      <ion-infinite-scroll-content
        loading-spinner="bubbles"
        loading-text="Cargando ...">
      </ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref, toRef  } from 'vue';
import { IonCheckbox, IonLabel, IonIcon, IonImg, IonBadge, IonTitle, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';

export default defineComponent({
  name: 'ListItem',
  components: {
    IonCheckbox, IonLabel, IonIcon, IonImg, IonBadge, IonTitle, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent
  },
  setup() {
    const isDisabled = ref(false);
    const toggleInfiniteScroll = () => {
      isDisabled.value = !isDisabled.value;
    }
    const items = ref([]) as  any;
    const pushData = () => {
      const max = items.value.length + 3;
      const min = max - 3;
      for (let i = min; i < max; i++) {
        items.value.push(i);
      }
    }
    
    const loadData = (ev: any) => {
      setTimeout(() => {
        pushData();
        console.log('Cargado');
        ev.target.complete();
  
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (items.value.length === 20) {
          ev.target.disabled = true;
        }
      }, 500);
    }
    
    pushData();
    
    return {
      isDisabled,
      toggleInfiniteScroll,
      loadData,
      items
    }
  },
  data(){
    return{
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
    }
  },
  methods: {
    
  }
});
</script>