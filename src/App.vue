<template>
    <div>
        <canvas id="canvas" :width="width" :height="height"/>

        <control-panel v-model="settings"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import InteractiveGameOfLife from '@/classes/InteractiveGameOfLife';
    import VueSlider from 'vue-slider-component';
    import ControlPanel from '@/components/ControlPanel.vue';
    import {ControlPanelSettings} from '@/types';

    @Component({
        components: {ControlPanel, VueSlider},
    })
    export default class App extends Vue {
        protected canvas?: HTMLCanvasElement;
        protected loopInterval: any;
        protected gameOfLife?: InteractiveGameOfLife;
        protected settings: ControlPanelSettings = {
            framesPerSecond: 15,
            numberOfColumns: 150,
        };
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

        @Watch('settings.numberOfColumns')
        protected restartCanvas(): void {
            this.canvas = document.getElementById('canvas') as HTMLCanvasElement;

            const context: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
            if (context === null) {
                return;
            }

            const columnCount = this.settings.numberOfColumns;
            const rowCount = Math.floor(columnCount * this.height / this.width);
            this.$nextTick(() => {
                this.gameOfLife = new InteractiveGameOfLife(context, columnCount, rowCount);
                this.updateGameLoop();
            });

        }

        @Watch('settings.framesPerSecond')
        protected updateGameLoop(): void {
            if (this.loopInterval) {
                clearInterval(this.loopInterval);
            }

            if (this.settings.framesPerSecond === 0) {
                return;
            }

            this.loopInterval = setInterval(() => {
                if (this.gameOfLife) {
                    this.gameOfLife.update();
                }
            }, Math.floor(1000 / this.settings.framesPerSecond));
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

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        cursor: none;
    }
</style>
