<template>
   <div>
       <div class="alert alert-success" v-if="successMsg">{{successMsg}}</div>
       <div class="alert alert-danger" v-for="err in errorMsg">{{err}}</div>
   </div>
</template>

<script>
    export default {
        name: "info",
        computed: {
            successMsg(){
                return this.$store.state.success_msg;
            },
            errorMsg(){
                return this.$store.state.error_msg;
            }
        }
    }
</script>

<style scoped>

</style>