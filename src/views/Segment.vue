<template>
    <ion-segment selectOnFocus scrollable mode="md" v-model="stepSelected" class="segment-w" @ionChange="segmentChanged($event) ">
        <div v-for="(stp, s) in step" :key="s">
            <ion-segment-button  SwipedTabs :id="'segment-'+stp.code" mode="md"  class="step-class" :value="stp.code">
               <ion-label >{{stp.name}}</ion-label>
            </ion-segment-button>
        </div>
    </ion-segment>
    <ion-img src="/assets/icon/fast-food-outline.svg" class="logo-icon"></ion-img>
    <list-item :step-info="stepInfo" :items-list="itemsList" ref="list"></list-item>
    <div class="size-button-div">
        <ion-text class="total-amount">Monto: {{formatPrice(totalAmount)+" "+stepInfo.typeMoney}}</ion-text>
        <div class="button-div">
            <ion-button @click="backClick" color="light" v-show="stepSelected!='001'" class="style-back">Volver</ion-button>
            <ion-button @click="nextClick" color="success" v-if="stepSelected!='00'+step.length">Continuar</ion-button>
            <ion-button @click="finishClick" color="success" v-else>Confirmar Pedido</ion-button>
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
  data(){
    return{
       totalAmount:0,
       stepSelected: '001',
       step: [
        {
          name: 'Entrada',
          code: '001'
        },
        {
          name: 'Plato Fondo',
          code: '002'   
        },
        {
          name: 'Postre',
          code: '003'   
        },
        {
          name: 'Bebidas',
          code: '004'   
        },
        {
          name: 'Jugos',
          code: '005'   
        }
      ],
      stepInfo:{
        title: "Hamburguesas",
        code: "001",
        typeMoney: "CLP"
      },
       itemsList: [
        {
          name: 'Churrasco Italiano',
          description: 'carne, tomate, palta, mayo',
          price: 10000,
          img:"/assets/icon/italiano.jpg",
          isChecked: false
        },
        {
          name: 'Churrasco Chacarero',
          description: 'carne, tomate, porotos verdes, aji verde, mayo',
          price: 11100,
          img:"/assets/icon/chacarero.png",
          isChecked: false
        },
        {
          name: 'Churrasco Luquito',
          description: 'carne, extra queso',
          price: 10000,
          img:"/assets/icon/luco.jpg",
          isChecked: false
        }
      ],
    }
  },
  methods: {
        formatPrice (number: any) {
        if(!number){
            number = 0;
        }
        return number.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
      },
      updateAmount (check: any, price: any){
        if(!check){
            this.totalAmount = this.formatPrice(this.unformatString(this.totalAmount) + price);
        }else{
            this.totalAmount = this.formatPrice(this.unformatString(this.totalAmount) - price);
        }
      },
      unformatString(amount: any) {
        var parts = amount.toLocaleString('es-CL').match(/(\D+)/g);
        var unformatted = amount;
        if(parts){
            unformatted = unformatted.split(parts[0]).join("");
            unformatted = unformatted.split(parts[1]).join("");
        }

        return parseFloat(unformatted);

      },
      segmentChanged(ev: CustomEvent) {
        //Seguimiento del step
        var id=document.getElementById('segment-'+ev.detail.value);
        if(id){
          id.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }
      },
      nextStep(step: any){
      step = parseInt(step)+1;
      return "00"+step;
      },
      backStep(step: any){
        step = parseInt(step)-1;
        return "00"+step;
      },
      finishClick(){
        console.log("finish");
      },
      nextClick(){
        this.stepSelected=this.nextStep(this.stepSelected);
      },
      backClick(){
        this.stepSelected=this.backStep(this.stepSelected);
      },
  } 
});
</script>