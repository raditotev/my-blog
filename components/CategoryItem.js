import Link from 'next/link';

const CategoryItem = ({ category }) => {
  return (
    <>
      <Link href={`/categories/${category}`}>
        <a>{category}</a>
      </Link>
      <style jsx>{`
        a {
          display: inline-block;
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
          letter-spacing: 0.05em;
        }

        a:hover {
          color: var(--text-primary);
          border-color: var(--accent-primary);
          background: var(--accent-glow);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default CategoryItem;
