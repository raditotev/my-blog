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

        @media (max-width: 820px) {
          body {
            font-size: 18px;
          }

          p {
            line-height: 28px;
          }

          img {
            max-width: 80vw;
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
          justify-content: center;
          margin: 10px auto;
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
