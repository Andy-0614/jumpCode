<template>
  <div class="block"> 
    <div class="write_action">
      <button @click="changeState()" class='button'>
        <svg v-if="isReadme === false" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
          <path fill="currentColor" fill-rule="evenodd" d="m10.57 1.14l3.28 3.3l.15.36v9.7l-.5.5h-11l-.5-.5v-13l.5-.5h7.72zM10 5h3l-3-3zM3 2v12h10V6H9.5L9 5.5V2zm2.062 7.533l1.817-1.828L6.17 7L4 9.179v.707l2.171 2.174l.707-.707zM8.8 7.714l.7-.709l2.189 2.175v.709L9.5 12.062l-.705-.709l1.831-1.82z" clip-rule="evenodd"/>
        </svg>
        <svg v-else-if="isReadme === true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
          <path fill="currentColor" d="M8.854 11.702h-1l-.816-2.159H3.772l-.768 2.16H2L4.954 4h.935zm-2.111-2.97L5.534 5.45a3 3 0 0 1-.118-.515h-.021q-.054.327-.124.515L4.073 8.732zm7.013 2.97h-.88v-.86h-.022q-.574.99-1.692.99q-.822 0-1.29-.436q-.46-.435-.461-1.155q0-1.54 1.815-1.794l1.65-.23q0-1.403-1.134-1.403q-.994 0-1.794.677V6.59q.81-.516 1.87-.516q1.938 0 1.938 2.052zm-.88-2.782l-1.327.183q-.614.086-.924.306q-.312.215-.312.768q0 .403.285.66q.29.253.768.253a1.41 1.41 0 0 0 1.08-.457q.43-.462.43-1.165z"/>
        </svg>
      </button>
      <input class="title_language" type="text" v-model="title_language" placeholder="Name ...">
      <button @click="upload" class='button'>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5z"/>
        </svg>
      </button>
    </div>
    <div v-if="isReadme === true">
      <textarea 
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        class="markdown" v-model="readme" placeholder="ReadMe ...">
      </textarea>
    </div>
    <div v-else-if="isReadme === false">
      <textarea 
        ref="inputContent"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        class="markdown" v-model="content" placeholder="Function() ...">
      </textarea>
    </div>
  </div>
  <Error :error="error" v-if="error!==''"/>
</template>

<script lang="ts">
  import { defineComponent, ref} from 'vue';
  import { lang_lists } from '../main.ts';
  import axios from 'axios';
  //
  import Error from './Error.vue'
  //
  const ip = import.meta.env.VITE_ip
  const port = import.meta.env.VITE_SQport;
  const error = ref('')
  //
  export default defineComponent({
    name: 'Write',
    components: {
      Error
    },
    emits: ['writeRefresh'],
    setup(_,{ emit }) {
      const title_language = ref('')
      const readme = ref('')
      const content = ref('')
      const isReadme = ref(false);
      const isEdit = ref(false);
      //
      const upload = async () => {
        if(title_language.value==''){
          error.value = 'input is empty'
          return
        }
        //
        try {
          const data = {
            title: title_language.value.split('.')[0],
            language: title_language.value.split('.')[1],
            readme: readme.value,
            content: content.value
          }
          await axios.post(
            `http://${ip}:${port}/upload`, 
            data
          )
          //
          error.value = ''
        }
        catch (err) {}
        //
        emit('writeRefresh');
      }
      const changeState = () => {
        isReadme.value = !isReadme.value; // 注意这里的写法
      }
      //
      return { 
        title_language,readme,content,isReadme,lang_lists,isEdit,error,
        upload,changeState
      };
    },
  });
</script>