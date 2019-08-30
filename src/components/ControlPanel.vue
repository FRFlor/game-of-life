<template>
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
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import VueSlider from 'vue-slider-component';
    import {ControlPanelSettings} from '@/types';

    @Component({
        components: {VueSlider},
        model: {
            prop: 'originalSettings',
            event: 'settings-changed',
        },
    })
    export default class ControlPanel extends Vue {
        @Prop() protected originalSettings!: ControlPanelSettings;
        protected fps: number = this.originalSettings.framesPerSecond;

        @Watch('fps')
        protected updateFps(): void {
            const newSettings: ControlPanelSettings = {...this.originalSettings, framesPerSecond: this.fps};
            this.$emit('settings-changed', newSettings);
        }
    }
</script>


<style lang="scss" scoped>
    @import '~vue-slider-component/theme/default.css';

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
</style>
