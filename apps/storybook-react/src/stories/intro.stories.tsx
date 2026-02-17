import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundation/Intro',
  tags: ['autodocs']
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <section
      style={{
        minHeight: 240,
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--spacing-12)',
        background: 'var(--color-surface-subtle)',
        color: 'var(--color-text)',
        fontFamily: 'var(--typography-font-family-base)'
      }}
    >
      <div
        style={{
          maxWidth: 480,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-2)',
          padding: 'var(--spacing-8)'
        }}
      >
        <p
          style={{
            textTransform: 'uppercase',
            fontSize: 'var(--typography-font-size-xs)',
            letterSpacing: '0.08em',
            color: 'var(--color-text-subtle)',
            margin: '0 0 var(--spacing-2)'
          }}
        >
          LayerOne
        </p>
        <h1 style={{ fontSize: 'var(--typography-font-size-2xl)', margin: '0 0 var(--spacing-3)' }}>
          React Storybook
        </h1>
        <p style={{ margin: '0 0 var(--spacing-6)', color: 'var(--color-text-subtle)' }}>
          Token-first foundations are wired. Next, we build the first components.
        </p>
        <button
          type="button"
          style={{
            minHeight: 'var(--touch-target-min)',
            padding: 'var(--spacing-2) var(--spacing-6)',
            background: 'var(--color-primary)',
            color: 'var(--color-surface)',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 'var(--typography-font-weight-medium)',
            cursor: 'pointer'
          }}
        >
          Primary Action
        </button>
      </div>
    </section>
  )
};
