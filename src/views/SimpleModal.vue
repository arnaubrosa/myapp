<template>
  <ion-modal :is-open="isOpen" @didDismiss="handleDidDismiss(true)">
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title>NUEVA NOTA</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding"> 
        <ion-item>
        <ion-label position="stacked"> Title</ion-label>
        <ion-input v-model="formInfo.title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked"> Description</ion-label>
        <ion-input v-model="formInfo.description" ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked"> Date Input</ion-label>
        <ion-datetime display-format="MM DD YY"
        v-model="formInfo.dateInput">
        </ion-datetime>
      </ion-item>
        <ion-item>
          <ion-button @click="cancelar(false)"> GUARDAR</ion-button>
          <ion-button color="danger" @click="cancelar(true)">CANCELAR</ion-button>
        </ion-item>
      </ion-content>
    </ion-page>
  </ion-modal>
</template>

<script lang="ts">
import {
  IonModal,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonTextarea,
  IonInput,
  IonButton,
  IonDatetime
} from "@ionic/vue";
import { computed, defineComponent,  ref, SetupContext, watch } from "vue";
export default defineComponent({
  name: "SimpleModal",
  components: {
    IonModal,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonDatetime
    
  },
  props: {
    isOpen: {
      default: false,
      required: true,
    },
    
    
  },

  setup(props: any, ctx: SetupContext) {
      const formInfo= ref<any>({
          title:"",
          description:"",
          dateInput: ""
      });
    

    
    
     const cancelar = (isCancelled: boolean) => {
      
      if (!props.isOpen) return;

      console.log(isCancelled);
      
      ctx.emit("modal-closed", {isCancelled, formInfo : !isCancelled ? formInfo.value : null,  //enviem evento amb les dades
      });
      formInfo.value={};
    };
    return {
      // functions
      cancelar,

      // properties
      formInfo,
      
    };
  },
});
</script>

<style scoped>
</style>>



