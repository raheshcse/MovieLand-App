const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search movies, series, or years..."
        aria-label="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
