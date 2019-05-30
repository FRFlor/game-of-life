<template>
    <div class="canvas-render">
        <canvas id="canvas" :height="canvasHeight" :width="canvasWidth"></canvas>
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

        protected get canvasHeight(): number {
            return Math.floor(window.innerHeight * 0.65);
        }

        protected get canvasWidth(): number {
            return Math.floor(window.innerWidth * 0.65);
        }
    }
</script>

<style scoped lang="scss">
    .canvas-render {

    }
</style>
