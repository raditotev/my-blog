import PostItem from './PostItem';

const ListPosts = ({ posts }) => {
  return (
    <>
      <ul className="posts">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
      <style jsx>{`
        ul.posts {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

export default ListPosts;
