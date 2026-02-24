import React from 'react';

export default {
  title: 'Foundation/Intro',
  tags: ['autodocs']
};

export const Default = {
  render: () => {
    const sectionStyle = {
      minHeight: 240,
      display: 'grid',
      placeItems: 'center',
      padding: 'var(--spacing-12)',
      background: 'var(--color-surface-subtle)',
      color: 'var(--color-text)',
      fontFamily: 'var(--typography-font-family-base)'
    };

    const cardStyle = {
      maxWidth: 480,
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-2)',
      padding: 'var(--spacing-8)'
    };

    const eyebrowStyle = {
      textTransform: 'uppercase',
      fontSize: 'var(--typography-font-size-xs)',
      letterSpacing: '0.08em',
      color: 'var(--color-text-subtle)',
      margin: '0 0 var(--spacing-2)'
    };

    const titleStyle = {
      fontSize: 'var(--typography-font-size-2xl)',
      margin: '0 0 var(--spacing-3)'
    };

    const bodyStyle = {
      margin: '0 0 var(--spacing-6)',
      color: 'var(--color-text-subtle)'
    };

    const buttonStyle = {
      minHeight: 'var(--touch-target-min)',
      padding: 'var(--spacing-2) var(--spacing-6)',
      background: 'var(--color-primary)',
      color: 'var(--color-surface)',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      fontWeight: 'var(--typography-font-weight-medium)',
      cursor: 'pointer'
    };

    return React.createElement(
      'section',
      { style: sectionStyle },
      React.createElement(
        'div',
        { style: cardStyle },
        React.createElement('p', { style: eyebrowStyle }, 'LayerOne'),
        React.createElement('h1', { style: titleStyle }, 'React Storybook'),
        React.createElement('p', { style: bodyStyle }, 'Token-first foundations are wired. Next, we build the first components.'),
        React.createElement('button', { type: 'button', style: buttonStyle }, 'Primary Action')
      )
    );
  }
};
