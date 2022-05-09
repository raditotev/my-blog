const Card = ({ children }) => {
  return (
    <>
      <div className="card">{children}</div>

      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          align-content: space-between;
          width: 400px;
          height: 100%;
          border-radius: 10px;
          padding: 10px 10px;
        }

        @media (max-width: 820px) {
          .card {
            width: 95vw;
          }
        }
      `}</style>
    </>
  );
};

export default Card;
