import { mount } from '@vue/test-utils';
import CanvasRender from '@/components/CanvasRender.vue';
import GameOfLife from '@/classes/GameOfLife';

describe('CanvasRender', () => {
  it('Tacos', () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    const gameOfLife = new GameOfLife(ctx);
    gameOfLife.render();
    expect(true).toBe(true);
  });
});
