import Head from 'next/head';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export const siteTitle = "Radi's Blog";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Head>
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>
      <header className="site-header">
        <div className="header-content">
          <Link href="/">
            <a className="logo">
              <h1>{siteTitle}</h1>
            </a>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Radi Totev. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        :root {
          /* Light Mode (Default) */
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-card: #ffffff;
          --text-primary: #0f172a;
          --text-secondary: #475569;
          --accent-primary: #0284c7;
          --accent-glow: rgba(2, 132, 199, 0.15);
          --border-color: #e2e8f0;
          --font-heading: 'Outfit', sans-serif;
          --font-body: 'Inter', sans-serif;
        }

        [data-theme='dark'] {
          /* Dark Mode */
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-card: rgba(30, 41, 59, 0.7);
          --text-primary: #f1f5f9;
          --text-secondary: #94a3b8;
          --accent-primary: #38bdf8;
          --accent-glow: rgba(56, 189, 248, 0.3);
          --border-color: rgba(148, 163, 184, 0.1);
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: var(--font-body);
          font-size: 18px;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          line-height: 1.6;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        * {
          box-sizing: border-box;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-heading);
          color: var(--text-primary);
          margin-top: 0;
          line-height: 1.2;
        }

        h1 { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em; }
        h2 { font-size: 2rem; font-weight: 700; letter-spacing: -0.01em; margin-top: 2rem; }
        h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; }

        p {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        a {
          color: var(--accent-primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        a:hover {
          color: var(--text-primary);
        }

        img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        img[src*='#center'] {
          display: block;
          margin: 2rem auto;
        }

        /* Markdown Alerts */
        .markdown-alert {
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          border-left: 4px solid;
          border-radius: 8px;
          background-color: var(--bg-secondary);
        }

        .markdown-alert-note { border-color: var(--accent-primary); background: var(--accent-glow); }
        .markdown-alert-note .markdown-alert-title { color: var(--accent-primary); }

        .markdown-alert-tip { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }
        .markdown-alert-tip .markdown-alert-title { color: #22c55e; }

        .markdown-alert-important { border-color: #a855f7; background: rgba(168, 85, 247, 0.1); }
        .markdown-alert-important .markdown-alert-title { color: #a855f7; }

        .markdown-alert-warning { border-color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .markdown-alert-warning .markdown-alert-title { color: #f59e0b; }

        .markdown-alert-caution { border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .markdown-alert-caution .markdown-alert-title { color: #ef4444; }

        .markdown-alert-title {
          display: flex;
          font-weight: 700;
          align-items: center;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
        }

        .markdown-alert-title svg {
          margin-right: 8px;
        }

        /* Code Blocks */
        pre {
          background: var(--bg-secondary) !important;
          border-radius: 12px;
          padding: 1.5rem !important;
          overflow-x: auto;
          border: 1px solid var(--border-color);
        }

        code {
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }
      `}</style>

      <style jsx>{`
        .layout-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-primary);
          transition: background-color 0.3s ease;
        }

        .site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        /* Add transparency to header background for glass effect */
        [data-theme='dark'] .site-header {
           background-color: rgba(15, 23, 42, 0.8);
        }

        :root:not([data-theme='dark']) .site-header {
           background-color: rgba(255, 255, 255, 0.8);
        }

        .header-content {
          max-width: 900px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo h1 {
          font-size: 1.5rem;
          margin: 0;
          background: linear-gradient(135deg, var(--accent-primary), #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .logo {
          text-decoration: none;
        }

        main {
          flex: 1;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .site-footer {
          text-align: center;
          padding: 2rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          border-top: 1px solid var(--border-color);
          margin-top: 4rem;
        }

        @media (max-width: 640px) {
          html { font-size: 16px; }
          h1 { font-size: 2rem; }
          main { padding: 1.5rem 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
