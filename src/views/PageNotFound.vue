<template>
    <div style="text-align: center;">
        <ion-img src="/assets/icon/close.png" class="center max-size-icon margin-bottom-alert mt-title"></ion-img>
        <ion-text>
            <h1 class="error-code margin-bottom-alert">404</h1>
            <span class="error-description">Lo sentimos, pero no se encontró la página que estabas buscando.</span>
        </ion-text>
    </div>
</template>
<script>
import { IonImg, IonText } from '@ionic/vue';
export default ({
    name: "PageNotFound",
    components: {
        IonImg,
        IonText
    },
});
</script>
