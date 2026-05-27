const Spinner = () => {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className="spinner" />
      <span>Loading movies...</span>
    </div>
  );
};

export default Spinner;
