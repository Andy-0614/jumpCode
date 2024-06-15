<template>
  <div class="block">
    <p v-if="currentPage === 3 && isEdit === true" class="page">Edit</p>
    <p v-else-if="currentPage === 1" class="page">Write</p>
    <p v-else-if="currentPage === 2" class="page">Setting</p>
    <p v-else-if="currentPage === 3" class="page">Read</p>
  </div>
  <div v-if="currentPage === 1">
    <button class="pageLeft" @click="changePage(3)">Read</button>
    <Write @writeRefresh="writeState"/>
    <button class="pageRight" @click="changePage(2)">Setting</button>
  </div>
  <div v-else-if="currentPage === 2">
    <button class="pageLeft" @click="changePage(1)">Write</button>
    <Setting />
    <button class="pageRight" @click="changePage(3)">Read</button>
  </div>
  <div v-else-if="currentPage === 3">
    <button class="pageLeft" @click="changePage(2)">Setting</button>
    <Read @homeRefresh="change_mode"/>
    <button class="pageRight" @click="changePage(1)">Write</button>
  </div>
</template>
  
<script lang="ts">
  import { defineComponent , ref} from 'vue';
  import Write from '../components/Write.vue';
  import Read from '../components/Read.vue';
  import Setting from '../components/Setting.vue';
  import Error from '../components/Error.vue';
  //
  import info from '../widget/info.vue';
  //
  export default defineComponent({
    name: 'Home',
    components: {
      Write,
      Read,
      Setting,
      info,
      Error,
    },
    setup() {
      const currentPage = ref(2);
      const isEdit = ref(false);
      //
      const changePage = (pageNumber:number) => {
        currentPage.value = pageNumber;
      };
      const change_mode = (data:boolean) => {
        isEdit.value = data
        console.log(isEdit.value)
      };
      //
      const writeState = async()=>{
        changePage(3)
      }
      //
      return {
        currentPage,isEdit,
        changePage,writeState,change_mode
      };
    },
  });
</script>
  