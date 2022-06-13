<template>
  <ion-page>
    <ion-content>
      <ion-modal :is-open="isOpenRef" :swipe-to-close="true" :presenting-element="$parent.$refs.ionRouterOutlet"
        @didDismiss="setOpen(false)">
        <div style="display: flow-root;">
          <ion-icon class="close-icon" size="small" @click="setOpen(false)"></ion-icon>
        </div>
        <modal-img :data="dataSelected" :value-minus="valueMinus" ref="modalImg"></modal-img>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonModal, IonContent, IonPage, IonIcon } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import ModalImg from './ModalImg.vue'

export default defineComponent({
  components: { IonModal, ModalImg, IonContent, IonPage, IonIcon },
  name: 'card-modal',
  props: {
    dataSelected: {
      type: Object
    },
    valueMinus:{
      type:Number,
      default:0
    }
  },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    return { isOpenRef, setOpen }
  }
});
</script>