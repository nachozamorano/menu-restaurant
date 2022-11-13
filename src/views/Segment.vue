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
        <ion-button @click="backClick()" color="light" v-show="stepSelected != '001'" class="style-back">Volver</ion-button>
        <ion-button @click="nextClick()" color="success" v-if="stepSelected != '00' + step.length">Continuar</ion-button>
        <ion-button @click="finishClick()" color="success" :disabled="totalAmount == 0" v-else>Confirmar</ion-button>
      </div>
    </div>
    <list-item-detail :list-order="listOrder"></list-item-detail>
  </div>
  <div v-else class="vertical-center">
    <ion-text class="text-qr">Muestre este codigo QR para realizar su pedido.</ion-text>
    <vue-qrcode :value="dataQrOrder()" :options="{ width: 200 }"></vue-qrcode>
    <div class="display-grid">
      <a class="link-detail">Ver Detalle</a>
      <ion-button @click="modOrder()" color="primary" class="button-qr">Modificar Pedido</ion-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonSegment, IonLabel, IonSegmentButton, IonImg, IonText, IonButton, IonBadge, menuController, toastController  } from '@ionic/vue';
import { alertCircleOutline } from 'ionicons/icons';
import { HTTP } from '../js/http-common';
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
      consultOrder:""
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
    },
    'num-table':{
      type:String,
      default:""
    },
    'id-restaurant':{
      type:String,
      default:""
    }
  },
  watch: {
    stepSelected: function(){
      this.filterItemList();
    },
    confirmOrder: function(val){
      if(val){
        this.$nextTick(() => {
          this.consultOrder = setInterval(function() {
            this.consultIfReadQr();
          }.bind(this), 2000);
        });
      }else{
        clearInterval(this.consultOrder);
      }
    }
  },
  methods: {
    dataQrOrder: function(){
      return JSON.stringify(this.listOrder) + "/dataBase/"+JSON.stringify([{"numTable": this.numTable}]);
    },
    modOrder:function(){
      HTTP.post('/api/mesa/actualizarEstado', {
            id: this.idRestaurant,
            num: this.numTable,
            status: "1"
          })
          .then(response => {
            this.confirmOrder=false;
          })
          .catch(e => {
            this.errors.push(e)
          })
    },
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
      return number.toLocaleString('es-CL', { style: 'currency', currency: this.stepInfo.typeMoney });
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
      HTTP.post('/api/mesa/actualizarEstado', {
            id: this.idRestaurant,
            num: this.numTable,
            status: "2"
          })
          .then(response => {
                this.confirmOrder=true;
          })
          .catch(e => {
            this.errors.push(e)
          })
    },
    consultIfReadQr:function() {
      HTTP.post('/api/mesa/estado', {
        id: this.idRestaurant,
        num: this.numTable
      })
      .then(response => {
        if(response.data[0].FK_IdEstadoMesa == 3){
          clearInterval(this.consultOrder);
          this.$root.stepMain = "success";
        }else if(response.data[0].FK_IdEstadoMesa == 5){
          clearInterval(this.consultOrder);
          this.confirmOrder = false;
          this.presentToast("Orden Cancelada", "top", 2000, "danger");
        }
      })
      .catch(e => {
        this.$root.errors.push(e)
      });
    },
    async presentToast(msg, pos, time, color) {
      const toast = await toastController.create({
        message: msg,
        duration: time,
        position: pos,
        color: color,
        icon: alertCircleOutline
      });

      await toast.present();
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