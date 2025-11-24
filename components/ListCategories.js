import Link from 'next/link';

const ListCategories = ({ categories }) => {
  return (
    <>
      <div className="list-categories">
        {categories.map((category) => (
          <Link href={`/categories/${category}`} key={category}>
            <a>{category}</a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .list-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .list-categories a {
          color: var(--accent-primary);
          background: var(--accent-glow);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
        }
        .list-categories a:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
      `}</style>
    </>
  );
};

export default ListCategories;
