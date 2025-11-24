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
        }
        header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .post h1 {
          margin-bottom: 0.2rem;
        }
        a {
          color: black;
        }
        footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
        footer a.go-back {
          font-size: 1.5rem;
        }
        @media (max-width: 820px) {
          footer {
            display: block;
          }
          footer a.go-back {
            float: right;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Post;
