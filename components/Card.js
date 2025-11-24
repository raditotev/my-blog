const Card = ({ children }) => {
  return (
    <>
      <div className="card">{children}</div>

      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          padding: 1.5rem;
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.3);
          border-color: rgba(56, 189, 248, 0.3);
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default Card;
