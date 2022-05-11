import Link from 'next/link';

import TimeStamp from './TimeStamp';
import Card from './Card';
import ListCategories from './ListCategories';

const PostItem = ({ post }) => {
  const { id, date, updated, title, description } = post;
  return (
    <>
      <li className="post-item">
        <Card>
          <ListCategories categories={post.categories} />
          <Link href={`/posts/${id}`}>
            <a>
              <h3>{title}</h3>
            </a>
          </Link>
          <TimeStamp date={date} updated={updated} />
          <p>{description}</p>
          <Link href={`/posts/${id}`}>
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
          margin: 0.3rem auto;
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
