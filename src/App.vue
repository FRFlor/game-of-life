<template>
  <div id="app">
    <canvas-render/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CanvasRender from './components/CanvasRender.vue';

@Component({
  components: {
    CanvasRender,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
</style>
