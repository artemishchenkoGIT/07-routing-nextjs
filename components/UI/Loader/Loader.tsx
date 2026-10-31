import css from './Loader.module.css';
import { DotLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <DotLoader color="#22d3ee" />
    </div>
  );
}
