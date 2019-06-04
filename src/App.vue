<template>
    <v-app>
        <v-content>
            <v-container>
                <h1>Game of Life</h1>

                <p>You may change the amount of Frames per Second by using the slider.</p>
                <p>Also, you can spawn Gliders by clicking into the canvas. Try it out!</p>

                <game-of-life-render class="game-of-life"/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import GameOfLifeRender from './components/GameOfLifeRender';
    import {Component, Vue} from 'vue-property-decorator';

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
