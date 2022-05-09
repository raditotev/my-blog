import Link from 'next/link';

import TimeStamp from './TimeStamp';
import Card from './Card';

const PostItem = ({ post }) => {
  const { id, date, updated, title, description } = post;
  return (
    <>
      <li className="post-item">
        <Card>
          <h3>{title}</h3>
          <TimeStamp date={date} updated={updated} />
          <p>{description}</p>
          <Link href={`/posts/${id}`}>
            <a>Read more &gt;</a>
          </Link>
        </Card>
      </li>

      <style jsx>{`
        .post-item {
          position: relative;
        }
        h3 {
          margin-bottom: 0.2rem;
        }
        p {
          margin-bottom: 3rem;
        }
        a {
          position: absolute;
          right: 10px;
          bottom: 10px;
          color: crimson;
        }
      `}</style>
    </>
  );
};

export default PostItem;
