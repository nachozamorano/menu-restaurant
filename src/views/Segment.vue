<template>
  <ion-segment selectOnFocus scrollable mode="md" v-model="stepSelected" class="segment-w"
    @ionChange="segmentChanged($event)">
    <div v-for="(stp, s) in step" :key="s">
      <ion-segment-button SwipedTabs :id="'segment-' + stp.code" mode="md" class="step-class" :value="stp.code">
        <ion-label>{{ stp.name }}</ion-label>
      </ion-segment-button>
    </div>
  </ion-segment>
  <ion-img src="/assets/icon/fast-food-outline.svg" class="logo-icon"></ion-img>
  <list-item :step-info="stepInfo" :items-list="filterList" ref="list"></list-item>
  <div class="size-button-div">
    <ion-text class="total-amount">Monto: {{ formatPrice(totalAmount) + " " + stepInfo.typeMoney }}</ion-text>
    <div class="button-div">
      <ion-button @click="backClick" color="light" v-show="stepSelected != '001'" class="style-back">Volver</ion-button>
      <ion-button @click="nextClick" color="success" v-if="stepSelected != '00' + step.length">Continuar</ion-button>
      <ion-button @click="finishClick" color="success" :disabled="totalAmount == 0" v-else>Confirmar Pedido</ion-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonSegment, IonLabel, IonSegmentButton, IonImg, IonText, IonButton } from '@ionic/vue';
import ListItem from './ListItem.vue'
export default defineComponent({
  inheritAttrs: false,
  name: 'segment-top',
  components: {
    IonSegment, IonLabel, IonSegmentButton, ListItem, IonImg, IonText, IonButton
  },
  data() {
    return {
      totalAmount: 0,
      stepSelected: '001',
      filterList:[],
      stepInfo: {
        title: "Menu",
        code: "001",
        typeMoney: "CLP"
      },
      listOrder:[],
    }
  },
  props: {
    'step':{
      type: Object,
      default: function () {
        return {}
      }
    },
    'items-list':{
      type: Array,
      default: () => []
    }
  },
  watch: {
    stepSelected: function(){
      this.filterItemList();
    }
  },
  methods: {
    formatPrice: function(number: any) {
      if (!number) {
        number = 0;
      }
      return number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    },
    updateAmount: function(check: any, price: any) {
      if (check) {
        this.totalAmount = this.formatPrice(this.unformatString(this.totalAmount) + price).replace("$","");
      } else {
        this.totalAmount = this.formatPrice(this.unformatString(this.totalAmount) - price).replace("$","");
      }
    },
    unformatString: function(amount: any) {
      var parts = amount.toLocaleString('es-CL').match(/(\D+)/g);
      var unformatted = amount;
      if (parts) {
        unformatted = unformatted.split(parts[0]).join("");
        unformatted = unformatted.split(parts[1]).join("");
      }

      return parseFloat(unformatted);

    },
    segmentChanged: function(ev: CustomEvent) {
      //Seguimiento del step
      var id = document.getElementById('segment-' + ev.detail.value);
      if (id) {
        id.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    },
    filterItemList: function(){
        this.filterList = this.itemsList.filter( (itemInArray: { idTipoPlato: string; }) => itemInArray.idTipoPlato == this.stepSelected);
    },
    nextStep: function(step: any) {
      step = parseInt(step) + 1;
      return "00" + step;
    },
    backStep: function(step: any) {
      step = parseInt(step) - 1;
      return "00" + step;
    },
    finishClick: function() {
      console.log("finish");
    },
    nextClick: function() {
      this.stepSelected = this.nextStep(this.stepSelected);
    },
    backClick: function() {
      this.stepSelected = this.backStep(this.stepSelected);
    },
  }
});
</script>