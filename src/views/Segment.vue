<template>
    <ion-segment v-model="stepSelected" @ionChange="segmentChanged($event)">
        <div v-for="(stp, s) in step" :key="s">
            <ion-segment-button :value="stp.code">
               <ion-label >{{stp.name}}</ion-label>
            </ion-segment-button>
        </div>
    </ion-segment>
    <list-item :step-info="stepInfo" :items-list="itemsList" ref="list"></list-item>
    <div style="height: 43px;">
        <ion-text class="total-amount">Monto: {{formatPrice(totalAmount)+" "+stepInfo.typeMoney}}</ion-text>
        <div class="button-div">
            <ion-button color="light" v-show="stepSelected!='001'" class="style-back">Volver</ion-button>
            <ion-button color="success">Continuar</ion-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonSegment, IonLabel, IonSegmentButton, IonText } from '@ionic/vue';
import ListItem from './ListItem.vue'
export default defineComponent({
  name: 'segment-top',
  components: {
    IonSegment, IonLabel, IonSegmentButton, ListItem, IonText
  },
  data(){
    return{
       totalAmount:0,
       stepSelected: '001',
       step: [
        {
          name: 'Step1',
          code: '001'
        },
        {
          name: 'Step2',
          code: '002'   
        }
      ],
      stepInfo:{
        title: "Hamburguesas",
        code: "001",
        typeMoney: "CLP"
      },
       itemsList: [
        {
          name: 'Titulo1',
          description: 'Descripcion 1',
          price: 10000,
          img:"/assets/icon/image1.jpg",
          isChecked: false
        },
        {
          name: 'Titulo2',
          description: 'Descripcion 2',
          price: 11100,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo3',
          description: 'Descripcion 3',
          price: 10000,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo2',
          description: 'Descripcion 2',
          price: 11100,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo3',
          description: 'Descripcion 3',
          price: 10000,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo2',
          description: 'Descripcion 2',
          price: 11100,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo3',
          description: 'Descripcion 3',
          price: 10000,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo2',
          description: 'Descripcion 2',
          price: 11100,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo3',
          description: 'Descripcion 3',
          price: 10000,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo2',
          description: 'Descripcion 2',
          price: 11100,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo3',
          description: 'Descripcion 3',
          price: 10000,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo2',
          description: 'Descripcion 2',
          price: 11100,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
        {
          name: 'Titulo3',
          description: 'Descripcion 3',
          price: 10000,
          img:"/assets/icon/image2.jpg",
          isChecked: false
        },
      ],
    }
  },
  methods: {
      segmentChanged(ev: CustomEvent) {
        console.log('Segment changed', ev.detail.value);
      },
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

    }
  } 
});
</script>