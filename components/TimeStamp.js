import { dateString } from '../lib/misc';

const TimeStamp = ({ date, updated }) => {
  const formattedDate = dateString(date);
  return (
    <span>
      {updated ? 'Updated ' : ''}
      <time dateTime={date}>{formattedDate}</time>
      <style jsx>{`
        span {
          color: #333;
          font-size: 0.9rem;
        }
      `}</style>
    </span>
  );
};

export default TimeStamp;
