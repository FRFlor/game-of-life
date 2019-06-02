<template>
    <div class="canvas-render">
        <canvas id="canvas" height="750px" width="1500px"></canvas>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Configurations from '@/classes/Configurations';
    import InteractiveGameOfLife from '@/classes/InteractiveGameOfLife';

    @Component
    export default class CanvasRender extends Vue {
        protected canvas?: HTMLCanvasElement;
        protected loopInterval: any;
        protected gameOfLife?: InteractiveGameOfLife;

        protected mounted(): void {
            this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

            const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
            if (context === null) {
                return;
            }

            this.gameOfLife = new InteractiveGameOfLife(context);
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
