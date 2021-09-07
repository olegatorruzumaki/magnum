<template>
    <div id="app" class="container">
        <router-view class="row"/>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {
        }
    },
    mounted() {
        console.log('app');

    },
    methods: {

    }
}
</script>

<style>
</style>
