<template>
  <ion-app class="display-block">
      <start-page :urlStart="urlStart" v-if="step=='start'" ref="startPage"></start-page>
      <segment-top v-else-if="step=='main'" ref="segment"></segment-top>
      <page-not-found v-else-if="step=='error'" ref="error"></page-not-found>
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
          step: 'start',
          urlStart: '/assets/icon/logo.png',
          posts: [],
          errors: [],
          timeInitial: 2000
          }
      },
      methods: {
        startWeb: function (){
          var url = this.$route.query.access;
          if(typeof url != "undefined"){
            this.step ='main';
            var rev = ReverseMd5({
                lettersUpper: true,
                lettersLower: true,
                numbers: true,
                special: true,
                whitespace: true,
                maxLen: 90
            });
            var reverse = rev(url);
            this.getDataRestaurant(reverse.str);
          }else{
            this.step ='main';
          }
        },
        getDataRestaurant: function (id) {
          HTTP.post(``, {
            id: id
          })
          .then(response => {
            console.log(response.data);
            this.posts = response.data;
          })
          .catch(e => {
            this.errors.push(e)
          })
        }
      }
});
</script>
