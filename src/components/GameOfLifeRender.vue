<template>
    <div class="canvas-render">
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

        <canvas id="canvas" height="750px" width="1500px"></canvas>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import Configurations from '@/classes/Configurations';
    import InteractiveGameOfLife from '@/classes/InteractiveGameOfLife';
    import VueSlider from 'vue-slider-component';

    @Component({
        components: {VueSlider},
    })
    export default class CanvasRender extends Vue {
        protected canvas?: HTMLCanvasElement;
        protected loopInterval: any;
        protected gameOfLife?: InteractiveGameOfLife;
        protected fps: number = 15;

        protected mounted(): void {
            Configurations.framesPerSecond = this.fps;
            this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

            const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
            if (context === null) {
                return;
            }

            this.gameOfLife = new InteractiveGameOfLife(context);
            this.updateGameLoop();
        }

        @Watch('fps')
        protected updateGameLoop(): void {
            if (this.loopInterval) {
                clearInterval(this.loopInterval);
            }

            if (this.fps === 0) {
                return;
            }

            Configurations.framesPerSecond = this.fps;
            this.loopInterval = setInterval(() => {
                if (this.gameOfLife) {
                    this.gameOfLife.update();
                }
            }, Configurations.updateInterval);
        }


    }
</script>

<style scoped lang="scss">
    @import '~vue-slider-component/theme/default.css';

    #canvas {
        border-radius: 2rem;
        box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.4);
    }

    .slider-container {
        padding-bottom: 3rem;
    }

    .slider-container {
        width: 50rem;
        margin: 3rem auto 0;
    }
</style>
