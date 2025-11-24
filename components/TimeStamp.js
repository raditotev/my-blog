import { dateString } from '../lib/misc';

const TimeStamp = ({ date, updated }) => {
  const formattedDate = dateString(date);
  return (
    <span>
      {updated ? 'Updated ' : ''}
      <time dateTime={date}>{formattedDate}</time>
      <style jsx>{`
        span {
          color: var(--text-secondary);
          font-size: 0.85rem;
          display: block;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </span>
  );
};

export default TimeStamp;
