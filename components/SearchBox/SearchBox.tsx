import css from './SearchBox.module.css';

interface SearchBoxProps {
  onQueryChange: (queryValue: string) => void;
}

function SearchBox({ onQueryChange }: SearchBoxProps) {
  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
    onQueryChange(e.target.value);

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={updateSearchQuery}
      />
    </div>
  );
}

export default SearchBox;
