<template>
  <div class="block">
    <div class="read_action">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1200 1200">
          <path fill="currentColor" d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0m41.162 260.01c160.533 0 290.625 130.166 290.625 290.698c0 160.533-130.092 290.625-290.625 290.625c-48.581 0-94.368-11.885-134.619-32.959c.041.186.106.401.146.586L375.586 939.99L268.213 832.544l126.416-126.489c.209-.094.45-.129.659-.22c-28.387-44.893-44.824-98.088-44.824-155.127c0-160.533 130.165-290.698 290.698-290.698m0 129.126c-89.213 0-161.572 72.359-161.572 161.572s72.359 161.499 161.572 161.499c89.214 0 161.499-72.286 161.499-161.499s-72.285-161.572-161.499-161.572"/>
        </svg>
      </span>
      <input class="input" v-model="search_input" @input="search" placeholder="Search ...">
    </div>
    <div :class="{ 'read_list': !(isEdit===true) }">
      <div :class="{ 'read_box': !(isEdit===true) }" v-for="(result) in results" :key="result.id">
        <info :msg="result" @readRefresh="search2"/>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  //
  import info from '../widget/info.vue';
  //
  const ip = import.meta.env.VITE_ip
  const port = import.meta.env.VITE_SQport;
  //
  interface SearchResult {
    id: number;
    title: string;
    language: string;
    readme: string;
    content: string;
  }
  export default defineComponent({
    name: 'Read',
    components: {
      info,
    },
    emits: ['homeRefresh'],
    //
    setup(_, { emit }) {
      const search_input = ref('');
      const results = ref<SearchResult[]>([]);
      const isEdit= ref(false)
      //
      const clear = async () =>{
        const data = {
          title: '',
          id: '#',
        }
        try {
          const response = await axios.post(
            `http://${ip}:${port}/search`,
            data
          );
          results.value = response.data
        } catch (err) {}
        //
        emit('homeRefresh',false);
      }
      const search = async () => {
        clear()
        //
        let data = {
          title: '',
          id: '',
        }
        if(search_input.value.indexOf("#")!=-1){
          data.id = search_input.value.split('#')[1]
        }
        data.title = search_input.value
        //
        try {
          const response = await axios.post(
            `http://${ip}:${port}/search`,
            data
          );
          results.value = response.data
        } catch (err) {}
        //
        isEdit.value = false
      };
      const search2 = async(e:string) =>{
        let data = {
          title: '',
          id: '',
        }
        search_input.value = '#' + e
        data.id = e
        //
        try {
          const response = await axios.post(
            `http://${ip}:${port}/search`,
            data
          );
          results.value = response.data
        } catch (err) {}
        //
        emit('homeRefresh',true);
        isEdit.value = true
      }
      //
      return { 
        search_input, results,isEdit,
        clear,search,search2
      };
    },
  });
</script>
  
