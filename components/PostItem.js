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
            <a className="post-title">
              <h3>{title}</h3>
            </a>
          </Link>
          <TimeStamp date={date} updated={updated} />
          <p className="description">{description}</p>
          <div className="footer">
            <Link href={`/posts/${id}`}>
              <a className="read-more">Read more <span className="arrow">→</span></a>
            </Link>
          </div>
        </Card>
      </li>

      <style jsx>{`
        .post-item {
          height: 100%;
        }

        .post-title {
          text-decoration: none;
          display: block;
        }

        h3 {
          font-size: 1.5rem;
          margin: 0.5rem 0;
          color: var(--text-primary);
          transition: color 0.2s ease;
        }

        .post-title:hover h3 {
          color: var(--accent-primary);
        }

        .description {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
          flex-grow: 1;
        }

        .footer {
          margin-top: auto;
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }

        .read-more {
          color: var(--accent-primary);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .arrow {
          transition: transform 0.2s ease;
        }

        .read-more:hover .arrow {
          transform: translateX(4px);
        }
      `}</style>
    </>
  );
};

export default PostItem;
