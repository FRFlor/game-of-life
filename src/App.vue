<template>
    <div id="app">
        <game-of-life-render/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import GameOfLifeRender from './components/GameOfLifeRender.vue';

    @Component({
        components: {
            GameOfLifeRender,
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss" scoped>
    #app {
    }
</style>
