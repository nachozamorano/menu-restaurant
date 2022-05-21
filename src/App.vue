<template>
  <ion-app>
      <ion-split-pane content-id="main-content" ref="panel" v-if="step=='main'">
        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
      <page-not-found v-else></page-not-found>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
import { HTTP } from './js/http-common';
import PageNotFound from './views/PageNotFound.vue';
import ReverseMd5 from 'reverse-md5';
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    PageNotFound
},
      created: function (){
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
          this.step ='error';
        }
      },
      data(){
        return{
          step: '',
          posts: [],
          errors: []
          }
      },
      methods: {
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
