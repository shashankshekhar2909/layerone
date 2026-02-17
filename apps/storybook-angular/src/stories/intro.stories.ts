import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

@Component({
  selector: 'layerone-intro',
  standalone: true,
  template: `
    <section class="intro">
      <div class="intro__card">
        <p class="intro__eyebrow">LayerOne</p>
        <h1 class="intro__title">Angular Storybook</h1>
        <p class="intro__body">
          Token-first foundations are wired. Next, we build the first components.
        </p>
        <button class="intro__button" type="button">Primary Action</button>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .intro {
        min-height: 240px;
        display: grid;
        place-items: center;
        padding: var(--spacing-12);
        background: var(--color-surface-subtle);
        color: var(--color-text);
        font-family: var(--typography-font-family-base);
      }
      .intro__card {
        max-width: 480px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-2);
        padding: var(--spacing-8);
      }
      .intro__eyebrow {
        text-transform: uppercase;
        font-size: var(--typography-font-size-xs);
        letter-spacing: 0.08em;
        color: var(--color-text-subtle);
        margin: 0 0 var(--spacing-2);
      }
      .intro__title {
        font-size: var(--typography-font-size-2xl);
        margin: 0 0 var(--spacing-3);
      }
      .intro__body {
        margin: 0 0 var(--spacing-6);
        color: var(--color-text-subtle);
        line-height: var(--typography-line-height-relaxed);
      }
      .intro__button {
        min-height: var(--touch-target-min);
        padding: var(--spacing-2) var(--spacing-6);
        background: var(--color-primary);
        color: var(--color-surface);
        border: none;
        border-radius: var(--radius-pill);
        font-weight: var(--typography-font-weight-medium);
        cursor: pointer;
        transition: all var(--motion-duration-base) var(--motion-easing-standard);
      }
      .intro__button:focus-visible {
        outline: var(--focus-ring-width) solid var(--color-focus);
        outline-offset: var(--focus-ring-offset);
      }
      .intro__button:hover {
        transform: translateY(-1px);
        box-shadow: var(--shadow-2);
      }
      @media (prefers-reduced-motion: reduce) {
        .intro__button {
          transition: none;
        }
      }
    `
  ]
})
class LayerOneIntroComponent {}

const meta: Meta<LayerOneIntroComponent> = {
  title: 'Foundation/Intro',
  component: LayerOneIntroComponent,
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<LayerOneIntroComponent>;

export const Default: Story = {};
