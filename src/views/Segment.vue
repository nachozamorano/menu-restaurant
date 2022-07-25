<template>
  <div v-if="!confirmOrder" class="height-max">
    <ion-segment selectOnFocus scrollable mode="md" v-model="stepSelected" class="segment-w"
      @ionChange="segmentChanged($event)">
      <div v-for="(stp, s) in step" :key="s">
        <ion-segment-button SwipedTabs :id="'segment-button' + stp.code" mode="md" class="step-class" :value="stp.code">
          <ion-label>{{ stp.name }}</ion-label>
        </ion-segment-button>
      </div>
    </ion-segment>
    <div id="counter" class="margin-counter" @click="showDetail()">
      <ion-badge color="primary" class="counter-element">{{counterElement()}}</ion-badge>
      <ion-img src="/assets/icon/fast-food-outline.svg" class="logo-icon"></ion-img>
    </div>
    <list-item :step-info="stepInfo" :items-list="filterList" ref="list"></list-item>
    <div class="size-button-div index-content">
      <ion-text class="total-amount">Monto: {{ formatPrice(totalAmount) + " " + stepInfo.typeMoney }}</ion-text>
      <div class="button-div">
        <ion-button @click="backClick" color="light" v-show="stepSelected != '001'" class="style-back">Volver</ion-button>
        <ion-button @click="nextClick" color="success" v-if="stepSelected != '00' + step.length">Continuar</ion-button>
        <ion-button @click="finishClick" color="success" :disabled="totalAmount == 0" v-else>Confirmar Pedido</ion-button>
      </div>
    </div>
    <list-item-detail :list-order="listOrder"></list-item-detail>
  </div>
  <div v-else class="vertical-center">
    <vue-qrcode :value="JSON.stringify(listOrder)" :options="{ width: 200 }"></vue-qrcode>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonSegment, IonLabel, IonSegmentButton, IonImg, IonText, IonButton, IonBadge, menuController } from '@ionic/vue';
import ListItemDetail from './listItemDetail.vue'
import ListItem from './ListItem.vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
export default defineComponent({
  inheritAttrs: false,
  name: 'segment-top',
  components: {
    IonSegment, IonLabel, IonSegmentButton, ListItem, IonImg, IonText, IonButton, IonBadge, ListItemDetail, VueQrcode
  },
  data() {
    return {
      confirmOrder:false,
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
    showDetail: function(){
      menuController.open("list-detail")
    },
    counterElement: function(){
      var count = 0;
      for (const key in this.listOrder) {
        if (Object.prototype.hasOwnProperty.call(this.listOrder, key)) {
          count += this.listOrder[key].quantity;
          
        }
      }
      return count;
    },
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
      this.confirmOrder=true;
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