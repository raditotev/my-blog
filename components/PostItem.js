import Link from 'next/link';

import TimeStamp from './TimeStamp';
import Card from './Card';

const PostItem = ({ post }) => {
  const { id, date, updated, title, description } = post;
  return (
    <>
      <li className="post-item">
        <Card>
          <Link href={`/posts/${id}`} as={`/posts/${id}`}>
            <a>
              <h3>{title}</h3>
            </a>
          </Link>
          <TimeStamp date={date} updated={updated} />
          <p>{description}</p>
          <Link href={`/posts/${id}`} as={`/posts/${id}`}>
            <a className="read-more">Read more &gt;</a>
          </Link>
        </Card>
      </li>

      <style jsx>{`
        .post-item {
          position: relative;
        }
        h3 {
          font-size: 32px;
          margin-bottom: 0.2rem;
          cursor: pointer;
        }
        p {
          margin-bottom: 3rem;
        }
        a h3 {
          color: black;
        }
        a.read-more {
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
