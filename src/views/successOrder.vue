<template>
    <div style="text-align: center;">
        <ion-title size="large" class="title-step center margin-bottom-alert mt-title">Pedido Exitoso</ion-title>
        <ion-img src="/assets/icon/success.png" class="center max-size-icon margin-bottom-alert"></ion-img>
        <ion-text>
            <h3>Su pedido se ha realizado correctamente.</h3>
        </ion-text>
    </div>
</template>
  
  <script>
  import { defineComponent } from 'vue';
  import { IonImg, IonTitle, ionText } from '@ionic/vue';
  
  export default defineComponent({
    name: 'success-order',
    data(){
      return{
        
      }
    },
    methods:{
      
    },
    components: { 
        IonImg,
        IonTitle,
        ionText 
    }
  });
  </script>