import Head from 'next/head';
import Link from 'next/link';

export const siteTitle = "Radi's Blog";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>
      <header>
        <div>
          <Link href="/">
            <a>
              <h1>{siteTitle}</h1>
            </a>
          </Link>
        </div>
      </header>
      <main>{children}</main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-size: 20px;
        }

        * {
          box-sizing: border-box;
        }

        p {
          font-weight: 400;
          line-height: 32px;
        }

        a {
          text-decoration: none;
        }

        img {
          width: 100%;
        }

        img[src*='#center'] {
          display: block;
          margin: auto;
        }

        /* Markdown Alerts */
        .markdown-alert {
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
          border-left: 4px solid;
          border-radius: 8px;
          background-color: var(--bg-secondary);
        }

        .markdown-alert-note { border-color: #38bdf8; background: rgba(56, 189, 248, 0.1); }
        .markdown-alert-note .markdown-alert-title { color: #38bdf8; }

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
          font-weight: bold;
          align-items: center;
          margin-bottom: 4px;
          font-family: var(--font-heading);
        }

        .markdown-alert-title svg {
          margin-right: 8px;
        }

        }
      `}</style>

      <style jsx>{`
        header {
          width: 100vw;
          padding: 1.7rem;
          background-color: rgba(0, 0, 0, 0.9);
          text-align: center;
        }
        header h1 {
          margin: 0;
        }

        header a {
          text-decoration: none;
          color: crimson;
        }

        main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 20px auto;
          max-width: 820px;
        }

        @media (max-width: 820px) {
          main {
            width: 95vw;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
