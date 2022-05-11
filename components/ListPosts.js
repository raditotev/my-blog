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
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: stretch;
          align-content: stretch;
          gap: 20px;
        }
      `}</style>
    </>
  );
};

export default ListPosts;
