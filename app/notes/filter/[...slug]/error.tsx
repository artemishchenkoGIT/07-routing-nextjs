'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>Unknown on loading</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Turn now</button>
    </div>
  );
};

export default Error;
