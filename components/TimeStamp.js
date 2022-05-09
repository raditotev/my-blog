const TimeStamp = ({ date, updated }) => {
  const dateString = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <span>
      {updated ? 'Updated ' : ''}
      <time dateTime={date}>{dateString}</time>
      <style jsx>{`
        span {
          color: gray;
          font-size: 0.9rem;
        }
      `}</style>
    </span>
  );
};

export default TimeStamp;
