<template>
    <div class="canvas-render">
        <canvas id="canvas" height="600px" width="1200px"></canvas>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Grid from '@/classes/Grid';
    import Configurations from '@/classes/Configurations';

    @Component
    export default class CanvasRender extends Vue {
        protected canvas?: HTMLCanvasElement;
        protected loopInterval: any;
        protected gameOfLife?: Grid;

        protected mounted(): void {
            this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

            const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
            if (context === null) {
                return;
            }

            this.gameOfLife = new Grid(context);
            this.gameOfLife.render();
            this.loopInterval = setInterval(() => {
                if (this.gameOfLife) {
                    this.gameOfLife.update();
                }
            }, Configurations.updateInterval);
        }
    }
</script>

<style scoped lang="scss">
    .canvas-render {

    }
</style>
