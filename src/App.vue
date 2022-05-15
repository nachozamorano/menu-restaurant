<template>
  <ion-app>
      <ion-split-pane content-id="main-content" v-if="step=='main'">
        <ion-router-outlet id="main-content"></ion-router-outlet>
      </ion-split-pane>
      <page-not-found v-else></page-not-found>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
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
        var url = location.href.split("=")[1];
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
          alert(reverse.str);
        }else{
          this.step ='error';
        }
      },
      data(){
        return{
          step: ''
          }
      }
});
</script>
