<template>
  <ion-app class="display-block">
      <start-page :urlStart="urlStart" v-if="stepMain=='start'" ref="startPage"></start-page>
      <segment-top v-else-if="stepMain=='main' && !isBlocked" :step="stepAux" :num-table="numTable" :id-restaurant="idRestaurant" :items-list="itemsListAux" ref="segment"></segment-top>
      <success-order v-else-if="stepMain=='success' && !isBlocked"></success-order>
      <page-not-found v-else-if="stepMain=='error' && !isBlocked" ref="error"></page-not-found>
      <page-blocked v-else-if="isBlocked" ref="blocked"></page-blocked>
  </ion-app>
</template>

<script>
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import { HTTP } from './js/http-common';
import PageNotFound from './views/PageNotFound.vue';
import pageBlocked from './views/PageBlocked.vue';
import startPage from './views/StartPage.vue';
import successOrder from './views/successOrder.vue';
import ReverseMd5 from 'reverse-md5';
import segmentTop from './views/Segment.vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    pageBlocked,
    PageNotFound,
    successOrder,
    startPage,
    segmentTop
    },
      created: function (){
        setTimeout(function() {
             this.startWeb();
        }.bind(this), this.timeInitial);
      },
      data(){
        return{
          isBlocked: false,
          stepMain: 'start',
          urlStart: '/assets/icon/logo.png',
          numTable: "1",
          stepAux:[],
          itemsListAux:[],
          errors: [],
          timeInitial: 2000,
          idRestaurant:""
          }
      },
      methods: {
        startWeb: function (){
          var url = this.$route.query.access;
          if(typeof url != "undefined"){
            this.stepMain ='main';
            var rev = ReverseMd5({
                lettersUpper: true,
                lettersLower: true,
                numbers: true,
                special: true,
                whitespace: true,
                maxLen: 90
            });
            var reverse = rev(url);
            this.idRestaurant = reverse.str;
            this.getStepRestaurant(reverse.str);
            this.getListRestaurant(reverse.str);
          }else{
            this.stepMain ='error';
          }
        },
        getStepRestaurant: function () {
          HTTP.post('/api/tipoPlato', {
            id: this.idRestaurant
          })
          .then(response => {
            for (const key in response.data) {
              if (Object.hasOwnProperty.call(response.data, key)) {
                const element = response.data[key];
                this.stepAux.push({
                  webId:element.IdTipoPlato,
                  name:element.NombreTipo,
                  code:"00"+(parseInt(key)+1)
                })
              }
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
        },
        getListRestaurant: function (){
          HTTP.post('/api/restaurant', {
              id: this.idRestaurant
            })
            .then(response => {
              if(response.data.length != 0){
                var status = response.data[0].FK_idStatus;
                if(status == 1){
                  this.isBlocked = false;
                }else if(status == 2){
                  this.isBlocked = true;
                }
              }
              for (const key in response.data) {
                if (Object.hasOwnProperty.call(response.data, key)) {
                  const element = response.data[key];
                  this.itemsListAux.push({
                    id:element.IdPlato,
                    name:element.NombrePlato,
                    description:element.detalle,
                    price:element.Precio,
                    img:element.URLImagen,
                    idTipoPlato:element.IdTipoPlato
                  })
                }
              }
              this.$refs.segment.filterItemList();
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
      },
});
</script>
