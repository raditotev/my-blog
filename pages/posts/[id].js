import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGithubBlockquoteAlert from 'remark-github-blockquote-alert';

import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/CodeBlock';
import TimeStamp from '../../components/TimeStamp';
import Link from 'next/link';
import Head from 'next/head';
import ListCategories from '../../components/ListCategories';

export const getStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = getPostData(params.id);
  return {
    props: {
      post: JSON.parse(postData),
    },
  };
};

const Post = ({ post }) => {
  return (
    <Layout>
      <Head>
        <meta name="og:title" content={post.title} />
        <title>{post.title}</title>
      </Head>
      <div className="post">
        <header>
          <h1>{post.title}</h1>
          <TimeStamp date={post.date} updated={post.updated}></TimeStamp>
        </header>
        <ReactMarkdown
          components={CodeBlock}
          remarkPlugins={[remarkGfm, remarkGithubBlockquoteAlert]}
        >
          {post.markdown}
        </ReactMarkdown>
        <footer>
          <ListCategories categories={post.categories} />
          <Link href="/">
            <a className="go-back">🏠</a>
          </Link>
        </footer>
      </div>
      <style jsx>{`
        .post {
          width: 100%;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        header {
          text-align: center;
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .post h1 {
          margin-bottom: 1rem;
          font-size: 3rem;
          background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        footer a.go-back {
          font-size: 1.2rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background: var(--bg-secondary);
          transition: all 0.2s ease;
        }

        footer a.go-back:hover {
          background: var(--accent-glow);
          transform: translateX(-4px);
        }

        @media (max-width: 640px) {
          .post h1 { font-size: 2rem; }
          header { margin-bottom: 2rem; }
        }
      `}</style>
    </Layout>
  );
};

export default Post;
