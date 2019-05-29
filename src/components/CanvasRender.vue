<template>
    <div class="canvas-render">
        <canvas id="canvas" height="500" width="500"></canvas>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import GameOfLife from '@/classes/GameOfLife';

    @Component
    export default class CanvasRender extends Vue {
        protected canvas?: HTMLCanvasElement;
        protected gameOfLife?: GameOfLife;

        protected mounted(): void {
            this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

            const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
            if (context === null) {
                return;
            }

            this.gameOfLife = new GameOfLife(context);
            this.gameOfLife.render();
        }
    }
</script>

<style lang="scss" scoped>
</style>
