<template> 
    <div class="error">
        <div class="error_mark">
            <p>Error</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1z"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path fill="currentColor" d="M11 7h2v7h-2z"/>
            </svg>
        </div>
        <p>{{ error }}</p>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    //
    export default defineComponent({
        name :'Error',
        props:{
            error:String
        },
        //
        setup(props) {
            const error = props.error
            return{
                error
            }
        },
    });
</script>