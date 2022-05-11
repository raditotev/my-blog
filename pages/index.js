import Layout from '../components/Layout';
import ListPosts from '../components/ListPosts';
import PostItem from '../components/PostItem';
import { getSortedPostsData } from '../lib/posts';

export const getStaticProps = (context) => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      posts: JSON.parse(allPostsData),
    },
  };
};

export default function Home({ posts }) {
  return (
    <Layout>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      <ListPosts posts={posts} />
      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: stretch;
          align-content: stretch;
          gap: 20px;
        }
      `}</style>
    </Layout>
  );
}
