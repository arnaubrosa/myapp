<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>NOTAS</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content  class="ion-padding">

        <simple-modal :is-open="info.show" @modal-closed="modalClosed"/>
        <ion-button @click="editar"> NUEVA NOTA </ion-button>
       
        <div v-for="item in llista" :key="item.id">
          <ion-item>  
            <ion-label>
              <div>{{item.title}} </div>
              <div class="ion-text-wrap">{{item.description}}</div>
              <div class="ion-text-wrap">{{item.dateInput}}</div>
              <p> id:{{item.id}}</p>
            </ion-label>
              <ion-button @click.self="eliminar(item)" slot="end" fill="clear"
              ><ion-icon 
                  :icon="trashSharp" slot="icon-only" color="danger"
              ></ion-icon>
             </ion-button> 
          </ion-item>
        </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton ,IonIcon,IonItem,IonLabel} from '@ionic/vue';
import { computed, defineComponent, reactive,ref } from 'vue';
import SimpleModal from"./SimpleModal.vue"
import{ trashSharp} from "ionicons/icons"
import dataStore from "../dataStore"

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    SimpleModal,
    IonIcon,
    IonItem,
    IonLabel
  },
  setup(){
    
    const{listData,deleteItem,addorUpdate}= dataStore()
    //const listData= reactive<Map<string,any>>(new Map<string,any>()) //llista
    const info= reactive<{show: boolean; data: any }>({
      show: false,
      data: null,
    });
    
    const llista= computed(() => Array.from(listData.values()));
    const editar=() =>{info.show=true;};

    //borra llista
    const eliminar= (item: any) => {
      deleteItem(item);

      };

      
    const modalClosed=(eventData: any) =>{
      info.show= false; 
     if(eventData.isCancelled){ // avisem si es cancela l'ordre
       alert("Cancelado"); 
      
     } else{ // guardem dades
         //pujem dada
        const id= new Date().getTime().toString();
        listData.set(id,{id,...eventData.formInfo,});
     }
      info.data=null;
    };
    return{
      //funcions
      editar,
      modalClosed,
      eliminar,
      
      
      //var
      llista,
      info,
      trashSharp
      }
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>