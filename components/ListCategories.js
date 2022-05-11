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
        .list-categories a {
          color: #333;
          text-transform: uppercase;
          font-size: 0.6rem;
          font-weight: 700;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
};

export default ListCategories;
