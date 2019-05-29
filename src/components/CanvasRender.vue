<template>
    <div class="canvas-render">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import GameOfLife from '@/classes/GameOfLife';

    @Component
    export default class CanvasRender extends Vue {
        protected gameOfLife?: GameOfLife;

        protected mounted(): void {
            const target: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

            const context: CanvasRenderingContext2D | null = target.getContext('2d');
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
