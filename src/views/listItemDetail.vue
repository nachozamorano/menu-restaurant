<template>
    <ion-menu side="end" menu-id="list-detail" content-id="detail">
        <ion-header>
        <ion-toolbar color="tertiary">
            <ion-title>Detalle de la Orden</ion-title>
        </ion-toolbar>
        </ion-header>
        <ion-content>
        <ion-list>
            <ion-item :id="index+'-element'" v-for="(list, index) in listOrder" :key="index">{{list.quantity+"x "+list.name}}</ion-item>
        </ion-list>
        </ion-content>
    </ion-menu>
    <ion-router-outlet id="detail"></ion-router-outlet>
</template>
<script>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonItem, IonContent, IonRouterOutlet } from '@ionic/vue';
export default ({
    name: "ListItemDetail",
    components: {
        IonMenu,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonItem,
        IonContent,
        IonRouterOutlet
    },
    props: {
        'list-order':{
            type: Array,
            default: function () {
                return []
            }
        }
    }
});
</script>
