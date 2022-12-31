<template>
  <ion-content class="ion-padding">
    <div class="container">
      <ion-item ref="item">
        <ion-label position="floating">Nombre Usuario</ion-label>
        <ion-input placeholder="Nombre Usuario" v-model="$root.userName" @ionInput="validate" @ionBlur="markTouched"></ion-input>
        <ion-note slot="helper">Ingrese su nombre</ion-note>
        <ion-note slot="error">Campo Vacío</ion-note>
      </ion-item>
      <ion-icon class="arrow-forward-circle-outline ion-margin-start" @click="nextStep()"></ion-icon>
    </div>
  </ion-content>
</template>

<script>
import { IonContent, IonLabel, IonInput, IonNote, IonItem, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'insert-name',
  methods:{
    validateUserName: function(value){
      return value != "";
    },
    validate: function(ev) {
      const value = ev.target.value;

      this.$refs.item.$el.classList.remove('ion-valid');
      this.$refs.item.$el.classList.remove('ion-invalid');

      this.validateUserName(value)
          ? this.$refs.item.$el.classList.add('ion-valid')
          : this.$refs.item.$el.classList.add('ion-invalid');
    },
    markTouched: function() {
      this.$refs.item.$el.classList.add('ion-touched')
    },
    nextStep: function(){
      if(this.$root.userName != ""){
        this.$root.stepMain = "main";
      }else{
        this.$refs.item.$el.classList.add('ion-invalid');
      }
    }
  },
  components: { IonContent, IonLabel, IonInput, IonNote, IonItem, IonIcon }
});
</script>