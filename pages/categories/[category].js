import { getAllCategoryIds, getPostsByCategory } from '../../lib/posts';
import Layout from '../../components/Layout';
import ListPosts from '../../components/ListPosts';

export const getStaticPaths = async () => {
  const paths = getAllCategoryIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const postsByCategory = getPostsByCategory(params.category);
  return {
    props: {
      category: params.category,
      posts: JSON.parse(postsByCategory),
    },
  };
};

const Category = ({ category, posts }) => {
  return (
    <>
      <Layout>
        <div className="category">
          <h2>
            <span className="selected-category">{category}:</span>
            <span>
              {posts.length} {posts.length > 1 ? 'posts' : 'post'}
            </span>
          </h2>
        </div>
        <ListPosts posts={posts} />
      </Layout>
      <style jsx>{`
        .category {
          margin-bottom: 2rem;
        }
        h2 {
          width: 100%;
          border-bottom: 1px solid var(--border-color);
          line-height: 0.1em;
          margin: 10px 0 20px;
          font-size: 0.9rem;
          text-align: right;
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        h2 span {
          background: var(--bg-primary);
          padding: 0 10px;
        }
        span.selected-category {
          color: var(--accent-primary);
          font-weight: 700;
        }
      `}</style>
    </>
  );
};

export default Category;
