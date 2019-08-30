<template>
    <div class="controls"
         :class="{'is-expanded' : isExpanded}">
        <button class="expand-panel" @click="isExpanded = !isExpanded"><i class="fa fa-cog"></i></button>
        <div class="slider-container">
            <label for="fps-slider">FPS:</label>
            <vue-slider id="fps-slider"
                        height="20px"
                        :marks="[0, 5, 10, 15, 20, 25, 30]"
                        v-model="settings.framesPerSecond"
                        :min="0"
                        :max="30"
                        tooltip-formatter="{value} fps"
                        :interval="1"></vue-slider>
        </div>
        <div class="slider-container">
            <label for="fps-slider">Number of Columns:</label>
            <vue-slider id="columns-slider"
                        height="20px"
                        :marks="[50, 100, 150, 200, 250, 300]"
                        v-model="settings.numberOfColumns"
                        :min="25"
                        :max="300"
                        tooltip-formatter="{value} columns"
                        :interval="5"></vue-slider>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
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
        protected settings: ControlPanelSettings = Object.assign({}, this.originalSettings);
        protected isExpanded: boolean = false;

        @Watch('settings.framesPerSecond')
        @Watch('settings.numberOfColumns')
        protected updateSettings(): void {
            this.$emit('settings-changed', this.settings);
        }
    }
</script>


<style lang="scss" scoped>
    @import '~vue-slider-component/theme/default.css';

    .controls {
        --margin-for-panel: 5px;
        --padding-for-panel: 1rem;
    }
    @media (min-width: 425px) {
        body {
            .controls {
                --margin-for-panel: 35px;
                --padding-for-panel: 2rem;
            }
        }
    }

    .controls {
        position: absolute;
        z-index: 2;
        top: var(--margin-for-panel);
        left: var(--margin-for-panel);
        background-color: hsla(0, 0%, 100%, 0.85);
        border-radius: var(--padding-for-panel);
        box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.4);
        padding: var(--padding-for-panel);

        button.expand-panel {
            height: 2rem;
            width: 3rem;
            font-size: 1.5rem;
            color: hsl(0, 0%, 50%);
        }

        .slider-container {
            transition: width 200ms ease, height 300ms ease, opacity 100ms ease;
            opacity: 100%;
            width: calc(var(--window-width) * 0.8 - 35px);
            max-width: 50rem;
            padding: var(--padding-for-panel);
        }

        &:not(.is-expanded) {
            padding: 0;
            .slider-container {
                width: 0;
                height: 0;
                opacity: 0;
                padding: 0;
            }

            button.expand-panel {
                color: hsl(0, 0%, 10%);
                margin-bottom: 0;
            }
        }
    }
</style>
