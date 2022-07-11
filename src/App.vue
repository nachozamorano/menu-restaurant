<template>
  <ion-app class="display-block">
      <start-page :urlStart="urlStart" v-if="stepMain=='start'" ref="startPage"></start-page>
      <segment-top v-else-if="stepMain=='main'" :step="stepAux" :items-list="itemsListAux" ref="segment"></segment-top>
      <page-not-found v-else-if="stepMain=='error'" ref="error"></page-not-found>
  </ion-app>
</template>

<script>
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import { HTTP } from './js/http-common';
import PageNotFound from './views/PageNotFound.vue';
import startPage from './views/StartPage.vue';
import ReverseMd5 from 'reverse-md5';
import segmentTop from './views/Segment.vue';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    PageNotFound,
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
          stepMain: 'start',
          urlStart: '/assets/icon/logo.png',
          stepAux:[],
          itemsListAux:[],
          errors: [],
          timeInitial: 2000
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
            this.getStepRestaurant(reverse.str);
            this.getListRestaurant(reverse.str);
          }else{
            this.stepMain ='error';
          }
        },
        getStepRestaurant: function (id) {
          HTTP.post('/api/tipoplato', {
            id: id
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
        getListRestaurant: function (id){
          HTTP.post('/api/restaurant', {
              id: id
            })
            .then(response => {
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
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
      },
});
</script>
