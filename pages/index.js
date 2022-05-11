import Layout from '../components/Layout';
import ListPosts from '../components/ListPosts';
import PostItem from '../components/PostItem';
import CategoryItem from '../components/CategoryItem';
import { getSortedPostsData, getCategories } from '../lib/posts';

export const getStaticProps = (context) => {
  const allPostsData = getSortedPostsData();
  const allCategories = getCategories();

  return {
    props: {
      posts: JSON.parse(allPostsData),
      categories: allCategories,
    },
  };
};

export default function Home({ posts, categories }) {
  return (
    <Layout>
      <div className="categories">
        {categories.map((category) => (
          <CategoryItem key={category} category={category} />
        ))}
      </div>
      <ListPosts posts={posts} />
      <style jsx>{`
        .categories {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 1rem;
        }
      `}</style>
    </Layout>
  );
}
