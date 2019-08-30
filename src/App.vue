<template>
    <div>
        <canvas id="canvas" :width="width" :height="height"/>

        <div class="controls">
            <div class="slider-container">
                <label for="fps-slider">FPS:</label>
                <vue-slider id="fps-slider"
                            height="20px"
                            :marks="[0, 5, 10, 15, 20, 25, 30]"
                            v-model="fps"
                            :min="0"
                            :max="30"
                            tooltip-formatter="{value} fps"
                            :interval="1"></vue-slider>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import InteractiveGameOfLife from '@/classes/InteractiveGameOfLife';
    import VueSlider from 'vue-slider-component';

    @Component({
        components: {VueSlider},
    })
    export default class App extends Vue {
        protected canvas?: HTMLCanvasElement;
        protected loopInterval: any;
        protected gameOfLife?: InteractiveGameOfLife;
        protected fps: number = 15;
        protected width: number = 0;
        protected height: number = 0;

        protected created(): void {
            this.updateSizes();
            window.addEventListener('resize', this.updateSizes);
        }

        protected mounted(): void {
            this.restartCanvas();
        }

        protected updateSizes(): void {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            document.documentElement.style.setProperty('--window-width', `${this.width}px`);
            if (this.canvas) {
                this.restartCanvas();
            }
        }

        protected restartCanvas(): void {
            this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

            const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
            if (context === null) {
                return;
            }

            const columnCount = 150;
            const rowCount = Math.floor(columnCount * this.height / this.width);
            this.$nextTick(() => {
                this.gameOfLife = new InteractiveGameOfLife(context, columnCount, rowCount);
                this.updateGameLoop();
            });

        }

        @Watch('fps')
        protected updateGameLoop(): void {
            if (this.loopInterval) {
                clearInterval(this.loopInterval);
            }

            if (this.fps === 0) {
                return;
            }

            this.loopInterval = setInterval(() => {
                if (this.gameOfLife) {
                    this.gameOfLife.update();
                }
            }, Math.floor(1000 / this.fps));
        }

    }
</script>



<style lang="scss" scoped>
    @import '~vue-slider-component/theme/default.css';

    html, body {
        margin: 0;
        padding: 0;
        position: relative;
        overflow: hidden;
    }

    .controls {
        position: absolute;
        z-index: 2;
        top: 35px;
        left: 35px;
        background-color: hsla(0, 0%, 100%, 0.85);
        border-radius: 2rem;
        box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.4);
        padding: 2rem;
        .slider-container {
            width: calc(var(--window-width) * 0.8 - 35px);
            max-width: 50rem;
        }
    }

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
