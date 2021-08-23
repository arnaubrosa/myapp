import { reactive } from 'vue';

const listData= reactive<Map<string,any>>(new Map<string,any>()) //llista

export default function(){


    return{
        listData,
        deleteItem:(item: any) =>{
            listData.delete(item.id)
        },
        addorUpdate:(item: any, id?: string) =>{
            const _id= id || new Date().getTime().toString();
            listData.set(_id, {...item, id : _id})
        }
    }



}