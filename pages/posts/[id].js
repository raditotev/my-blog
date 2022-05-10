import ReactMarkdown from 'react-markdown';

import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/Codeblock';
import TimeStamp from '../../components/TimeStamp';
import Link from 'next/link';
import Head from 'next/head';

export const getStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
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
        <ReactMarkdown components={CodeBlock}>{post.markdown}</ReactMarkdown>
        <footer align="right">
          <Link href="/">
            <a>⬅ Back to homepage</a>
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
      `}</style>
    </Layout>
  );
};

export default Post;
