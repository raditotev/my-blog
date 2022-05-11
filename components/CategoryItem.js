import Link from 'next/link';

const CategoryItem = ({ category }) => {
  return (
    <>
      <Link href={`/categories/${category}`}>
        <a>{category}</a>
      </Link>
      <style jsx>{`
        a {
          margin-top: 20px;
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 700;
          color: #333;
        }
      `}</style>
    </>
  );
};

export default CategoryItem;
