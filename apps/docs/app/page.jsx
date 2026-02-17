export default function DocsHome() {
  return (
    <main>
      <header className="hero">
        <div>
          <p className="pill">LayerOne</p>
          <h1>LayerOne</h1>
        </div>
      </header>

      <section className="section">
        <h2>Storybook Links</h2>
        <div className="grid">
          <article className="card">
            <h3>Angular Storybook</h3>
            <p>Open Angular components and stories.</p>
            <a className="pill" href="/storybook/angular" rel="noreferrer">
              /storybook/angular
            </a>
          </article>
          <article className="card">
            <h3>React Storybook</h3>
            <p>Open React components and stories.</p>
            <a className="pill" href="/storybook/react" rel="noreferrer">
              /storybook/react
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
