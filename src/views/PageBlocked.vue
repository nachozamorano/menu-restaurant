<template>
    <div style="text-align: center;">
        <ion-title size="large" class="title-step center margin-bottom-alert mt-title">Bloqueado</ion-title>
        <ion-img src="/assets/icon/block.png" class="center max-size-icon margin-bottom-alert"></ion-img>
        <ion-text>
            <h3>Su cuenta ha sido bloqueada temporalmente. Para reactivarla contactenos.</h3>
        </ion-text>
    </div>
</template>
<script>
import { IonImg, IonTitle, ionText } from '@ionic/vue';
export default ({
    name: "PageBlocked",
    components: {
        IonImg,
        IonTitle,
        ionText
    },
});
</script>
