<template>
    <button class="info_box" @click="editState" v-if="isEdit===false">
        <div class="id"><p>{{ msg.id }}</p></div>
        <div class="name"><p>{{ msg.title }}</p></div>
        <div class="icon"><img v-if="imgUrl" :src="imgUrl"></div>
        <div class="readme"><p>{{ msg.readme.substring(0, 8) }}...</p></div>
    </button>
    <edit :msg="msg" v-if="isEdit===true" @infoRefresh="editState"/>
</template>

<script lang="ts">
    import { defineComponent , ref} from 'vue';
    //
    import edit from './edit.vue';
    import { lang_lists } from '../main.ts';
    //
    export default defineComponent({
        name: 'info',
        props: {
            msg: {
                type: Object,
                required: true
            },
            isEdit: Boolean
        },
        components: {
            edit
        },
        emits: ['readRefresh'],
        setup(props, { emit }) {
            const isEdit = ref(props.isEdit);
            const imgUrl = ref(`../../src/assets/icons/info/${props.msg.language}.svg`)
            if(lang_lists.indexOf(props.msg.language)==-1){
                imgUrl.value = ''
            }
            //
            const editState = async()=>{
                isEdit.value=!isEdit.value
                emit('readRefresh',props.msg.id);
            }
            //
            return {
                isEdit,imgUrl,
                editState,
            };
        }
    });
</script>